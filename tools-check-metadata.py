#!/usr/bin/env python3
# 9-21 — le site mesure ses métadonnées en PIXELS, pas en caractères.
#
# POURQUOI. Google ne tronque pas à 60 caractères : il tronque à la LARGEUR du
# conteneur de la SERP. Mesuré le 2026-09-16 puis remesuré le 2026-09-24, le
# compte de caractères s'est trompé dans les deux sens sur ce site : `/` fait
# 64 caractères mais 582 px (faux positif, la page la plus visible), tandis que
# `/golden-hour-alarm/` est plus court en caractères et dépasse en pixels.
#
# CE N'EST PAS UNE MESURE PONCTUELLE, C'EST UN CLIQUET. Entre le 2026-09-16 et
# le 2026-09-24, le titre de `/golden-hour-alarm/` a GAGNÉ 60 px (609 → 669) au
# fil de deux réécritures, sans que personne ne le voie. La story 9-21 avait
# mesuré le défaut ; rien n'empêchait son aggravation. C'est ce que cet outil
# pose.
#
# IL REFUSE DE S'EXÉCUTER plutôt que d'imprimer des chiffres faux — modèle de
# `tools-strip-runtime.mjs`. Le refus le plus important est le TÉMOIN DE POLICE :
# si Liberation Sans est absente et qu'une autre police est substituée, TOUS les
# chiffres du rapport seraient faux, en silence, sans la moindre erreur. Un faux
# positif se voit ; un faux zéro se croit.
#
# LA LISTE DES PAGES N'EST PAS DANS CE FICHIER, et ne doit jamais y entrer. Elle
# vient de `out/sitemap.xml`, lui-même généré par `app/sitemap.ts` depuis `PAGES`
# de `lib/pages.ts`. `tools-compare-with-main.py` porte (portait) sa liste codée
# en dur : elle n'a jamais contenu `sunrise-meditation-alarm/`, si bien qu'il a
# annoncé « conforme sur les six pages » sans avoir ouvert la page créée la
# veille. Une page ajoutée au registre doit entrer dans ce contrôle SANS qu'on
# touche à ce fichier.
#
# DÉPENDANCES RÉELLES : python3, Pillow, et une police métriquement compatible
# Arial. `fc-match` (fontconfig) est utilisé s'il est là et remplacé par une
# liste de chemins connus sinon ; `git` sert à vérifier les `since` des
# exemptions et son absence dégrade en avertissement, pas en refus. Aucun
# fichier de configuration Next, GitHub Pages ou Cloudflare n'est lu.

import html
import os
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

# ── Constantes de mesure ────────────────────────────────────────────────────
# Chacune porte la source de sa valeur. Ne pas en changer une sans changer le
# tableau daté de METADATA-BUDGET.md : c'est un tableau NON daté qui a laissé
# le « 609 px » survivre neuf jours après être devenu faux.

# Police : métriquement compatible Arial (mêmes chasses, mêmes crénages), qui
# est la police de la SERP desktop. Résolue par fc-match, jamais codée en dur —
# sauf override explicite pour ÉPROUVER le témoin (voir ENV_FONT).
FONT_FAMILIES_OK = ("Liberation Sans", "Arimo", "Arial", "Helvetica")  # métriquement compatibles Arial
ENV_FONT = "RISETIME_METADATA_FONT"  # chemin de police forcé — sert à éprouver le témoin, pas à mesurer
# Repli si fontconfig est absent. L'outil ne doit dépendre que de python3, de
# Pillow et d'une police ; fc-match est un confort, pas un prérequis.
FONT_FALLBACK_PATHS = (
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    "/usr/share/fonts/liberation-sans/LiberationSans-Regular.ttf",
    "/usr/share/fonts/TTF/LiberationSans-Regular.ttf",
    "/usr/share/fonts/truetype/croscore/Arimo-Regular.ttf",
    "/Library/Fonts/Arial.ttf",
)

TITLE_PX = 20      # taille de rendu du titre dans la SERP desktop (convention documentée)
DESC_PX = 14       # taille de rendu de la description dans la SERP desktop
COLUMN_PX = 600    # largeur du conteneur de résultat desktop — c'est LUI qui tronque
DESC_CLAMP = 2     # la description est coupée à 2 lignes en desktop

# Témoin de police. « The quick brown fox… » mesure 395,8 px à 20 px en
# Liberation Sans (mesuré le 2026-09-24, Pillow 11.3.0). Tout écart > 0,5 px
# signifie qu'une AUTRE police a été chargée : l'outil s'arrête au lieu
# d'imprimer six chiffres faux.
WITNESS_TEXT = "The quick brown fox jumps over the lazy dog"
WITNESS_PX = 395.8
WITNESS_TOLERANCE_PX = 0.5

# ── Les deux budgets ────────────────────────────────────────────────────────
# DUR — contrainte physique de rendu, la même pour les sept langues. Ce n'est
# pas une règle administrative : c'est la largeur du conteneur.
HARD_TITLE_PX = 600.0
HARD_DESC_LINES = 2.0

# ANGLAIS — cible d'écriture, pas verdict. Mesuré : 1 278 paires msgid/msgstr
# des six .po livrés (app/src/main/assets/i18n#lang_*/), largeurs à 20 px. Sur
# les 426 paires dont l'anglais fait 60 caractères et plus — la bande d'un
# <title> —, le facteur médian traduit/anglais est ×1,146. 600 / 1,146 = 523,6,
# arrondi vers le bas. Idem description : 2 lignes / 1,146 = 1,745 → 1,74.
# Un budget calé sur p75 (×1,233 → 486 px) a été ÉCARTÉ : il recalait cinq des
# six titres. Le rejet est écrit dans METADATA-BUDGET.md pour ne pas être refait.
EN_TITLE_PX = 520.0
EN_DESC_LINES = 1.74

OUT_DEFAULT = "out"
EXCLUDED_DIRS = {"404"}  # la page 404 n'est ni indexée ni servie comme résultat


# ── Cliquet d'exemptions ────────────────────────────────────────────────────
# Même mécanisme que `tools-compare-with-main.py` et que `TypeScaleGuardTest`
# (epic 19) : la liste ne peut que RÉTRÉCIR.
#
# Une exemption porte OBLIGATOIREMENT : la page, le champ, la story qui l'a
# posée, la raison écrite, le `since` (un SHA vérifié ancêtre de HEAD), et
# `frozen` — la valeur mesurée au moment où l'exemption a été posée.
#
# `frozen` est ce qui fait de cette table un cliquet plutôt qu'un tapis :
#   • la valeur repasse SOUS le budget      → échec « exemption INUTILISÉE »
#   • la valeur dépasse `frozen`            → échec « AGGRAVATION »
# Autrement dit une exemption gèle un défaut connu ; elle n'autorise pas à
# l'empirer. C'est exactement le trou par lequel 609 px est devenu 669 px.
WAIVED = {
    ("/golden-hour-alarm/", "title"): {
        "story": "9-21 — le site mesure ses métadonnées en pixels",
        "since": "165b019",
        "raison": "Seul titre au-dessus de la limite DURE (668,9 px > 600). Sa réécriture "
                  "est un arbitrage de marque — positionnement, usages nommés à égalité — "
                  "que 9-21 se refuse explicitement à trancher (AC 12). Gelé ici pour que "
                  "l'instrument entre en service sans réécrire un libellé.",
        "frozen": 668.9,
    },
    ("/", "title"): {
        "story": "9-21 — le site mesure ses métadonnées en pixels",
        "since": "165b019",
        "raison": "582,4 px : conforme à la limite dure, au-dessus du budget ANGLAIS de "
                  "520 px. En traduction ×1,146 il ressort à 667 px et se fait tronquer. "
                  "Titre d'accueil, arbitrage de marque — AC 12.",
        "frozen": 582.4,
    },
    ("/alarms/", "title"): {
        "story": "9-21 — le site mesure ses métadonnées en pixels",
        "since": "165b019",
        "raison": "531,1 px, soit +11 px sur le budget anglais. Sort à 609 px en "
                  "traduction. Arbitrage de marque — AC 12.",
        "frozen": 531.1,
    },
    ("/timers/", "title"): {
        "story": "9-21 — le site mesure ses métadonnées en pixels",
        "since": "165b019",
        "raison": "525,5 px, soit +5,5 px sur le budget anglais. La page a été réécrite "
                  "par 9-24 pendant la rédaction de 9-21 et n'était pas mesurable alors ; "
                  "elle passe le contrôle comme les autres, sans régime particulier "
                  "(AC 14). Aucun libellé réécrit ici — AC 12.",
        "frozen": 525.5,
    },
}


def refuse(msg):
    print("\n⛔ " + msg + "\n", file=sys.stderr)
    sys.exit(1)


# ── Refus 1 : Pillow ────────────────────────────────────────────────────────
try:
    from PIL import ImageFont
except ImportError:
    refuse(
        "Pillow est absent. Cet outil MESURE des pixels : sans lui il ne peut "
        "qu'estimer, et une estimation de largeur de texte est précisément "
        "l'erreur que cette story corrige.\n   Installer : pip install Pillow"
    )


# ── Refus 2 : la police ─────────────────────────────────────────────────────
def resolve_font():
    forced = os.environ.get(ENV_FONT)
    if forced:
        if not Path(forced).is_file():
            refuse(f"{ENV_FONT}={forced!r} ne désigne aucun fichier.")
        return forced, f"forcée par {ENV_FONT}"
    # La police VERSIONNÉE d'abord, et c'est délibéré. Une mesure de largeur dépend
    # entièrement du fichier employé ; dépendre de ce qui est installé sur la machine
    # rendait le chiffre irreproductible — le même dépôt aurait mesuré autre chose
    # ailleurs, sans un mot. Voir tools-fonts/LICENSE-LiberationSans.txt.
    vendored = Path(__file__).parent / "tools-fonts" / "LiberationSans-Regular.ttf"
    if vendored.is_file():
        return str(vendored), "Liberation Sans (versionnée dans le dépôt)"
    # fc-match est le chemin PRÉFÉRÉ, pas une dépendance dure : l'outil ne doit
    # exiger que python3, Pillow et une police métriquement compatible Arial.
    # Sans fontconfig, on cherche la police aux emplacements usuels — et le
    # TÉMOIN reste de toute façon le juge : quelle que soit la façon dont la
    # police a été trouvée, un fichier qui ne mesure pas 395,8 px est refusé.
    try:
        fam = subprocess.run(
            ["fc-match", "Arial", "-f", "%{family}"], capture_output=True, text=True, check=True
        ).stdout.strip()
        path = subprocess.run(
            ["fc-match", "Arial", "-f", "%{file}"], capture_output=True, text=True, check=True
        ).stdout.strip()
    except (OSError, subprocess.CalledProcessError):
        for cand in FONT_FALLBACK_PATHS:
            if Path(cand).is_file():
                return cand, Path(cand).stem + " (fc-match indisponible, chemin connu)"
        refuse(
            "aucune police métriquement compatible Arial trouvée, et fc-match est "
            "indisponible.\n   Installer fonts-liberation, ou désigner le fichier par "
            f"{ENV_FONT}=<chemin>."
        )
    if not any(ok.lower() in fam.lower() for ok in FONT_FAMILIES_OK):
        refuse(
            f"fc-match rend {fam!r}, qui n'est pas métriquement compatible Arial.\n"
            f"   Les largeurs mesurées ne vaudraient rien. Attendu l'une de : "
            f"{', '.join(FONT_FAMILIES_OK)}.\n"
            f"   Installer : fonts-liberation."
        )
    return path, fam


FONT_PATH, FONT_NAME = resolve_font()
try:
    F_TITLE = ImageFont.truetype(FONT_PATH, TITLE_PX)
    F_DESC = ImageFont.truetype(FONT_PATH, DESC_PX)
except OSError as e:
    refuse(f"police illisible : {FONT_PATH} ({e})")


# ── Refus 3 : le témoin de police ───────────────────────────────────────────
witness = F_TITLE.getlength(WITNESS_TEXT)
if abs(witness - WITNESS_PX) > WITNESS_TOLERANCE_PX:
    refuse(
        f"TÉMOIN DE POLICE FAUX.\n"
        f"   « {WITNESS_TEXT} » mesure {witness:.1f} px à {TITLE_PX} px,\n"
        f"   au lieu de {WITNESS_PX} px ± {WITNESS_TOLERANCE_PX} attendus.\n"
        f"   Police chargée : {FONT_NAME} — {FONT_PATH}\n"
        f"   Une autre police a été substituée. TOUS les chiffres du rapport "
        f"seraient faux,\n   sans qu'aucune erreur ne se voie. L'outil s'arrête "
        f"plutôt que de les imprimer."
    )


# ── Mesure ──────────────────────────────────────────────────────────────────
def wrap_lines(text, font, width):
    """Retour à la ligne simulé, coupure aux espaces comme un navigateur.
    Un mot plus large que la colonne occupe sa ligne (composé allemand)."""
    lines, cur = [], ""
    for word in text.split():
        cand = (cur + " " + word).strip()
        if font.getlength(cand) <= width or not cur:
            cur = cand
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def desc_lines(text):
    """Nombre de lignes FRACTIONNAIRE : les lignes pleines, plus la fraction de
    colonne qu'occupe la dernière. Un entier ne distinguerait pas une
    description qui remplit 1,05 ligne d'une qui en remplit 1,98 — or c'est
    exactement la marge qu'on veut surveiller (`/` est à 0,01 ligne du budget)."""
    lines = wrap_lines(text, F_DESC, COLUMN_PX)
    if not lines:
        return 0.0
    return (len(lines) - 1) + F_DESC.getlength(lines[-1]) / COLUMN_PX


# MOYEN-1 — un cliquet qui ne fait que freiner n'est pas un cliquet. Une valeur
# dispensée qui s'améliore SANS repasser sous le budget (531,1 → 525,0) laissait
# `frozen` à 531,1 : elle pouvait ensuite remonter jusque-là en silence, et le
# terrain gagné se reperdait sans que rien ne le dise.
#
# CHOIX : on SIGNALE et on fait échouer, on ne réabaisse pas tout seul. Réécrire
# `WAIVED` depuis l'outil ferait muter en silence le document même qui sert de
# preuve — un fichier de référence qu'un outil réécrit tout seul ne prouve plus
# rien. Et c'est le comportement déjà retenu pour « exemption INUTILISÉE » :
# une amélioration TOTALE fait échouer jusqu'à ce qu'on retire l'entrée, une
# amélioration PARTIELLE fait échouer jusqu'à ce qu'on abaisse le gel. La table
# ne peut que rétrécir, dans les deux cas, et toujours par une main humaine.
SLACK_EPSILON = {1: 0.05, 2: 0.005}  # bruit de mesure toléré, par précision d'affichage


def has_slack(value, frozen, prec):
    return round(frozen, prec) - round(value, prec) > SLACK_EPSILON[prec]


def worse_than_frozen(value, frozen, prec):
    """Le gel se compare À LA PRÉCISION AFFICHÉE. Sans cela, une valeur gelée
    depuis le rapport lui-même (582,4) serait relue comme 582,4062 et
    déclarerait une aggravation de 0,0 px — un cliquet qui ne se ferme jamais
    est un cliquet cassé."""
    return round(value, prec) > round(frozen, prec) + 1e-9


def meta(src, pattern):
    m = re.search(pattern, src, re.I | re.S)
    return html.unescape(m.group(1)).strip() if m else None


# ── Refus 4 : l'export et son sitemap ───────────────────────────────────────
# `--no-waivers` rejoue le contrôle en IGNORANT la table d'exemptions. C'est la
# seule façon de reproduire le relevé de référence d'une story sans ÉDITER ce
# fichier — et une preuve qu'on ne peut rejouer qu'en modifiant le code n'est
# pas une preuve. Il ne sert qu'à lire : il ne change aucun budget.
args = [a for a in sys.argv[1:] if not a.startswith("-")]
flags = {a for a in sys.argv[1:] if a.startswith("-")}
STRICT = bool(flags & {"--no-waivers", "--strict"})
unknown = flags - {"--no-waivers", "--strict"}
if unknown:
    refuse(f"drapeau inconnu : {', '.join(sorted(unknown))}. "
           f"Connus : --no-waivers (alias --strict).")
if STRICT:
    WAIVED = {}
out = Path(args[0] if args else OUT_DEFAULT)
if not out.is_dir():
    refuse(f"{out}/ n'existe pas — le build a-t-il tourné ? (npm run build)")
sitemap = out / "sitemap.xml"
if not sitemap.is_file():
    refuse(f"{sitemap} absent — le build a-t-il tourné ? (npm run build)")

root = ET.parse(sitemap).getroot()
NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
sitemap_paths = []
for loc in root.iter(NS + "loc"):
    u = (loc.text or "").strip()
    p = re.sub(r"^https?://[^/]+", "", u)
    sitemap_paths.append(p or "/")
if not sitemap_paths:
    refuse(f"{sitemap} ne contient aucun <loc> — le registre lib/pages.ts est-il vide ?")

# On balaie TOUT le HTML exporté, pas les seuls `index.html`. `trailingSlash:
# true` rend aujourd'hui improbable une page exportée en `foo.html` — mais « le
# générateur n'en produit pas » est une hypothèse sur l'outillage, et c'est
# exactement le genre d'hypothèse que cet outil a pour charge de ne pas faire.
# Une telle page serait sinon invisible des DEUX contrôles à la fois.
exported = {}
for f in sorted(out.rglob("*.html")):
    rel = f.relative_to(out).as_posix()
    if rel.split("/")[0] in EXCLUDED_DIRS or Path(rel).stem in EXCLUDED_DIRS:
        continue
    if f.name == "index.html":
        d = f.relative_to(out).parent.as_posix()
        url = "/" if d == "." else "/" + d + "/"
    else:
        url = "/" + rel
    exported[url] = f


# ── Refus 5 : fermeture dans les deux sens ──────────────────────────────────
orphan_files = sorted(set(exported) - set(sitemap_paths))
orphan_locs = sorted(set(sitemap_paths) - set(exported))
if orphan_files or orphan_locs:
    lines = ["DÉSACCORD entre l'export et le sitemap — le contrôle ne sait pas quoi mesurer."]
    for p in orphan_files:
        lines.append(
            f"   • {p} est exporté mais ABSENT du sitemap : la page existe, elle n'est "
            f"ni indexée ni contrôlée.\n     C'est exactement le trou par lequel "
            f"/sunrise-meditation-alarm/ est passé. Ajouter l'entrée à PAGES (lib/pages.ts)."
        )
    for p in orphan_locs:
        lines.append(
            f"   • {p} est annoncé par le sitemap mais SANS fichier dans {out}/ : "
            f"le sitemap promet une URL qui ne sera pas servie."
        )
    refuse("\n".join(lines))


# ── Cliquet : validation de la table d'exemptions ───────────────────────────
def is_ancestor(sha):
    try:
        return subprocess.run(
            ["git", "merge-base", "--is-ancestor", sha, "HEAD"], capture_output=True
        ).returncode == 0
    except OSError:
        return None  # pas de git sous la main : on ne prétend pas avoir vérifié


for key, w in sorted(WAIVED.items()):
    page, field = key
    for required in ("story", "since", "raison", "frozen"):
        if not w.get(required):
            refuse(
                f"exemption {page} / {field} sans {required!r}. Une exemption sans "
                f"story, sans raison écrite, sans commit d'origine ou sans valeur gelée "
                f"n'est pas un cliquet : c'est un tapis."
            )
    anc = is_ancestor(w["since"])
    if anc is None:
        print(f"⚠ since de {page}/{field} NON VÉRIFIÉ (git indisponible)")
    elif not anc:
        refuse(
            f"le since {w['since']!r} de {page}/{field} n'est pas un ancêtre de HEAD.\n"
            f"   Une exemption pointe le commit qui l'a rendue nécessaire ; un SHA "
            f"inconnu d'ici\n   est un placeholder qu'on a oublié de remplacer."
        )


# ── Rapport ─────────────────────────────────────────────────────────────────
print(f"\nPolice : {FONT_NAME} — {FONT_PATH}")
print(f"Témoin : {witness:.1f} px (attendu {WITNESS_PX} ± {WITNESS_TOLERANCE_PX}) ✅")
print(f"Source : {out}/ — {len(sitemap_paths)} page(s) depuis {sitemap} "
      f"(généré depuis lib/pages.ts)")
print(f"Budgets : dur {HARD_TITLE_PX:.0f} px / {HARD_DESC_LINES:.0f} lignes · "
      f"anglais {EN_TITLE_PX:.0f} px / {EN_DESC_LINES} ligne\n")

hard_fail = []
en_fail = []
en_over = []  # tout ce qui dépasse 520 px, dépassements DURS compris
waived_hit = []       # tout dépassement dispensé, tous budgets confondus
hard_waived = []      # dépassements du budget DUR qui sont dispensés — comptés À PART
en_waived = []        # dépassements du budget ANGLAIS qui sont dispensés
slack = []            # dispenses dont le gel pourrait être resserré
worsened = []
used_waivers = set()

for path in sitemap_paths:
    f = exported[path]
    src = f.read_text(encoding="utf-8")
    title = meta(src, r"<title>(.*?)</title>")
    desc = meta(src, r'<meta name="description" content="([^"]*)"')
    if not title:
        refuse(f"{path} ({f}) n'a pas de <title>. Une page exportée sans titre n'a pas "
               f"de métadonnée à mesurer — et Google en fabriquera une.")
    if not desc:
        refuse(f"{path} ({f}) n'a pas de <meta name=\"description\">. "
               f"Une page exportée sans description n'a pas de métadonnée à mesurer.")

    tw = F_TITLE.getlength(title)
    dl = desc_lines(desc)

    rows = [("title", tw, HARD_TITLE_PX, EN_TITLE_PX, "px", 1),
            ("desc", dl, HARD_DESC_LINES, EN_DESC_LINES, "ligne", 2)]

    lines_out = []
    page_state = "✅"
    for field, value, hard, soft, unit, prec in rows:
        w = WAIVED.get((path, field))
        fmt = f"{{:.{prec}f}}"
        val_s = fmt.format(value)
        # Un dépassement DUR dépasse forcément aussi le budget anglais : on
        # imprime les deux écarts, sinon le +148,9 px anglais de
        # /golden-hour-alarm/ disparaîtrait derrière son +68,9 px dur.
        also_en = (f" · anglais {fmt.format(soft)} dépasse de "
                   f"{fmt.format(value - soft)}") if value > soft else ""
        if value > hard:
            en_over.append((path, field, value, soft))
            if w:
                used_waivers.add((path, field))
                if worse_than_frozen(value, w["frozen"], prec):
                    worsened.append((path, field, value, w))
                    lines_out.append(
                        f"   ❌ {field:5s} {val_s} {unit} > dur {fmt.format(hard)} — "
                        f"AGGRAVATION : gelé à {w['frozen']}, dépasse de "
                        f"{fmt.format(value - w['frozen'])}{also_en}")
                    page_state = "❌"
                else:
                    lines_out.append(
                        f"   ~ {field:5s} {val_s} {unit} > dur {fmt.format(hard)} "
                        f"(dépasse de {fmt.format(value - hard)}){also_en} — dispensé, "
                        f"gelé à {w['frozen']} — {w['story']}")
                    waived_hit.append((path, field))
                    hard_waived.append((path, field, value, hard))
                    if has_slack(value, w["frozen"], prec):
                        slack.append((path, field, value, w["frozen"], prec))
                    if page_state == "✅":
                        page_state = "~"
            else:
                hard_fail.append((path, field, value, hard))
                lines_out.append(
                    f"   ❌ {field:5s} {val_s} {unit} > dur {fmt.format(hard)} "
                    f"— dépasse de {fmt.format(value - hard)}{also_en}")
                page_state = "❌"
        elif value > soft:
            en_over.append((path, field, value, soft))
            if w:
                used_waivers.add((path, field))
                if worse_than_frozen(value, w["frozen"], prec):
                    worsened.append((path, field, value, w))
                    lines_out.append(
                        f"   ❌ {field:5s} {val_s} {unit} > anglais {fmt.format(soft)} — "
                        f"AGGRAVATION : gelé à {w['frozen']}, dépasse de "
                        f"{fmt.format(value - w['frozen'])}")
                    page_state = "❌"
                else:
                    lines_out.append(
                        f"   ~ {field:5s} {val_s} {unit} > anglais {fmt.format(soft)} "
                        f"(dépasse de {fmt.format(value - soft)}) — dispensé, "
                        f"gelé à {w['frozen']} — {w['story']}")
                    waived_hit.append((path, field))
                    en_waived.append((path, field, value, soft))
                    if has_slack(value, w["frozen"], prec):
                        slack.append((path, field, value, w["frozen"], prec))
                    if page_state == "✅":
                        page_state = "~"
            else:
                en_fail.append((path, field, value, soft))
                lines_out.append(
                    f"   ⚠  {field:5s} {val_s} {unit} > anglais {fmt.format(soft)} "
                    f"— dépasse de {fmt.format(value - soft)}")
                page_state = "❌"
        else:
            lines_out.append(
                f"   ✅ {field:5s} {val_s} {unit} · dur {fmt.format(hard)} · "
                f"anglais {fmt.format(soft)} — marge {fmt.format(soft - value)}")

    print(f"{page_state} {path}   ({len(title)} car. titre, {len(desc)} car. desc.)")
    for l in lines_out:
        print(l)

# ── Cliquet : exemptions devenues inutiles ──────────────────────────────────
unused = sorted(set(WAIVED) - used_waivers)
print()
for path, field in unused:
    w = WAIVED[(path, field)]
    print(f"⚠ exemption INUTILISÉE  {path} / {field} — {w['story']} : la valeur est "
          f"repassée sous le budget.\n  La liste ne peut que rétrécir : retirer cette "
          f"entrée de WAIVED.")

for path, field, value, frozen, prec in slack:
    fmt = f"{{:.{prec}f}}"
    print(f"⚠ gel TROP LÂCHE  {path} / {field} — mesuré {fmt.format(value)}, gelé à "
          f"{fmt.format(frozen)}.\n  Le terrain gagné se reperdrait en silence : abaisser "
          f"`frozen` à {fmt.format(value)} dans WAIVED.")

# ── Verdict ─────────────────────────────────────────────────────────────────
# ⚠ CETTE LIGNE EST CELLE QUE LA CI LIT. Elle a menti une fois : elle imprimait
# « ✓ métadonnées dans les budgets » et « 0 dépassement dur » alors que
# /golden-hour-alarm/ était à +68,9 px du budget DUR — seulement dispensé. Le
# chiffre juste était deux lignes plus haut, mais personne ne lit deux lignes
# plus haut dans un log. Un faux positif se voit ; un faux zéro se croit, et
# celui-ci vivait dans l'outil écrit pour les empêcher.
#
# Un dépassement DISPENSÉ reste un dépassement. Il est compté comme tel, dans
# le total, avec sa part dispensée entre parenthèses — jamais soustrait.
def _count(total, waived):
    return f"{total}" + (f" (dont {waived} dispensé{'s' if waived > 1 else ''})"
                         if waived else "")


# `en_over` porte TOUT ce qui dépasse 520 px, dépassements durs compris : un
# titre à 668,9 px dépasse les deux budgets et doit être compté dans les deux.
# Le calculer depuis `en_fail` + `en_waived` l'avait fait retomber à 3 au lieu
# de 4 — /golden-hour-alarm/ n'était comptabilisé que du côté dur.
en_waived_n = sum(1 for path, field, _v, _b in en_over if (path, field) in WAIVED)

print(f"{len(sitemap_paths)} page(s) mesurée(s) · "
      f"{_count(len(hard_fail) + len(hard_waived), len(hard_waived))} dépassement(s) DUR(S) · "
      f"{_count(len(en_over), en_waived_n)} du budget anglais (dur compris) · "
      f"{len(worsened)} aggravation(s) · {len(unused)} exemption(s) inutilisée(s) · "
      f"{len(slack)} gel(s) trop lâche(s)")
if waived_hit:
    print(f"⚠ {len(waived_hit)} dépassement(s) DISPENSÉ(S) — mesurés, visibles, gelés, "
          f"NON CORRIGÉS.\n  Le site dépasse toujours ; c'est l'aggravation qui est "
          f"bloquée, pas le dépassement.\n  Leur réécriture est un arbitrage de marque, "
          f"page par page, avec le porteur.\n  Rejouer sans la table : "
          f"python3 tools-check-metadata.py --no-waivers")

if hard_fail or en_fail or worsened or unused or slack:
    sys.exit(1)
if waived_hit:
    # « aucune régression » n'est PAS « dans les budgets ».
    print(f"✓ aucune régression — mais {len(waived_hit)} dépassement(s) subsistent, gelés")
else:
    print("✓ métadonnées dans les budgets — aucun dépassement, aucune exemption")
