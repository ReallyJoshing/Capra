"""Import the approved Field Study 03 catalog and its unchanged preview images."""
import json
from pathlib import Path
import re
import shutil

root = Path(__file__).resolve().parents[1]
source = root.parent / 'odle-field-study-03'
book = json.loads((source / 'data/design-book.json').read_text())
groups = {
    'Jackets': [1, 2, 3, 4, 5, 34],
    'Vests': [6],
    'Fleece & knits': [7, 9, 10],
    'Hoodies': [8, 35],
    'Shirts': [11, 12, 14, 16],
    'Base layers': [13, 15, 20, 44],
    'Pants': [17, 18, 19, 22, 32, 33, 37],
    'Shorts': [21, 36],
    'Headwear': [23, 24, 25, 26, 27, 38, 39, 46],
    'Gloves & mitts': [28, 40, 41, 48, 49, 50],
    'Belts & suspenders': [29, 47],
    'Neckwear': [30],
    'Socks & booties': [31, 43],
    'Gaiters & sleeves': [42, 45],
}
accessories = set(range(23, 32)) | set(range(38, 44)) | set(range(45, 51))
images = root / 'public/images/field-study-03'
images.mkdir(parents=True, exist_ok=True)
catalog = []
assert len(book['concepts']) == 50
for concept in book['concepts']:
    code = concept['code']
    assert len(concept['features']) == 5, code
    name = concept['name'].title()
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    color = concept['colors'][0]
    shutil.copy2(source / concept['preview'], images / f'{slug}.jpg')
    catalog.append({
        'id': slug, 'name': name,
        'category': 'accessories' if int(code) in accessories else 'clothing',
        'type': next(group for group, codes in groups.items() if int(code) in codes),
        'color': color, 'colorHex': book['palette'][color],
        'imageClass': 'product-image-concept',
        'images': [{'src': f'/images/field-study-03/{slug}.jpg',
                    'alt': f'{name} in {color.lower()} — generated garment design study',
                    'label': 'Design study', 'generated': True}],
        'concept': {key: concept[key] for key in ['code', 'intro', 'description', 'fit', 'validation', 'features']}
    })
    catalog[-1]['concept']['kind'] = concept['type']
assert len({product['id'] for product in catalog}) == 50
(root / 'src/data/field-study-03.json').write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + '\n')
print(f'Imported {len(catalog)} concepts, 250 features and 50 images.')
