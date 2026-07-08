from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from apps.products.models import Product, Category
from .models import Order


class OrderFlowTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name="Peptides")
        self.product = Product.objects.create(
            name="Test Peptide",
            sku="TEST-001",
            price="29.99",
            category=self.category,
            in_stock=True,
        )

    def test_create_order_and_track_it(self):
        payload = {
            "customer_first_name": "Jane",
            "customer_last_name": "Doe",
            "customer_email": "jane@example.com",
            "customer_phone": "+15550000000",
            "shipping_address_line1": "123 Test St",
            "shipping_address_line2": "Apt 4",
            "shipping_city": "New York",
            "shipping_state": "NY",
            "shipping_zip": "10001",
            "shipping_country": "US",
            "notes": "Please call before delivery",
            "items": [{"product_id": self.product.id, "quantity": 2}],
            "shipping_protection": False,
            "coupon_code": "",
        }

        create_response = self.client.post(reverse("order-create"), payload, format="json")
        self.assertEqual(create_response.status_code, 201)
        self.assertEqual(Order.objects.count(), 1)

        order = Order.objects.get(customer_email="jane@example.com")
        track_response = self.client.post(
            reverse("order-track"),
            {"order_number": order.order_number, "billing_email": "jane@example.com"},
            format="json",
        )
        self.assertEqual(track_response.status_code, 200)
        self.assertEqual(track_response.json()["order_number"], order.order_number)
