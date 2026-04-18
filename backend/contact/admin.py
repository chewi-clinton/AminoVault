from django.contrib import admin
from .models import ContactMessage, WholesaleInquiry


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'phone', 'sms_opt_in', 'is_read', 'created_at']
    list_filter = ['is_read', 'sms_opt_in', 'created_at']
    search_fields = ['email', 'first_name', 'last_name', 'message']
    list_editable = ['is_read']
    readonly_fields = ['created_at']


@admin.register(WholesaleInquiry)
class WholesaleInquiryAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'first_name', 'last_name', 'email', 'phone', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['company_name', 'email', 'first_name', 'last_name']
    list_editable = ['is_read']
    readonly_fields = ['created_at']
