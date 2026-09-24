import html,re,sys,difflib,json,subprocess
PAGES=[("index.html","out/index.html","/"),
       ("alarms/index.html","out/alarms/index.html","/alarms/"),
       ("golden-hour-alarm/index.html","out/golden-hour-alarm/index.html","/golden-hour-alarm/"),
       ("circadian-rhythm-alarm/index.html","out/circadian-rhythm-alarm/index.html","/circadian-rhythm-alarm/"),
       ("timers/index.html","out/timers/index.html","/timers/"),
       ("privacy/index.html","out/privacy/index.html","/privacy/")]
NOISE=re.compile(r"^/_next/")

# Champs délibérément réécrits par une story, page par page. Tout ce qui n'est PAS
# listé ici reste comparé à main et reste BLOQUANT — en particulier `liens`,
# `images` et `canonical`, qui sont les contrôles qu'une relecture humaine de la
# prose ne fait pas.
#
# Trois règles, sans lesquelles une dispense serait un tapis sous lequel balayer :
#   1. un champ dispensé qui diffère s'imprime quand même, sur une ligne
#      « ~ dispensé » nommant la story — visible, non bloquant ;
#   2. un champ dispensé IDENTIQUE à main s'imprime en avertissement : la story
#      dit qu'il devait être réécrit, donc la réécriture n'a pas eu lieu ;
#   3. `story` et `since` sont obligatoires, et `since` est VÉRIFIÉ ci-dessous :
#      un commentaire qui demande poliment de le mettre à jour n'a jamais rien
#      garanti. Un `since` qui n'est pas un ancêtre de HEAD fait échouer l'outil.
#
# ⏳ PÉREMPTION — cet outil meurt avec la story 9-30. Il compare à `main`, or
# `main` est gelée depuis le 2026-09-24 et cessera d'être servie à la bascule
# vers Cloudflare Pages. Une dispense n'a donc pas à vivre éternellement : son
# échéance est la retraite de l'outil, pas « un jour ». À la bascule, cet outil
# et cette table partent ensemble — et il faut alors accepter que plus rien ne
# compare la prose du site à un état de référence.
WAIVED={
  "timers/index.html":{
    "fields":{"texte","title","description","og:title","JSON-LD"},
    "story":"9-24 — la page minuteurs ouvre sur la répétition",
    # Le commit de réécriture lui-même. Une dispense doit dater de ce qu'elle
    # dispense, pas d'avant : sinon elle couvre aussi ce qui a divergé entre les
    # deux, sans que personne ne l'ait voulu ni relu.
    "since":"963b5c8",
  },
  # L'accueil a divergé de main avec la page 4 de 9-17 : un paragraphe réécrit
  # (il promettait deux fois la même chose) et un lien AJOUTÉ vers la nouvelle
  # page. `liens` est donc dispensé ici, contrairement à /timers/ — c'est assumé
  # et non contagieux : l'ajout du lien EST l'objet de 9-17. La dispense est au
  # nom de 9-17, pas de 9-24, parce que c'est cette story-là qui l'a causée.
  "index.html":{
    "fields":{"texte","liens"},
    "story":"9-17 — la page de la pratique matinale (accueil)",
    "since":"ce5e871",
  },
}
def _is_ancestor(sha):
    try:
        return subprocess.run(["git","merge-base","--is-ancestor",sha,"HEAD"],
                              capture_output=True).returncode==0
    except OSError:
        return None  # pas de git sous la main : on ne prétend pas avoir vérifié
for _src,_w in sorted(WAIVED.items()):
    if not _w.get("story") or not _w.get("since"):
        sys.exit(f"REFUSÉ : dispense sans story ni since pour {_src}.")
    _a=_is_ancestor(_w["since"])
    if _a is None:
        print(f"⚠ since de {_src} NON VÉRIFIÉ (git indisponible)")
    elif not _a:
        sys.exit(f"REFUSÉ : le since {_w['since']!r} de {_src} n'est pas un ancêtre "
                 f"de HEAD. Une dispense pointe le commit qui l'a rendue nécessaire ; "
                 f"un SHA inconnu d'ici est un placeholder qu'on a oublié de remplacer.")
def body(s):
    m=re.search(r"<body[^>]*>(.*?)</body>",s,re.S); return m.group(1) if m else s
def head(s):
    m=re.search(r"<head[^>]*>(.*?)</head>",s,re.S); return m.group(1) if m else ""
def text(s):
    s=re.sub(r"<!--.*?-->","",s,flags=re.S)
    s=re.sub(r"<(script|style)[^>]*>.*?</\1>","",s,flags=re.S|re.I)
    s=re.sub(r"<[^>]+>"," ",s)
    return re.sub(r"\s+"," ",html.unescape(s)).strip()
def norm(u):
    u=u.strip()
    if u.startswith(("http","mailto:","tel:","#")): return u
    u=re.sub(r"^(?:\.\./|\./)+","",u)
    return u if u.startswith("/") else "/"+u
def urls(s,attrs):
    out=set()
    for m in re.finditer(r'(?:%s)\s*=\s*"([^"]*)"'%attrs,s,re.I):
        for part in m.group(1).split(","):
            u=part.strip().split(" ")[0]
            if u:
                n=norm(u)
                if not NOISE.match(n): out.add(n)
    return out
def meta(s,pat):
    m=re.search(pat,s,re.I|re.S); return html.unescape(m.group(1)).strip() if m else None
def ld(s):
    return [json.loads(m.group(1)) for m in
            re.finditer(r'<script type="application/ld\+json"[^>]*>(.*?)</script>',s,re.S)]
bad=0; waived_total=0; warned_total=0
for src,dst,url in PAGES:
    o=open(src,encoding="utf-8").read(); n=open(dst,encoding="utf-8").read()
    ob,nb=body(o),body(n); oh,nh=head(o),head(n)
    checks={
      "texte":      (text(ob), text(nb)),
      "images":     (urls(ob,"src|srcset"), urls(nb,"src|srcset")),
      "liens":      (urls(ob,"href"), urls(nb,"href")),
      "title":      (meta(o,r"<title>(.*?)</title>"), meta(n,r"<title>(.*?)</title>")),
      "description":(meta(o,r'<meta name="description" content="([^"]*)"'),
                     meta(n,r'<meta name="description" content="([^"]*)"')),
      "canonical":  (meta(o,r'<link rel="canonical" href="([^"]*)"'),
                     meta(n,r'<link rel="canonical" href="([^"]*)"')),
      "og:title":   (meta(o,r'<meta property="og:title" content="([^"]*)"'),
                     meta(n,r'<meta property="og:title" content="([^"]*)"')),
      "og:image":   (meta(o,r'<meta property="og:image" content="([^"]*)"'),
                     meta(n,r'<meta property="og:image" content="([^"]*)"')),
      "JSON-LD":    (ld(o), ld(n)),
    }
    diffs={k:v for k,v in checks.items() if v[0]!=v[1]}
    w=WAIVED.get(src)
    wf=w["fields"] if w else set()
    fails={k:v for k,v in diffs.items() if k not in wf}
    waived={k:v for k,v in diffs.items() if k in wf}
    unused=sorted(f for f in wf if f not in diffs)
    # les liens d'icônes viennent du layout : présents des deux côtés mais comptés ici
    print(("ÉCART " if fails else ("~ OK  " if waived else "OK    "))+url)
    if fails: bad+=1
    for k in sorted(waived):
        waived_total+=1
        print(f"    ~ dispensé  {k} — {w['story']} (depuis {w['since']})")
    for k in unused:
        warned_total+=1
        print(f"    ⚠ dispense INUTILISÉE  {k} identique à main — {w['story']} "
              f"dit qu'il devait être réécrit : la réécriture n'a pas eu lieu")
    for k,(a,b) in fails.items():
        if k=="texte":
            d=[l for l in difflib.unified_diff(a.split(" "),b.split(" "),lineterm="",n=2)
               if l.startswith(("+","-")) and not l.startswith(("+++","---"))]
            print(f"    {k}: "+" ".join(d[:24])[:260])
        elif isinstance(a,set):
            print(f"    {k}: manquant {sorted(a-b)[:4]} | en trop {sorted(b-a)[:4]}")
        else:
            print(f"    {k}:\n      avant {a!r}\n      après {b!r}")
print("\n"+("RECOPIE CONFORME sur les 6 pages" if not bad else f"{bad} page(s) en écart"))
if waived_total:
    print(f"{waived_total} champ(s) DISPENSÉ(S) : plus comparés à main, donc plus "
          f"vérifiés par rien. Relecture humaine obligatoire.")
if warned_total:
    print(f"⚠ {warned_total} dispense(s) inutilisée(s) — à retirer de WAIVED ou à honorer.")
sys.exit(1 if bad else 0)
