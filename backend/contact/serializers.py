from rest_framework import serializers
from .models import ContactMessage, WholesaleInquiry


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'first_name', 'last_name', 'phone', 'email', 'message', 'sms_opt_in', 'created_at']
        read_only_fields = ['id', 'created_at']


class WholesaleInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = WholesaleInquiry
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'company_name', 'website', 'inquiry_details', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_inquiry_details(self, value):
        if len(value) > 600:
            raise serializers.ValidationError('Inquiry details cannot exceed 600 characters.')
        return value
