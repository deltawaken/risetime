#!/usr/bin/env python3
"""Porte les pages HTML écrites à la main vers des composants Next (App Router).

Principe : RECOPIER, pas réécrire. Le corps de chaque page est repris verbatim et
converti mécaniquement en JSX. Les seules altérations volontaires sont listées dans
CHANGES ci-dessous et ressortent dans le rapport.
"""
import html
import json
import os
import re
import sys

SITE = "/home/lazuli/Projects/@deltawaken/projects/risetime/website"

# fichier source -> (dossier de route sous app/(en), chemin d'URL)
PAGES = [
    ("index.html", "", "/"),
    ("alarms/index.html", "alarms", "/alarms/"),
    ("golden-hour-alarm/index.html", "golden-hour-alarm", "/golden-hour-alarm/"),
    ("circadian-rhythm-alarm/index.html", "circadian-rhythm-alarm", "/circadian-rhythm-alarm/"),
    ("timers/index.html", "timers", "/timers/"),
    ("privacy/index.html", "privacy", "/privacy/"),
]

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link",
        "meta", "param", "source", "track", "wbr"}

ATTR_MAP = {
    "class": "className", "for": "htmlFor", "srcset": "srcSet",
    "fetchpriority": "fetchPriority", "tabindex": "tabIndex",
    "colspan": "colSpan", "rowspan": "rowSpan", "datetime": "dateTime",
    "crossorigin": "crossOrigin", "http-equiv": "httpEquiv",
    "stroke-width": "strokeWidth", "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin", "fill-rule": "fillRule",
    "clip-rule": "clipRule", "maxlength": "maxLength",
    "autocomplete": "autoComplete", "readonly": "readOnly",
    "novalidate": "noValidate", "enctype": "encType",
    "accept-charset": "acceptCharset", "usemap": "useMap",
}

CHANGES = []


def note(page, what):
    CHANGES.append((page, what))


def style_to_jsx(value):
    out = {}
    for decl in value.split(";"):
        if ":" not in decl:
            continue
        prop, val = decl.split(":", 1)
        prop, val = prop.strip(), val.strip()
        if not prop:
            continue
        # --custom-prop reste tel quel ; sinon kebab -> camel
        key = prop if prop.startswith("--") else re.sub(
            r"-([a-z])", lambda m: m.group(1).upper(), prop)
        out[key] = val
    return "{{" + ", ".join(f"{json.dumps(k)}: {json.dumps(v)}"
                            for k, v in out.items()) + "}}"


def fix_url(u, depth, page):
    """Rend absolue une URL relative. depth = profondeur du fichier source."""
    if re.match(r"^(https?:|mailto:|tel:|#|/)", u):
        return u
    orig = u
    u = re.sub(r"^\./", "", u)
    while u.startswith("../"):
        u = u[3:]
    u = "/" + u
    if u != orig:
        note(page, f"URL relative -> absolue : {orig} -> {u}")
    return u


URL_ATTRS = {"href", "src", "srcset", "content", "action", "poster"}


def convert_tag(m, depth, page):
    raw = m.group(0)
    closing = raw.startswith("</")
    name = m.group("name")
    if closing:
        return f"</{name}>"

    attrs_src = m.group("attrs") or ""
    self_closed = attrs_src.rstrip().endswith("/")
    if self_closed:
        attrs_src = attrs_src.rstrip()[:-1]

    parts = []
    for am in re.finditer(
            r'([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|\'([^\']*)\'|([^\s"\'>]+)))?',
            attrs_src):
        aname = am.group(1)
        aval = am.group(2) if am.group(2) is not None else (
            am.group(3) if am.group(3) is not None else am.group(4))

        if aval is None:                       # attribut booléen
            parts.append(f"{ATTR_MAP.get(aname, aname)}={{true}}")
            continue

        if aname == "style":
            parts.append("style=" + style_to_jsx(aval))
            continue

        if aname in URL_ATTRS and aname != "content":
            if aname == "srcset":
                aval = ", ".join(fix_url(p.strip().split(" ")[0], depth, page)
                                 + (" " + " ".join(p.strip().split(" ")[1:])
                                    if len(p.strip().split(" ")) > 1 else "")
                                 for p in aval.split(","))
            else:
                aval = fix_url(aval, depth, page)

        jname = ATTR_MAP.get(aname, aname)
        # les entités HTML des attributs redeviennent du texte brut
        aval = html.unescape(aval)
        parts.append(f"{jname}={json.dumps(aval, ensure_ascii=False)}")

    attrs = (" " + " ".join(parts)) if parts else ""
    if name.lower() in VOID or self_closed:
        return f"<{name}{attrs} />"
    return f"<{name}{attrs}>"


TAG_RE = re.compile(r"</?(?P<name>[a-zA-Z][\w:-]*)(?P<attrs>(?:[^<>\"']|\"[^\"]*\"|'[^']*')*)>")


COMMENTS = []


def to_jsx(fragment, depth, page):
    # Les commentaires HTML sont mis de côté sous une sentinelle : sinon
    # l'échappement des accolades du texte ré-échapperait les { } des
    # commentaires JSX qu'on vient de produire.
    COMMENTS.clear()

    def stash(m):
        COMMENTS.append("{/*" + m.group(1).replace("*/", "* /") + "*/}")
        return "\x00C%d\x00" % (len(COMMENTS) - 1)

    fragment = re.sub(r"<!--(.*?)-->", stash, fragment, flags=re.S)
    fragment = TAG_RE.sub(lambda m: convert_tag(m, depth, page), fragment)
    return fragment


def unstash(jsx):
    return re.sub(r"\x00C(\d+)\x00", lambda m: COMMENTS[int(m.group(1))], jsx)


def escape_text_braces(jsx):
    """Protège les { } du TEXTE (hors balises et hors commentaires JSX)."""
    out, i, n = [], 0, len(jsx)
    while i < n:
        if jsx.startswith("{/*", i):
            j = jsx.find("*/}", i)
            j = n if j == -1 else j + 3
            out.append(jsx[i:j]); i = j
        elif jsx[i] == "<":
            j = i + 1
            in_s = None
            while j < n:
                c = jsx[j]
                if in_s:
                    if c == in_s:
                        in_s = None
                elif c in "\"'":
                    in_s = c
                elif c == ">":
                    j += 1
                    break
                j += 1
            out.append(jsx[i:j]); i = j
        else:
            j = jsx.find("<", i)
            j = n if j == -1 else j
            chunk = jsx[i:j]
            if "{" in chunk or "}" in chunk:
                chunk = chunk.replace("{", "{'{'}").replace("}", "{'}'}")
                note(page_now, "accolade échappée dans du texte")
            out.append(chunk); i = j
    return "".join(out)


def head_meta(head, page, depth):
    def one(pat):
        m = re.search(pat, head, re.S | re.I)
        return html.unescape(m.group(1)).strip() if m else None

    title = one(r"<title>(.*?)</title>")
    desc = one(r'<meta\s+name="description"\s+content="([^"]*)"')
    canon = one(r'<link\s+rel="canonical"\s+href="([^"]*)"')
    og = {}
    for m in re.finditer(r'<meta\s+property="og:([\w:]+)"\s+content="([^"]*)"', head):
        og[m.group(1)] = html.unescape(m.group(2))
    tw = {}
    for m in re.finditer(r'<meta\s+name="twitter:([\w:]+)"\s+content="([^"]*)"', head):
        tw[m.group(1)] = html.unescape(m.group(2))
    ld = [m.group(1).strip() for m in re.finditer(
        r'<script type="application/ld\+json">(.*?)</script>', head, re.S)]
    return title, desc, canon, og, tw, ld


page_now = ""


def build(src, route_dir, url_path):
    global page_now
    page_now = src
    raw = open(os.path.join(SITE, src), encoding="utf-8").read()
    depth = src.count("/")

    head = re.search(r"<head>(.*?)</head>", raw, re.S).group(1)
    bm = re.search(r"<body([^>]*)>(.*?)</body>", raw, re.S)
    body_attrs, body = bm.group(1), bm.group(2)

    body_class = re.search(r'class="([^"]*)"', body_attrs)
    body_class = body_class.group(1) if body_class else ""
    if "not-ready" in body_class:
        body_class = body_class.replace("not-ready", "").strip()
        note(src, "classe `not-ready` retirée du body (le montage CSS différé disparaît)")

    # le script de repli du CSS différé disparaît avec ce montage
    body, n = re.subn(r'\s*<script>setTimeout\(function\(\)\{document\.body\.classList\.remove\(\'not-ready\'\)\},2000\)</script>', "", body)
    if n:
        note(src, "script setTimeout/not-ready supprimé (l'affichage ne dépend plus de JS)")

    title, desc, canon, og, tw, ld = head_meta(head, src, depth)

    jsx = to_jsx(body.strip(), depth, src)
    jsx = escape_text_braces(jsx)
    jsx = unstash(jsx)
    jsx = "\n".join("      " + l if l.strip() else "" for l in jsx.split("\n"))

    comp = "".join(w.capitalize() for w in (route_dir or "home").split("-")) or "Home"

    meta_lines = [
        f"  title: {json.dumps(title, ensure_ascii=False)},",
        f"  description: {json.dumps(desc, ensure_ascii=False)},",
        f"  alternates: {{ canonical: {json.dumps(url_path)} }},",
    ]
    if og:
        og_img = og.get("image")
        og_o = {
            "title": og.get("title"), "description": og.get("description"),
            "type": og.get("type", "website"), "url": url_path,
        }
        og_o = {k: v for k, v in og_o.items() if v is not None}
        s = ", ".join(f"{k}: {json.dumps(v, ensure_ascii=False)}" for k, v in og_o.items())
        if og_img:
            s += (f", images: [{{ url: {json.dumps(og_img)}"
                  + (f", width: {og['image:width']}" if "image:width" in og else "")
                  + (f", height: {og['image:height']}" if "image:height" in og else "")
                  + " }]")
        meta_lines.append(f"  openGraph: {{ {s} }},")
    if tw:
        t = {"card": tw.get("card", "summary_large_image"),
             "title": tw.get("title"), "description": tw.get("description")}
        t = {k: v for k, v in t.items() if v is not None}
        s = ", ".join(f"{k}: {json.dumps(v, ensure_ascii=False)}" for k, v in t.items())
        if tw.get("image"):
            s += f", images: [{json.dumps(tw['image'])}]"
        meta_lines.append(f"  twitter: {{ {s} }},")

    ld_block = ""
    if ld:
        blobs = []
        for i, blob in enumerate(ld):
            try:
                parsed = json.loads(blob)
                blobs.append(json.dumps(parsed, ensure_ascii=False, indent=2))
            except json.JSONDecodeError:
                note(src, f"JSON-LD #{i+1} illisible — recopié brut")
                blobs.append(json.dumps(blob))
        ld_block = "\nconst jsonLd = [\n" + ",\n".join(blobs) + "\n]\n"

    ld_render = ""
    if ld:
        ld_render = """
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
"""

    out = f"""import type {{ Metadata }} from 'next'

// Porté depuis {src} (commit 967c17d) — recopie, pas réécriture.
// Voir le rapport de portage : references/nextjs-port-report.md

export const metadata: Metadata = {{
{chr(10).join(meta_lines)}
}}
{ld_block}
export default function {comp}Page() {{
  return (
    <div className={json.dumps(body_class)}>{ld_render}
{jsx}
    </div>
  )
}}
"""
    dest_dir = os.path.join(SITE, "app", "(en)", route_dir) if route_dir else os.path.join(SITE, "app", "(en)")
    os.makedirs(dest_dir, exist_ok=True)
    with open(os.path.join(dest_dir, "page.tsx"), "w", encoding="utf-8") as f:
        f.write(out)
    return os.path.relpath(os.path.join(dest_dir, "page.tsx"), SITE)


if __name__ == "__main__":
    written = [build(*p) for p in PAGES]
    print("Écrit :")
    for w in written:
        print("  ", w)
    print("\nAltérations volontaires (%d) :" % len(CHANGES))
    seen = {}
    for pg, what in CHANGES:
        seen.setdefault((pg, what), 0)
        seen[(pg, what)] += 1
    for (pg, what), n in sorted(seen.items()):
        print(f"  {pg:38s} {what}" + (f"  ×{n}" if n > 1 else ""))
