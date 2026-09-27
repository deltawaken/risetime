#!/usr/bin/env python3
"""Toute image référencée par le site existe sur le disque.

⛔ POURQUOI CE CONTRÔLE EXISTE (2026-09-27). `<ThemedPicture>` ne reçoit qu'une
BASE par thème et en dérive trois fichiers : `.png`, `.webp`, `@2x.webp`. C'est ce
qui rend un appel lisible — mais une dérivation est une promesse, et rien ne la
tenait. Un `@2x.webp` absent ne casse RIEN de visible : le navigateur retombe en
silence sur l'autre densité, la page s'affiche, et personne n'apprend jamais que
la moitié des écrans reçoit une image floue.

Le contrôle porte sur l'EXPORT, pas sur le JSX : il voit donc aussi les chemins
écrits à la main, ceux des métadonnées Open Graph et ceux du JSON-LD — n'importe
quelle URL d'`/assets/` qui sort dans le HTML. C'est la seule façon de ne pas
n'attraper que ce qu'on savait déjà chercher.

⚠️ Il ne dit RIEN de ce que l'image contient. Un fichier présent mais montrant le
mauvais thème, la mauvaise langue ou un écran périmé passe ici sans un mot.
"""

import re
import sys
from pathlib import Path

OUT = Path("out")
PUBLIC = Path("public")

# Toute URL d'asset servie par le site. ⚠️ `@` et `--` en font partie : les oublier
# couperait la chaîne juste avant le suffixe de densité ou de thème, et le contrôle
# vérifierait alors l'existence d'un fichier que personne ne demande.
URL = re.compile(r"/assets/[A-Za-z0-9@/._-]+\.(?:png|webp|svg|jpg|jpeg|ico|avif)")


def main() -> int:
    if not OUT.is_dir():
        print("⛔ out/ absent — lancer le build d'abord")
        return 2

    refs: dict[str, set[str]] = {}
    for page in sorted(OUT.rglob("*.html")):
        for url in URL.findall(page.read_text(encoding="utf-8")):
            refs.setdefault(url, set()).add(str(page.relative_to(OUT)))

    manquants = {u: p for u, p in refs.items() if not (PUBLIC / u.lstrip("/")).exists()}

    if manquants:
        print(f"⛔ {len(manquants)} image(s) référencée(s) et absente(s) de public/ :")
        for url, pages in sorted(manquants.items()):
            ou = ", ".join(sorted(pages)[:3])
            reste = f" (+{len(pages) - 3})" if len(pages) > 3 else ""
            print(f"   {url}\n     citée par {ou}{reste}")
        return 1

    print(f"✓ {len(refs)} image(s) référencée(s), toutes présentes dans public/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
