"""Validate built documentation, internal resources and source-file manifests."""
from argparse import ArgumentParser
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote, urljoin
from xml.etree import ElementTree
import hashlib
import json


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.references = []
        self.seo = []
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'meta' and attrs.get('name') == 'robots':
            self.noindex |= 'noindex' in attrs.get('content', '')
        if tag == 'a' and attrs.get('href'):
            self.references.append(('link', attrs['href']))
        if tag in ('img', 'script') and attrs.get('src'):
            self.references.append((tag, attrs['src']))
        if tag == 'link' and attrs.get('href'):
            kind = attrs.get('rel', 'resource')
            self.references.append((kind, attrs['href']))
            if kind in ('canonical', 'alternate'):
                self.seo.append((kind, attrs['href']))
        if tag == 'source' and attrs.get('srcset', '').startswith('data:'):
            self.references.append(('inline-source', attrs['srcset']))


def validate(root, version):
    dist = root / 'dist'
    pages = {}
    errors = []
    svg_files = list(dist.rglob('*.svg'))
    for svg in svg_files:
        try:
            tree = ElementTree.parse(svg)
            if tree.getroot().tag != '{http://www.w3.org/2000/svg}svg':
                errors.append(f'{svg.relative_to(dist)}: invalid SVG root')
        except ElementTree.ParseError as error:
            errors.append(f'{svg.relative_to(dist)}: invalid SVG XML: {error}')
    for path in dist.rglob('*.html'):
        page = Page()
        page.feed(path.read_text(encoding='utf-8'))
        pages[path.resolve()] = page
    if not pages:
        errors.append('No built HTML pages found')
    checked = 0
    fragments = 0
    for path, page in pages.items():
        relative = path.relative_to(dist).as_posix()
        if path.name == '404.html' and (page.seo or not page.noindex):
            errors.append(f'{relative}: 404 must be noindex without canonical/hreflang targets')
        source_url = 'https://docs.epocanvas.com/' + relative
        for kind, raw in page.references:
            if not raw or raw == '#' or raw.startswith(('mailto:', 'tel:', 'data:', 'javascript:')):
                continue
            url = urlparse(urljoin(source_url, raw))
            if url.netloc != 'docs.epocanvas.com' or url.scheme not in ('http', 'https'):
                continue
            candidate = dist / unquote(url.path.lstrip('/'))
            if candidate.is_dir() or (not candidate.exists() and not candidate.suffix):
                candidate /= 'index.html'
            checked += 1
            if not candidate.is_file():
                errors.append(f'{relative}: missing {kind}: {raw}')
                continue
            if kind == 'link' and url.fragment and candidate.suffix == '.html':
                fragments += 1
                destination = pages.get(candidate.resolve())
                if destination and unquote(url.fragment) not in destination.ids:
                    errors.append(f'{relative}: missing fragment: {raw}')
    manifest_bytes = (root / 'public/tamper-proof.json').read_bytes()
    manifest = json.loads(manifest_bytes)
    for copied in [dist / 'tamper-proof.json', dist / 'epomail/tamper-proof.json']:
        if not copied.exists() or copied.read_bytes() != manifest_bytes:
            errors.append(f'{copied.relative_to(root)}: source manifest differs')
    docs = list((root / 'src/content/docs').rglob('*.md'))
    if len(docs) != manifest['totalDocuments'] or len(manifest['documents']) != len(docs):
        errors.append('Manifest document count differs from source')
    for slug, entry in manifest['documents'].items():
        source = root / entry['path']
        content = source.read_bytes().decode('utf-8').replace('\r\n', '\n')
        encoded = content.encode('utf-8')
        if hashlib.sha256(encoded).hexdigest() != entry['sha256'] or len(encoded) != entry['bytes']:
            errors.append(f'Manifest content mismatch: {slug}')
        headings = [line for line in content.splitlines()[:12] if line.startswith('**')]
        if not any(version in line for line in headings):
            errors.append(f'Unexpected document version: {slug}')
        original = dist / slug / 'index.html'
        mirror = dist / 'epomail' / slug / 'index.html'
        if not original.exists() or not mirror.exists() or original.read_bytes() != mirror.read_bytes():
            errors.append(f'Build mirror differs: {slug}')
    if manifest.get('contentSource') != 'working-tree':
        errors.append('Manifest must identify its source as working-tree')
    result = {
        'html_pages': len(pages), 'internal_references': checked, 'fragments': fragments,
        'manifest_documents': manifest['totalDocuments'], 'source_documents': len(docs),
        'version': version, 'svg_files': len(svg_files), 'errors': len(errors)
    }
    print(json.dumps(result, ensure_ascii=False))
    for error in errors[:60]:
        print(error)
    return bool(errors)


if __name__ == '__main__':
    parser = ArgumentParser(description=__doc__)
    parser.add_argument('--version', required=True)
    options = parser.parse_args()
    raise SystemExit(validate(Path(__file__).resolve().parents[1], options.version))
