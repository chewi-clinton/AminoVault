from django.contrib import admin
from .models import Category, Product, Coupon


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'sku', 'price', 'old_price', 'category', 'in_stock', 'is_featured', 'is_upsell', 'sort_order']
    list_filter = ['category', 'in_stock', 'is_featured', 'is_upsell']
    search_fields = ['name', 'sku']
    list_editable = ['price', 'in_stock', 'is_featured', 'is_upsell', 'sort_order']


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'discount_percentage', 'discount_amount', 'is_percentage', 'is_active', 'times_used', 'expires_at']
    list_filter = ['is_active', 'is_percentage']
