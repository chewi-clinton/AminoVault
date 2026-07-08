from rest_framework import serializers

class ContactFormSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    phone = serializers.CharField(max_length=20)
    email = serializers.EmailField()
    message = serializers.CharField()
    sms_opt_in = serializers.BooleanField(default=False)

class WholesaleFormSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20)
    company_name = serializers.CharField(max_length=100)
    website = serializers.URLField(required=False, allow_blank=True)
    inquiry_details = serializers.CharField()