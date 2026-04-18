from rest_framework import serializers
from .models import Category, Product, Coupon


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True, required=False, allow_null=True
    )
    discount_percentage = serializers.ReadOnlyField()
    image_src = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'sku', 'name', 'description', 'category', 'category_id',
            'price', 'old_price', 'image', 'image_url', 'image_src',
            'variant', 'in_stock', 'is_featured', 'is_upsell',
            'discount_percentage', 'sort_order', 'created_at',
        ]

    def get_image_src(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or ''


class AdminProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', required=False, allow_null=True
    )
    discount_percentage = serializers.ReadOnlyField()
    image_src = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'sku', 'name', 'description', 'category_id', 'category_name',
            'price', 'old_price', 'image', 'image_url', 'image_src',
            'variant', 'in_stock', 'is_featured', 'is_upsell',
            'discount_percentage', 'sort_order', 'created_at',
        ]

    def get_image_src(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url or ''


class CouponValidateSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=50)


class CouponResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['code', 'discount_percentage', 'discount_amount', 'is_percentage']
