import html,re,sys,difflib,json
PAGES=[("index.html","out/index.html","/"),
       ("alarms/index.html","out/alarms/index.html","/alarms/"),
       ("golden-hour-alarm/index.html","out/golden-hour-alarm/index.html","/golden-hour-alarm/"),
       ("circadian-rhythm-alarm/index.html","out/circadian-rhythm-alarm/index.html","/circadian-rhythm-alarm/"),
       ("timers/index.html","out/timers/index.html","/timers/"),
       ("privacy/index.html","out/privacy/index.html","/privacy/")]
NOISE=re.compile(r"^/_next/")
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
bad=0
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
    fails={k:v for k,v in checks.items() if v[0]!=v[1]}
    # les liens d'icônes viennent du layout : présents des deux côtés mais comptés ici
    print(("OK    " if not fails else "ÉCART ")+url)
    if fails: bad+=1
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
sys.exit(1 if bad else 0)
