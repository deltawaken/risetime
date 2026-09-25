#!/usr/bin/env python3
"""Le contrôle des langues — story 9-31 §5, §6, §9.

    python3 tools-check-langs.py              # sur out/, après npm run build
    python3 tools-check-langs.py --self-test  # les règles sur des cas FAUX écrits exprès

POURQUOI CET OUTIL EXISTE. La propriété que la story demande de protéger — *sitemap et
`hreflang` sont générés depuis `LOCALES`, jamais écrits à la main* — a pour corollaire que
**quand une langue entre, les jeux `hreflang` de TOUTES les pages changent**. Une propriété qui
change toutes les pages à chaque PR ne se vérifie pas à l'œil.

SES DEUX SOURCES NE SE TOUCHENT JAMAIS.
  · les MOTIFS viennent de `out/` — le HTML réellement exporté ;
  · la VÉRITÉ vient de `lib/pages.ts` et de `content/`.
Un vérificateur qui extrairait les deux côtés du même fichier ne saurait dire que « vert »
([[never-verify-a-diff-with-your-own-pattern]]). C'est la règle de scripts/check-alt-contract.py,
et elle est tenue ici de la même façon.

IL REFUSE DE S'EXÉCUTER plutôt que d'imprimer des chiffres faux — `out/` absent,
`out/sitemap.xml` absent, zéro page HTML exportée. Modèle de tools-strip-runtime.mjs et des
« Refus 1 à 5 » de tools-check-metadata.py.

IL DIT QUELLE PAGE ET DE COMBIEN, jamais un verdict nu : la ligne finale de
tools-check-metadata.py a menti une fois exactement pour cette raison.

⚠️ SUR LA FORMULATION DES RÈGLES. `L7` disait d'abord « `LOCALES` vide ⇒ zéro `<details>` dans
tout l'export ». C'est devenu faux à l'instant où le menu « Uses » est devenu un `<details>`.
**Une règle qui nomme une balise plutôt qu'un rôle se périme au premier composant qui réutilise
cette balise.** `L7` vise donc le CONTENEUR DU SÉLECTEUR (`<nav data-rt-langs>`), pas la balise.
Les écarts de formulation relevés sur les autres règles sont signalés dans le rapport de la
story, pas corrigés en douce ici.

⚠️⚠️ LA LEÇON DE `L7`, POUSSÉE D'UN CRAN — et c'est la correction la plus importante de cet
outil. Une règle qui vérifie « tous ceux qui EXISTENT sont corrects » ne dit RIEN quand il
n'en existe plus aucun. Deux faux verts l'ont prouvé, trouvés en revue :

  · le `<script>` inline retiré de TOUTES les pages  → L1 à L13 vertes ;
  · le conteneur du sélecteur retiré de TOUTES les pages → 0 écart.

Les règles s'accrochaient au marqueur qu'elles cherchaient. **Le test à appliquer à chacune
des treize : que verrait-elle si son objet avait entièrement disparu ?** La réponse doit
toujours être « rouge ». D'où la règle de construction tenue ci-dessous : **l'effectif
ATTENDU se dérive de la VÉRITÉ (`lib/pages.ts` + `content/`), jamais de ce que l'export
contient.** L'export ne sert qu'à dire ce qui y est ; il ne décide jamais de ce qui devrait
y être.
"""

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
# ⚠️ DEUX NOMBRES, ET ILS NE SONT PAS DE MÊME NATURE.
#   · BUDGET_DECLARE = 1200 o : le plafond ÉCRIT dans la story (§4, §10). Jugement, pas mesure.
#   · BUDGET_INLINE  = 1187 o : la valeur CONSTATÉE quand le bloc a existé pour la première
#     fois (2026-09-25). C'est elle qui fait CLIQUET, sur le modèle de METADATA-BUDGET.md :
#     geler sur les 1 200 déclarés laisserait 13 octets dériver en silence. Le jour où le
#     bloc grossit pour une bonne raison, on remonte CE nombre — à la main, et ça se voit
#     dans le diff. C'est tout l'intérêt.
BUDGET_DECLARE = 1200
BUDGET_INLINE = 1187

fails: list[str] = []
notes: list[str] = []


def fail(rule: str, msg: str) -> None:
    fails.append(f"{rule} — {msg}")


# ── LES MOTIFS : ce que l'export contient réellement ────────────────────────────────────────────

ALT = re.compile(r'<link[^>]+rel="alternate"[^>]*>', re.I)
NAV = re.compile(r"<nav\b[^>]*\bdata-rt-langs\b[^>]*>(.*?)</nav>", re.S | re.I)
A = re.compile(r"<a\b([^>]*)>", re.I)
ATTR = re.compile(r'([\w:-]+)="([^"]*)"')
JSONBLOCK = re.compile(r'<script[^>]+id="rt-langs"[^>]*>(.*?)</script>', re.S | re.I)
SCRIPT = re.compile(r"<script\b([^>]*)>(.*?)</script>", re.S | re.I)
LOC = re.compile(r"<loc>([^<]+)</loc>")


def attrs(s: str) -> dict:
    return {k.lower(): v for k, v in ATTR.findall(s)}


class Export:
    """L'export lu depuis un répertoire `out/`. Rien d'autre n'est lu ici."""

    def __init__(self, out: Path):
        self.out = out
        self.pages: dict[str, str] = {}
        for f in sorted(out.rglob("*.html")):
            self.pages[str(f.relative_to(out))] = f.read_text(encoding="utf8")
        sm = out / "sitemap.xml"
        self.locs = set(LOC.findall(sm.read_text(encoding="utf8"))) if sm.exists() else set()
        self.js_files = [str(p.relative_to(out)) for p in out.rglob("*.js")]

    # Le 404 est exclu des règles de sélecteur : il n'est aucune page du registre.
    def content_pages(self) -> dict[str, str]:
        return {k: v for k, v in self.pages.items() if not k.startswith("404")}

    def alternates(self, html: str) -> dict[str, str]:
        out = {}
        for tag in ALT.findall(html):
            a = attrs(tag)
            if "hreflang" in a and "href" in a:
                out[a["hreflang"]] = a["href"]
        return out

    def selector(self, html: str):
        m = NAV.search(html)
        return m.group(1) if m else None

    def entries(self, block: str) -> list[dict]:
        return [attrs(a) for a in A.findall(block)]

    def banner(self, html: str):
        m = JSONBLOCK.search(html)
        return json.loads(m.group(1)) if m else None

    def inline_scripts(self, html: str) -> list[str]:
        """Les blocs inline NON-JSON-LD et non-JSON de langues — au sens de L11."""
        out = []
        for a, body in SCRIPT.findall(html):
            at = attrs(a)
            if at.get("type", "").startswith("application/"):
                continue
            if "src" in at:
                continue
            out.append(body)
        return out

    def foreign_scripts(self, html: str) -> list[str]:
        bad = []
        for a, _ in SCRIPT.findall(html):
            at = attrs(a)
            if at.get("type") == "application/ld+json":
                continue
            if at.get("id") == "rt-langs":
                continue
            if not a.strip():
                continue
            bad.append("<script" + a + ">")
        return bad


# ── LA VÉRITÉ : lib/pages.ts et content/, jamais l'export ───────────────────────────────────────


def read_truth(root: Path) -> dict:
    """LOCALES + les chemins du registre + l'en-tête de chaque content/<lang>/*.md."""
    src = (root / "lib" / "pages.ts").read_text(encoding="utf8")
    m = re.search(r"export const LOCALES: string\[\] = \[([^\]]*)\]", src)
    if not m:
        print("⛔ REFUS — `LOCALES` introuvable dans lib/pages.ts.")
        sys.exit(2)
    locales = re.findall(r"['\"]([\w-]+)['\"]", m.group(1))
    pages = re.findall(r"\{ path: '([^']+)'", src)
    site = re.search(r"export const SITE_URL = '([^']+)'", src).group(1)

    files = {}
    cdir = root / "content"
    if cdir.is_dir():
        for langdir in sorted(p for p in cdir.iterdir() if p.is_dir()):
            for f in sorted(langdir.glob("*.md")):
                raw = f.read_text(encoding="utf8")
                mm = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n?(.*)$", raw, re.S)
                head, body = (mm.group(1), mm.group(2)) if mm else ("", raw)
                data = {}
                for line in head.splitlines():
                    if ":" in line:
                        k, v = line.split(":", 1)
                        v = v.strip().strip("\"'")
                        data[k.strip()] = v
                files[f"{langdir.name}/{f.name}"] = {"lang": langdir.name, "data": data, "body": body}
    digests = {}
    dg = cdir / ".digests.json"
    if dg.exists():
        digests = json.loads(dg.read_text(encoding="utf8"))
    return {"locales": locales, "pages": pages, "site": site, "files": files, "digests": digests}


def url_for(truth: dict, lang: str, page: str):
    if lang == "en":
        return page if any(
            f["lang"] == "en" and f["data"].get("page") == page for f in truth["files"].values()
        ) else None
    for f in truth["files"].values():
        if f["lang"] == lang and f["data"].get("page") == page:
            s = f["data"].get("slug", "")
            return f"/{lang}/{s}/" if s else f"/{lang}/"
    return None


def english_page_of(truth: dict, path: str) -> str:
    """Le chemin ANGLAIS d'une page, depuis une URL de l'export — l'identité de la page.

    `/fr/alarmes/` et `/alarms/` sont la MÊME page ; c'est `page:` dans l'en-tête qui le dit,
    jamais une table écrite à la main."""
    first = path.strip("/").split("/")[0] if path.strip("/") else ""
    if first in truth["locales"]:
        slug = path.strip("/").split("/")[1] if len(path.strip("/").split("/")) > 1 else ""
        for f in truth["files"].values():
            if f["lang"] == first and f["data"].get("slug", "") == slug:
                return f["data"].get("page", "")
        return ""
    return path


def head_of(truth: dict, lang: str, page: str):
    for f in truth["files"].values():
        if f["lang"] == lang and f["data"].get("page") == page:
            return f["data"]
    return None


# ── LES RÈGLES ──────────────────────────────────────────────────────────────────────────────────


def check(exp: Export, truth: dict, *, production: bool = True) -> None:
    site = truth["site"]
    locales = truth["locales"]
    expected_selector = set(["en"] + locales)

    # ---- L1 à L4 : les hreflang, fermés dans les deux sens ------------------------------------
    #
    # L'ATTENDU EST CALCULÉ D'ABORD, depuis la vérité seule : pour chaque page anglaise du
    # registre, les langues de LOCALES qui portent CETTE page et l'ont relue. Une page qui
    # DEVRAIT déclarer des alternates et n'en déclare aucun est donc rouge — y compris si
    # l'export n'en contient plus nulle part. C'est le trou par lequel la disparition
    # totale passait.
    expected_alts: dict[str, set[str]] = {}
    for pg in truth["pages"]:
        others = [l for l in locales
                  if url_for(truth, l, pg) and (head_of(truth, l, pg) or {}).get("reviewed")]
        expected_alts[pg] = ({"en", *others, "x-default"} if others else set())

    declared: dict[str, dict[str, str]] = {}
    url_of_file: dict[str, str] = {}
    for name, html in exp.content_pages().items():
        alts = exp.alternates(html)
        canon0 = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', html)
        want_alts = expected_alts.get(english_page_of(truth, canon0.group(1)[len(site):]) if canon0 else "", set())
        if set(alts) != want_alts:
            fail("L2", f"{name} : alternates {sorted(alts) or 'AUCUN'} ≠ attendu {sorted(want_alts) or 'AUCUN'} "
                       "(attendu calculé depuis LOCALES + content/, pas depuis l'export)")
        if not alts:
            continue
        canon = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', html)
        url = canon.group(1) if canon else site + "/" + name
        url_of_file[name] = url
        declared[url] = alts

        # L2 — auto-référence : toute page ayant au moins un alternate se déclare elle-même.
        if url not in alts.values():
            fail("L2", f"{name} : {len(alts)} alternate(s) mais aucun ne pointe {url}")
        # L3 — `x-default` exactement une fois, vers l'URL ANGLAISE de la page.
        xd = alts.get("x-default")
        if xd is None:
            fail("L3", f"{name} : des alternates mais aucun x-default")
        elif xd != alts.get("en"):
            fail("L3", f"{name} : x-default={xd} alors que l'anglais est {alts.get('en')}")
        # L5 — aucune langue hors LOCALES dans un hreflang.
        for lg in alts:
            if lg != "x-default" and lg not in expected_selector:
                fail("L5", f"{name} : hreflang=\"{lg}\" alors que LOCALES = {locales}")
        # L4 (sens 1) — toute URL citée par un hreflang est un <loc> du sitemap.
        for lg, href in alts.items():
            if lg == "x-default":
                continue
            if href not in exp.locs:
                fail("L4", f"{name} : hreflang {lg} → {href} absent de out/sitemap.xml")

    # L1 — réciprocité : si A déclare B, le fichier de B existe et déclare A.
    for url, alts in declared.items():
        for lg, href in alts.items():
            if lg == "x-default":
                continue
            other = declared.get(href)
            if other is None:
                fail("L1", f"{url} déclare {lg} → {href}, qui ne déclare aucun alternate")
            elif url not in other.values():
                fail("L1", f"{url} déclare {href}, mais {href} ne déclare pas {url} en retour")

    # L4 (sens 2) — tout <loc> TRADUIT porte le jeu complet.
    # ⚠️ Gardée sur « d'autres pages en déclarent » : le cas « PLUS AUCUNE page ne déclare
    # d'alternates » appartient à L2, qui le calcule depuis la vérité. Sans cette garde les
    # deux règles rougissent ensemble et on ne sait plus laquelle attrape quoi.
    if declared:
        for loc in exp.locs:
            path = loc[len(site):]
            lg = path.strip("/").split("/")[0] if path.strip("/") else ""
            if lg in locales and loc not in declared:
                fail("L4", f"<loc> {loc} est traduit mais sa page ne déclare aucun hreflang")

    # ---- L5 (suite) : aucune langue hors LOCALES dans un slug d'URL exporté --------------------
    #
    # ⚠️ CETTE CLAUSE NE VAUT QU'EN PRODUCTION, et la règle telle qu'écrite au §5 ne le dit
    # pas — elle se contredit avec le §9, écrit plus tard, qui fait CONSTRUIRE en preview
    # « LOCALES ∪ les langues présentes dans content/ ». Une preview de PR de langue est
    # exactement le cas où un répertoire `/it/` existe sans que `it` soit dans LOCALES :
    # c'est le but de la preview. Ce qui reste interdit dans LES DEUX builds, c'est qu'une
    # telle langue entre dans un `hreflang`, dans le sitemap ou dans le sélecteur — et ces
    # trois clauses-là ne sont pas gardées.
    if production:
        for name in exp.content_pages():
            first = name.split("/")[0]
            if re.fullmatch(r"[a-z]{2}(-[A-Za-z]+)?", first) and first not in locales:
                fail("L5", f"out/{name} : répertoire de langue « {first} » hors LOCALES {locales}")

    # ---- L6 à L9 : le sélecteur ----------------------------------------------------------------
    # ⚠️ L'attendu, là encore, vient de la VÉRITÉ : dès que (['en'] ∪ LOCALES) compte plus
    # d'une langue, CHAQUE page exportée doit porter un sélecteur. Sans ce calcul, retirer
    # le conteneur de toutes les pages donnait 0 écart (faux vert trouvé en revue).
    selector_expected = len(expected_selector) > 1
    with_selector = []
    for name, html in exp.content_pages().items():
        block = exp.selector(html)
        if block is None:
            if selector_expected and production:
                fail("L8", f"{name} : AUCUN conteneur de sélecteur alors que les langues "
                           f"disponibles sont {sorted(expected_selector)}")
            continue
        with_selector.append(name)
        page_lang = re.search(r"<html[^>]+lang=\"([\w-]+)\"", html)
        cur = page_lang.group(1) if page_lang else "en"
        ents = exp.entries(block)
        got = set()
        for e in ents:
            # L9 — toute entrée porte hreflang, lang et dir. Un <a> sans hreflang dans le
            #      conteneur est une faute : c'est ce qui interdit MÉCANIQUEMENT une entrée
            #      codée en dur dans le JSX.
            missing = [k for k in ("hreflang", "lang", "dir") if k not in e]
            if missing:
                fail("L9", f"{name} : entrée {e.get('href','?')} sans {', '.join(missing)}")
            if "hreflang" in e:
                got.add(e["hreflang"])
        # L6 — fermeture dans les deux sens avec LOCALES.
        want = expected_selector - {cur}
        if got != want:
            fail("L6", f"{name} : entrées {sorted(got)} ≠ (['en'] ∪ LOCALES) \\ {{{cur}}} = {sorted(want)}")

    # L7 — LOCALES vide ⇒ AUCUN conteneur de sélecteur dans tout l'export.
    #      ⚠️ La règle vise le CONTENEUR (`<nav data-rt-langs>`), pas la balise `<details>` :
    #      le menu « Uses » en est un, sur les sept pages, depuis la factorisation.
    #      ⚠️ PRODUCTION SEULEMENT, et la règle telle qu'écrite au §5 ne le dit pas. En
    #      preview, une page `/it/` d'une langue non encore publiée porte légitimement un
    #      sélecteur — son unique entrée est l'anglais — alors que `LOCALES` est vide. Le §9,
    #      écrit après le §5, rend ce cas normal.
    if production and not locales and with_selector:
        fail("L7", f"LOCALES est vide, mais {len(with_selector)} page(s) portent un sélecteur : "
                   + ", ".join(with_selector[:5]))

    # L8 — un sélecteur PAR page exportée (404 exclu), ou aucune.
    #      ⚠️ Formulée « un sélecteur par page » telle quelle, la règle serait fausse
    #      aujourd'hui : avec LOCALES vide il n'y en a AUCUN, et c'est la bonne réponse. Ce
    #      qu'elle attrape réellement, c'est « posé sur PRESQUE toutes les pages ».
    #      ⚠️ PRODUCTION SEULEMENT, pour la même raison que L7 : en preview les pages
    #      anglaises n'ont pas de sélecteur (LOCALES vide) pendant que la page de la langue
    #      relue en a un. « Tout ou rien » n'est vrai que du site publiable.
    total = len(exp.content_pages())
    if production and with_selector and len(with_selector) != total:
        manquantes = sorted(set(exp.content_pages()) - set(with_selector))
        fail("L8", f"{len(with_selector)}/{total} page(s) portent un sélecteur — manquantes : "
                   + ", ".join(manquantes[:5]))

    # ---- L10 : le bloc JSON du bandeau ---------------------------------------------------------
    for name, html in exp.content_pages().items():
        data = exp.banner(html)
        if data is None:
            fail("L10", f"{name} : aucun bloc JSON #rt-langs")
            continue
        if set(data) != expected_selector:
            fail("L10", f"{name} : clés du bandeau {sorted(data)} ≠ {sorted(expected_selector)}")
        for lg, v in data.items():
            if not v.get("label"):
                fail("L10", f"{name} : bandeau {lg} sans label (lang_banner manquant ?)")
            if site + v.get("href", "") not in exp.locs:
                fail("L10", f"{name} : bandeau {lg} → {v.get('href')} absent du sitemap")

    # ---- L11 : le budget du bloc inline, et UN SEUL bloc ---------------------------------------
    for name, html in sorted(exp.content_pages().items()):
        blocks = exp.inline_scripts(html)
        n = sum(len(b.encode("utf8")) for b in blocks)
        notes.append(f"  {name:44s} {len(blocks)} bloc inline · {n:5d} o / {BUDGET_INLINE} o de cliquet (plafond déclaré {BUDGET_DECLARE})")
        # ⚠️ ZÉRO EST UNE FAUTE, et c'est le second faux vert trouvé en revue : la règle
        # n'échouait que sur « plus d'un » et sur le dépassement de budget, jamais sur
        # l'absence. Le bloc retiré de toutes les pages laissait L1–L13 vertes, alors
        # qu'AC27 exige « exactement un ».
        if len(blocks) == 0:
            fail("L11", f"{name} : AUCUN bloc inline — AC27 en exige EXACTEMENT UN "
                        "(bandeau + améliorations du sélecteur)")
        elif len(blocks) > 1:
            fail("L11", f"{name} : {len(blocks)} blocs inline non-JSON-LD — il n'en faut qu'UN "
                        "(une seconde empreinte, c'est une seconde ligne de CSP)")
        if blocks and n > BUDGET_INLINE:
            fail("L11", f"{name} : {n} o de script inline > {BUDGET_INLINE} o de CLIQUET (plafond déclaré {BUDGET_DECLARE} o) — remonter le cliquet est une décision, pas une formalité")

    # ---- L12 : en production, zéro JS servi et aucun <script> hors liste blanche ---------------
    if production:
        if exp.js_files:
            fail("L12", f"{len(exp.js_files)} fichier(s) .js dans l'export : "
                        + ", ".join(exp.js_files[:5]))
        for name, html in exp.pages.items():
            for tag in exp.foreign_scripts(html):
                fail("L12", f"{name} : <script> hors liste blanche — {tag[:100]}")

    # ---- §404 : la page d'erreur est CONTRÔLÉE, pas exemptée -----------------------------------
    #
    # ⚠️ Elle échappait à tout : `content_pages()` l'exclut des règles de sélecteur et de
    # bandeau (à juste titre — elle n'est aucune page du registre), et rien d'autre ne la
    # regardait. Résultat trouvé en revue : `out/404.html` était le STUB par défaut de Next,
    # `<html>` sans `lang`, sans marque, sans lien de retour — et le build était vert.
    # Trois propriétés, les seules qui comptent, et aucune ne se déduit d'un drapeau de
    # configuration : on lit le fichier réellement exporté.
    err = exp.pages.get("404.html")
    if err is None:
        fail("§404", "out/404.html absent : l'hébergeur n'aurait aucun document d'erreur")
    else:
        if not re.search(r"<html[^>]+lang=\"[\w-]+\"", err):
            fail("§404", "out/404.html : <html> sans `lang` — c'est le stub par défaut de Next")
        if "noindex" not in err:
            fail("§404", "out/404.html : pas de `noindex` (404.html de main en portait un)")
        if "site-footer" not in err:
            fail("§404", "out/404.html : ni pied de page ni lien de retour — page portée perdue")

    # ---- L13 : toute page traduite exportée en production porte reviewed ≥ translated ----------
    if production:
        for name in exp.content_pages():
            first = name.split("/")[0]
            if first not in locales:
                continue
            page = None
            for f in truth["files"].values():
                if f["lang"] != first:
                    continue
                slug = f["data"].get("slug", "")
                want = f"{first}/{slug}/index.html" if slug else f"{first}/index.html"
                if want == name:
                    page = f["data"]
            if page is None:
                continue
            rv, tr = page.get("reviewed"), page.get("translated")
            if not rv:
                fail("L13", f"out/{name} : exportée en production sans `reviewed`")
            elif tr and rv < tr:
                fail("L13", f"out/{name} : reviewed {rv} < translated {tr}")


# ── §7 : la barrière une-seule-source, §6 : les deux retards et le cliquet ───────────────────────


def check_content(truth: dict, today: str) -> None:
    files, locales = truth["files"], truth["locales"]
    en_pages = {f["data"].get("page") for f in files.values() if f["lang"] == "en"}

    for name, f in sorted(files.items()):
        d, lang = f["data"], f["lang"]
        page = d.get("page")
        # §6 — fichier orphelin : jamais rendu, invisible. ROUGE.
        if page not in truth["pages"]:
            fail("§6", f"content/{name} : page: {page!r} ne correspond à aucune entrée de PAGES")
            continue
        # §7 — LA BARRIÈRE : une PR de langue ne peut pas ouvrir une page dont l'anglais
        #      n'a pas migré. À tout instant une page est soit JSX-anglais-seul, soit
        #      Markdown dans toutes ses langues. Jamais les deux régimes sur la même page.
        if lang != "en" and page not in en_pages:
            fail("§7", f"content/{name} : page: {page} sans content/en/ correspondant")
        if lang != "en" and lang not in locales:
            notes.append(f"  · content/{name} : langue traduite mais pas encore dans LOCALES")
        # §6 — `updated` absent ou mal formé : contradiction, ROUGE.
        up = d.get("updated", "")
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", up):
            fail("§6", f"content/{name} : `updated` absent ou mal formé ({up!r})")
            continue
        if lang != "en":
            en_up = (head_of(truth, "en", page) or {}).get("updated", "")
            # ⛔ Une traduction ne peut pas dériver d'une version anglaise FUTURE.
            if en_up and up > en_up:
                fail("§6", f"content/{name} : updated {up} POSTÉRIEUR à l'anglais {en_up}")
            rv, tr = d.get("reviewed"), d.get("translated")
            if rv and not tr:
                fail("§9", f"content/{name} : `reviewed` sans `translated`")
            if rv and rv > today:
                fail("§9", f"content/{name} : `reviewed` {rv} postérieur à aujourd'hui {today}")

    # §9 — une langue de `LOCALES` est PUBLIÉE : son accueil doit exister et être relu.
    #      Sans ce contrôle, le sélecteur porterait sur toutes les pages une entrée vers
    #      un `/xx/` qui n'a pas été construit — un lien mort sur tout le site. Trouvé en
    #      construisant le cas (`reviewed` retiré de content/de/home.md), pas en relisant.
    for lg in locales:
        h = head_of(truth, lg, "/")
        if h is None:
            fail("§9", f"LOCALES contient « {lg} » mais content/{lg}/ n'a pas de page d'accueil")
        elif not h.get("reviewed"):
            fail("§9", f"LOCALES contient « {lg} » dont l'accueil n'est pas relu : "
                       "une langue est publiable SSI toutes ses pages portent un `reviewed`")

    # ---- Le cliquet d'empreintes (§6, AC20) ---------------------------------------------------
    dg = truth["digests"]
    for name, f in sorted(files.items()):
        h = hashlib.sha256(f["body"].encode("utf8")).hexdigest()
        prev = dg.get(name)
        if prev is None:
            fail("§6", f"content/{name} : absent de content/.digests.json — `npm run content:seal`")
        elif prev["body"] != h and prev["updated"] == f["data"].get("updated"):
            fail("§6", f"content/{name} : le CORPS a changé sans que `updated` bouge "
                       f"(scellé {prev['updated']}, en-tête {f['data'].get('updated')}) — "
                       "avancer la date, puis `npm run content:seal`")
    for name in dg:
        if name not in files:
            fail("§6", f"content/.digests.json cite {name}, qui n'existe plus")


def lateness_report(truth: dict) -> None:
    """§9 — DEUX retards, TOUJOURS imprimés sur deux lignes distinctes, même à zéro.

    ⚠️ C'est le piège du circuit : une retouche anglaise déclenche une retraduction machine
    quasi gratuite qui fait avancer `translated` — et donc RÉPARE le premier retard tout en
    CRÉANT le second, sans que rien ne rougisse. Si le rapport ne les séparait pas, on verrait
    la file « traduction en retard » se vider toute seule et on en conclurait que le circuit
    tourne, pendant que la dette de relecture grossit en dessous.

    ⛔ Aucun des deux ne dépublie quoi que ce soit, et aucun ne fait sortir non nul.
    """
    stale_tr, stale_rv = [], []
    for name, f in sorted(truth["files"].items()):
        if f["lang"] == "en":
            continue
        d = f["data"]
        en_up = (head_of(truth, "en", d.get("page", "")) or {}).get("updated", "")
        tr, rv = d.get("translated", ""), d.get("reviewed", "")
        if en_up and tr and tr < en_up:
            stale_tr.append((tr, name, en_up))
        if tr and rv and rv < tr:
            stale_rv.append((rv, name, tr))
    stale_tr.sort()
    stale_rv.sort()
    print(f"\n  traductions périmées (translated < updated(en)) : {len(stale_tr)}")
    for tr, name, en_up in stale_tr:
        print(f"    {name:32s} anglais {en_up} · traduit {tr}")
    print(f"  relectures périmées  (reviewed < translated)     : {len(stale_rv)}")
    for rv, name, tr in stale_rv:
        print(f"    {name:32s} traduit {tr} · relu {rv}   ⚠️ un humain natif, et lui seul")


# ── Le témoin : les règles sur des cas FAUX écrits exprès ───────────────────────────────────────


def self_test() -> int:
    """« Un contrôle dont on n'a jamais vu le rouge n'est pas un contrôle. »

    Chaque cas de tools-fixtures/langs-broken/ casse EXACTEMENT une règle, et ce test échoue
    si l'une d'elles reste VERTE. C'est ce que [[prove-the-search-rule]] demande.
    """
    global fails, notes
    base = ROOT / "tools-fixtures" / "langs-broken"
    if not base.is_dir():
        print(f"⛔ REFUS — {base} absent : il n'y a aucun cas faux à éprouver.")
        return 2
    cases = sorted(p for p in base.iterdir() if p.is_dir())
    if not cases:
        print(f"⛔ REFUS — {base} est vide.")
        return 2
    bad = 0
    for case in cases:
        expected = (case / "EXPECTED").read_text(encoding="utf8").strip()
        truth = json.loads((case / "truth.json").read_text(encoding="utf8"))
        truth.setdefault("files", {})
        truth.setdefault("digests", {})
        fails, notes = [], []
        check(Export(case / "out"), truth, production=truth.get("production", True))
        got = sorted({f.split(" — ")[0] for f in fails})
        # ⚠️ ÉGALITÉ, pas appartenance. La docstring promet « chaque cas casse EXACTEMENT
        # une règle » ; `expected in got` laissait passer des fixtures qui en cassaient
        # deux ou trois, et un cas qui fait rougir trois règles ne prouve pas laquelle
        # attrape quoi. Relevé en revue.
        ok = got == [expected]
        print(f"  {'✓' if ok else '✗'} {case.name:26s} attendu EXACTEMENT [{expected}] · obtenu {got or 'RIEN'}")
        if not ok:
            bad += 1
            for f in fails:
                print(f"      {f}")
    fails, notes = [], []
    if bad:
        print(f"\n⛔ {bad} cas n'ont pas donné EXACTEMENT la règle attendue. Un contrôle qu'on "
              "n'a jamais vu rougir n'est pas un contrôle — et un cas qui fait rougir trois "
              "règles ne prouve pas laquelle attrape quoi.")
        return 1
    print(f"\n✓ {len(cases)} cas faux, {len(cases)} règles vues ROUGES.")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--self-test", action="store_true")
    ap.add_argument("--out", default="out")
    ap.add_argument("--today", default=None)
    args = ap.parse_args()
    if args.self_test:
        return self_test()

    out = ROOT / args.out
    # ---- Les refus : plutôt que d'imprimer des chiffres faux -----------------------------------
    if not out.is_dir():
        print(f"⛔ REFUS — {out}/ absent. Lancer `npm run build` d'abord.")
        return 2
    if not (out / "sitemap.xml").exists():
        print(f"⛔ REFUS — {out}/sitemap.xml absent : rien à fermer avec les hreflang.")
        return 2
    exp = Export(out)
    if not exp.pages:
        print(f"⛔ REFUS — zéro page HTML dans {out}/.")
        return 2

    truth = read_truth(ROOT)
    from datetime import date
    import os
    today = args.today or date.today().isoformat()
    # ⚠️ Le DÉFAUT est la production : une preview se demande explicitement, et l'oubli ne
    # peut donc produire qu'un contrôle plus SÉVÈRE, jamais plus laxiste (AC23).
    production = os.environ.get("BUILD_TARGET") != "preview"
    if not production:
        print("⚠️ BUILD_TARGET=preview — L5 (répertoires) et L12/L13 ne s'appliquent pas :\n"
              "   la preview construit DÉLIBÉRÉMENT les langues non relues, en noindex, et\n"
              "   hors sitemap. Ce build N'EST PAS publiable.")

    check(exp, truth, production=production)
    check_content(truth, today)

    print(f"\nLangues : LOCALES = {truth['locales'] or '[] (anglais seul)'} · "
          f"{len(exp.content_pages())} page(s) exportée(s) · {len(exp.locs)} <loc>")
    print("Budget du bloc inline (L11) — octetage RÉEL, c'est ce chiffre qui fait cliquet :")
    for n in notes:
        print(n)
    lateness_report(truth)

    if fails:
        print(f"\n⛔ {len(fails)} écart(s) :")
        for f in fails:
            print(f"  {f}")
        return 1
    print("\n✓ L1–L13 vertes, et le contenu est cohérent avec LOCALES.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
