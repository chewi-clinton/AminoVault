from django.core.management.base import BaseCommand
from products.models import Category, Product


CATEGORIES = [
    {'name': 'Growth Hormone Peptides', 'slug': 'growth-hormone-peptides'},
    {'name': 'Healing & Recovery', 'slug': 'healing-recovery'},
    {'name': 'Cognitive & Mood', 'slug': 'cognitive-mood'},
    {'name': 'Anti-Aging & Longevity', 'slug': 'anti-aging-longevity'},
    {'name': 'Weight Management', 'slug': 'weight-management'},
    {'name': 'Immune Support', 'slug': 'immune-support'},
    {'name': 'Accessories', 'slug': 'accessories'},
]

PRODUCTS = [
    {
        'sku': 'BAC-30ML',
        'name': 'Hospira BAC Water 30 ML',
        'price': '33.99',
        'old_price': None,
        'variant': '30ml',
        'category_slug': 'accessories',
        'sort_order': 1,
        'image_url': 'https://aminovault.com/wp-content/uploads/2024/01/bac-water.jpg',
    },
    {
        'sku': 'CJC-IPAM-BLEND',
        'name': 'CJC-1295 + Ipamorelin',
        'price': '98.99',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'growth-hormone-peptides',
        'sort_order': 2,
        'image_url': '',
    },
    {
        'sku': 'CJC-NODAC-10MG',
        'name': 'CJC-1295 No DAC',
        'price': '98.00',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'growth-hormone-peptides',
        'sort_order': 3,
        'image_url': '',
    },
    {
        'sku': 'GHK-CU-100MG',
        'name': 'GHK-Cu',
        'price': '61.00',
        'old_price': None,
        'variant': '100mg',
        'category_slug': 'anti-aging-longevity',
        'sort_order': 4,
        'image_url': '',
    },
    {
        'sku': 'GLP1-736-10MG',
        'name': 'Glucagon-Like Peptide-1 (7-36)',
        'price': '79.05',
        'old_price': '93.00',
        'variant': '10mg',
        'category_slug': 'weight-management',
        'sort_order': 5,
        'image_url': '',
    },
    {
        'sku': 'GLP2-T-10MG',
        'name': 'GLP-2 (T)',
        'price': '83.30',
        'old_price': '98.00',
        'variant': '10mg',
        'category_slug': 'weight-management',
        'sort_order': 6,
        'image_url': '',
    },
    {
        'sku': 'GLP3-R-LY-20MG',
        'name': 'GLP-3 (R) LY3437943',
        'price': '228.00',
        'old_price': None,
        'variant': '20mg',
        'category_slug': 'weight-management',
        'sort_order': 7,
        'image_url': '',
    },
    {
        'sku': 'KLOW-80MG',
        'name': 'KLOW Stack',
        'price': '149.99',
        'old_price': None,
        'variant': '80mg',
        'category_slug': 'healing-recovery',
        'sort_order': 8,
        'image_url': '',
    },
    {
        'sku': 'IPAM-10MG',
        'name': 'Ipamorelin',
        'price': '64.00',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'growth-hormone-peptides',
        'sort_order': 9,
        'image_url': '',
    },
    {
        'sku': 'BPC157-10MG',
        'name': 'BPC-157',
        'price': '64.00',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'healing-recovery',
        'sort_order': 10,
        'is_upsell': True,
        'image_url': '',
    },
    {
        'sku': 'WOLVERINE-BLEND',
        'name': 'Wolverine Blend BPC-157/TB-500',
        'price': '125.00',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'healing-recovery',
        'sort_order': 11,
        'image_url': '',
    },
    {
        'sku': 'MT2-10MG',
        'name': 'Melanotan II',
        'price': '61.50',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'anti-aging-longevity',
        'sort_order': 12,
        'image_url': '',
    },
    {
        'sku': 'MOTS-C-10MG',
        'name': 'MOTS-c',
        'price': '59.50',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'anti-aging-longevity',
        'sort_order': 13,
        'image_url': '',
    },
    {
        'sku': 'NAD-1000MG',
        'name': 'NAD+ 1000mg',
        'price': '175.95',
        'old_price': '207.00',
        'variant': '1000mg',
        'category_slug': 'anti-aging-longevity',
        'sort_order': 14,
        'is_upsell': True,
        'image_url': '',
    },
    {
        'sku': 'SELANK-SEMAX-BLEND',
        'name': 'Selank Semax Blend',
        'price': '170.00',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'cognitive-mood',
        'sort_order': 15,
        'image_url': '',
    },
    {
        'sku': 'SERMO-5MG',
        'name': 'Sermorelin',
        'price': '58.50',
        'old_price': None,
        'variant': '5mg',
        'category_slug': 'growth-hormone-peptides',
        'sort_order': 16,
        'image_url': '',
    },
    {
        'sku': 'SS31-10MG',
        'name': 'SS-31',
        'price': '63.00',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'anti-aging-longevity',
        'sort_order': 17,
        'image_url': '',
    },
    {
        'sku': 'TB500-10MG',
        'name': 'TB-500',
        'price': '61.00',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'healing-recovery',
        'sort_order': 18,
        'image_url': '',
    },
    {
        'sku': 'KPV-10MG',
        'name': 'KPV',
        'price': '69.60',
        'old_price': '87.00',
        'variant': '10mg',
        'category_slug': 'healing-recovery',
        'sort_order': 19,
        'is_upsell': True,
        'image_url': '',
    },
    {
        'sku': 'GLUT-1500MG',
        'name': 'L-Glutathione',
        'price': '85.50',
        'old_price': None,
        'variant': '1500mg',
        'category_slug': 'immune-support',
        'sort_order': 20,
        'image_url': '',
    },
    {
        'sku': 'THYMALIN-10MG',
        'name': 'Thymalin',
        'price': '69.00',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'immune-support',
        'sort_order': 21,
        'image_url': '',
    },
    {
        'sku': 'THYMALPHA1-10MG',
        'name': 'Thymosin Alpha-1',
        'price': '120.00',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'immune-support',
        'sort_order': 22,
        'image_url': '',
    },
    {
        'sku': 'B12-20ML',
        'name': 'Vitamin B12',
        'price': '69.00',
        'old_price': None,
        'variant': '20ml',
        'category_slug': 'anti-aging-longevity',
        'sort_order': 23,
        'image_url': '',
    },
    {
        'sku': 'TESA-10MG',
        'name': 'Tesamorelin',
        'price': '98.50',
        'old_price': None,
        'variant': '10mg',
        'category_slug': 'growth-hormone-peptides',
        'sort_order': 24,
        'image_url': '',
    },
]


class Command(BaseCommand):
    help = 'Seed initial product and category data into the database'

    def handle(self, *args, **options):
        self.stdout.write('Seeding categories...')
        category_map = {}
        for cat_data in CATEGORIES:
            cat, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults={'name': cat_data['name']},
            )
            category_map[cat_data['slug']] = cat
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  [{status}] {cat.name}')

        self.stdout.write('Seeding products...')
        for p_data in PRODUCTS:
            category = category_map.get(p_data.pop('category_slug'))
            p_data.setdefault('is_upsell', False)
            product, created = Product.objects.update_or_create(
                sku=p_data['sku'],
                defaults={**p_data, 'category': category},
            )
            status = 'Created' if created else 'Updated'
            self.stdout.write(f'  [{status}] {product.name}')

        self.stdout.write(self.style.SUCCESS(f'\nDone! {len(PRODUCTS)} products and {len(CATEGORIES)} categories seeded.'))
