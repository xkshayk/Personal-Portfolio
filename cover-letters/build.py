"""Build a cover letter PDF from a plain-text letter and the shared template.

Usage (from the repo root):
    python cover-letters/build.py cover-letters/letters/spacex-2027.txt

Letter file format (letters/*.txt):
    Optional header lines at the top, then a blank line, then the letter:
        Date: October 4, 2026          (omit to use today's date)
        Output: Some_File_Name.pdf     (omit to use the letter's file name)
    Blank line = new paragraph. A single line break stays a line break
    (e.g. "Sincerely,\\nName"). Links: [text](https://url).
    Tables: a block of "| a | b |" lines; the first row is the header and a
    "| --- | --- |" separator row is optional.

The PDF is written to cover-letters/output/ using Microsoft Edge's headless
print-to-PDF, so no extra Python packages are needed.
"""

import html
import re
import subprocess
import sys
import tempfile
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TEMPLATE = ROOT / "template.html"
OUTPUT_DIR = ROOT / "output"
EDGE_PATHS = [
    Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
    Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
]
LINK = re.compile(r"\[([^\]]+)\]\((https?://[^)\s]+|mailto:[^)\s]+)\)")


def parse_letter(text):
    headers = {}
    lines = text.splitlines()
    while lines and re.match(r"^(Date|Output):", lines[0], re.I):
        key, value = lines.pop(0).split(":", 1)
        headers[key.strip().lower()] = value.strip()
    body = "\n".join(lines).strip()
    return headers, body


def inline(text):
    escaped = html.escape(text.strip())
    return LINK.sub(lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>', escaped)


def table_html(lines):
    rows = [[cell for cell in line.strip().strip("|").split("|")] for line in lines]
    rows = [r for r in rows if not all(re.fullmatch(r"\s*:?-+:?\s*", c) for c in r)]
    head, *body = rows
    out = ["<table>", "<tr>" + "".join(f"<th>{inline(c)}</th>" for c in head) + "</tr>"]
    out += ["<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in body]
    return "\n".join(out + ["</table>"])


def to_html(body):
    blocks = []
    for block in re.split(r"\n\s*\n", body):
        lines = block.strip().splitlines()
        if lines and all(line.lstrip().startswith("|") for line in lines):
            blocks.append(table_html(lines))
        else:
            blocks.append(f"<p>{'<br>'.join(inline(line) for line in lines)}</p>")
    return "\n".join(blocks)


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    letter = Path(sys.argv[1]).resolve()
    headers, body = parse_letter(letter.read_text(encoding="utf-8"))

    today = date.today()
    letter_date = headers.get("date") or f"{today:%B} {today.day}, {today.year}"
    out_name = headers.get("output") or f"{letter.stem}.pdf"

    page = (
        TEMPLATE.read_text(encoding="utf-8")
        .replace("{{title}}", html.escape(Path(out_name).stem.replace("_", " ")))
        .replace("{{date}}", html.escape(letter_date))
        .replace("{{body}}", to_html(body))
    )

    edge = next((p for p in EDGE_PATHS if p.exists()), None)
    if edge is None:
        sys.exit("Microsoft Edge not found; update EDGE_PATHS in build.py.")

    OUTPUT_DIR.mkdir(exist_ok=True)
    out_path = OUTPUT_DIR / out_name
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as tmp:
        tmp.write(page)
    try:
        subprocess.run(
            [str(edge), "--headless", "--disable-gpu", "--no-pdf-header-footer",
             f"--print-to-pdf={out_path}", Path(tmp.name).as_uri()],
            check=True, capture_output=True,
        )
    finally:
        Path(tmp.name).unlink(missing_ok=True)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
