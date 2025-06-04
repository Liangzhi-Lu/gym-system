from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import MembershipPlan, Order, OrderItem

@admin.register(MembershipPlan)
class MembershipPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration', 'is_active')
    list_filter = ('is_active', 'plan_type')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {'fields': ('name', 'description', 'plan_type', 'duration', 'price')}),
        (_('status'), {'fields': ('is_active',)}),
        (_('metadata'), {'fields': ('created_at', 'updated_at')}),
    )

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('item_total',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_amount', 'status', 'payment_method', 'created_at')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('id', 'user__username', 'user__phone')
    inlines = [OrderItemInline]
    readonly_fields = ('created_at', 'updated_at', 'total_amount')
    fieldsets = (
        (None, {'fields': ('user', 'status', 'payment_method')}),
        (_('Payment information'), {'fields': ('total_amount', 'transaction_id')}),
        (_('Address information'), {'fields': ('address', 'contact_phone')}),
        (_('Note'), {'fields': ('note',)}),
        (_('Metadata'), {'fields': ('created_at', 'updated_at')}),
    )
    
    actions = ['mark_as_paid', 'mark_as_delivered', 'mark_as_completed', 'mark_as_refunded']
    
    def mark_as_paid(self, request, queryset):
        queryset.update(status='paid')
    mark_as_paid.short_description = _('Mark as paid')
    
    def mark_as_delivered(self, request, queryset):
        queryset.update(status='delivered')
    mark_as_delivered.short_description = _('Mark as delivered')
    
    def mark_as_completed(self, request, queryset):
        queryset.update(status='completed')
    mark_as_completed.short_description = _('Mark as completed')
    
    def mark_as_refunded(self, request, queryset):
        queryset.update(status='refunded')
    mark_as_refunded.short_description = _('Mark as refunded') 