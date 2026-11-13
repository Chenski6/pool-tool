"""Assemble Pool-du-CH.html: the whole app in one file (no other files needed).

Run after changing any .js file or Draft Board.dc.html:
    python3 build.py
"""
import pathlib, re

root = pathlib.Path(__file__).parent
page = (root / "Draft Board.dc.html").read_text(encoding="utf-8")


def inline(path):
    code = (root / path).read_text(encoding="utf-8")
    # "</script" inside the code would end the script tag early
    code = code.replace("</script", "<\\/script")
    return "<script>/* " + path + " */\n" + code + "\n</script>"


# React first: the runtime (support.js) uses window.React when it already exists
react = inline("vendor/react.production.min.js") + "\n" + inline("vendor/react-dom.production.min.js") + "\n"


# The data files sit inside <helmet>, which the runtime copies again into <head>
# and would mangle if inlined there. Take them out and inline them in <head>,
# right after support.js, in the same order.
data = []


def take(m):
    data.append(m.group(1))
    return ""


page, n = re.subn(r'<script src="\./((?!support)[\w.-]+\.js)"></script>\n?', take, page)
assert n == 4, n
head = react + inline("support.js") + "\n" + "\n".join(inline(d) for d in data)
page, n = re.subn(r'<script src="\./support\.js"></script>', lambda m: head, page)
assert n == 1, n
n = 5
(root / "Pool-du-CH.html").write_text(page, encoding="utf-8")
print("Pool-du-CH.html", round(len(page.encode()) / 1024), "KB,", n, "files inlined")
