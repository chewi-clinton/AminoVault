import json
import re
from pathlib import Path

from django.core.files import File
from django.core.management.base import BaseCommand

from products.models import Category, Product

SEED_DIR = Path(__file__).resolve().parent.parent.parent / 'seed_data'
IMAGES_DIR = SEED_DIR / 'images'

# Real category taxonomy — slugs must match the frontend nav (Header.jsx /shop/<slug> links)
CATEGORY_SLUGS = {
    'Cellular Structure &amp; Matrix Research': 'cellular',
    'Neurological Signaling &amp; Cognitive Pathways Research': 'neurological',
    'Immune Modulation &amp; Regenerative Processes Research': 'immune',
    'Musculoskeletal Function &amp; Protein Synthesis Research': 'musculoskeletal',
    'Metabolic Regulation &amp; Energy Pathway Research': 'metabolic',
}

# Popular products shown in the cart's "Frequently Bought Together" carousel
UPSELL_SLUGS = {'nad', 'bpc-157', 'tb-500-thymosin-beta-4-43aa', 'kpv10'}
# Products highlighted on the shop/home page
FEATURED_SLUGS = {'bpc-157', 'semax', 'nad', 'ghk-cu', 'tesamorelin'}


def slugify(value):
    value = re.sub(r'&amp;|&', 'and', value)
    value = re.sub(r'[^a-zA-Z0-9]+', '-', value).strip('-').lower()
    return value


def html_unescape(s):
    if not s:
        return s
    return (
        s.replace('&amp;', '&')
        .replace('&#8211;', '-')
        .replace('&#8217;', "'")
        .replace('&nbsp;', ' ')
    )


class Command(BaseCommand):
    help = 'Seed real AminoVault product catalog (scraped data + locally downloaded images)'

    def handle(self, *args, **options):
        data_file = SEED_DIR / 'products.json'
        if not data_file.exists():
            self.stderr.write(self.style.ERROR(f'Seed data not found at {data_file}'))
            return

        products_data = json.loads(data_file.read_text())

        self.stdout.write('Seeding categories...')
        category_map = {}
        for raw_name, slug in CATEGORY_SLUGS.items():
            name = html_unescape(raw_name)
            cat, created = Category.objects.get_or_create(
                slug=slug, defaults={'name': name}
            )
            category_map[raw_name] = cat
            self.stdout.write(f'  [{"Created" if created else "Exists"}] {cat.name}')

        self.stdout.write('Seeding products...')
        sort_order = 1
        count = 0

        for p in products_data:
            category = category_map.get(p['category'])
            name = html_unescape(p['name'])
            description = html_unescape(p['description'])
            is_upsell = p['slug'] in UPSELL_SLUGS
            is_featured = p['slug'] in FEATURED_SLUGS

            rows = []
            if p['variations']:
                for v in p['variations']:
                    price = v['price']
                    regular = v['regular_price']
                    old_price = regular if regular and float(regular) > float(price) else None
                    sku = v['sku'] or f"AV-{slugify(p['slug'])}-{slugify(v['variant'])}"
                    rows.append({
                        'sku': sku,
                        'variant': v['variant'],
                        'price': price,
                        'old_price': old_price,
                        'in_stock': v.get('in_stock', True),
                        'image_url': v.get('image'),
                    })
            else:
                price = p['simple_price']
                regular = p['simple_regular_price']
                if price is None:
                    continue
                old_price = regular if regular and float(regular) > float(price) else None
                sku = p['simple_sku'] or f"AV-{slugify(p['slug'])}"
                rows.append({
                    'sku': sku,
                    'variant': '',
                    'price': price,
                    'old_price': old_price,
                    'in_stock': True,
                    'image_url': p.get('main_image'),
                })

            for row in rows:
                image_url = row.pop('image_url', None) or p.get('main_image')
                local_image = (p.get('downloaded_images') or {}).get(image_url)

                product, created = Product.objects.update_or_create(
                    sku=row['sku'],
                    defaults={
                        'name': name,
                        'description': description,
                        'category': category,
                        'price': row['price'],
                        'old_price': row['old_price'],
                        'variant': row['variant'],
                        'in_stock': row['in_stock'],
                        'is_featured': is_featured,
                        'is_upsell': is_upsell,
                        'sort_order': sort_order,
                    },
                )

                if local_image and not product.image:
                    image_path = IMAGES_DIR / local_image
                    if image_path.exists():
                        try:
                            with open(image_path, 'rb') as f:
                                product.image.save(local_image, File(f), save=True)
                        except Exception as e:
                            self.stderr.write(self.style.WARNING(
                                f'    image upload failed for {product.name}: {e}'
                            ))

                sort_order += 1
                count += 1
                self.stdout.write(f'  [{"Created" if created else "Updated"}] {product.name} ({product.variant or "-"})')

        self.stdout.write(self.style.SUCCESS(
            f'\nDone! {count} products across {len(category_map)} categories seeded.'
        ))
