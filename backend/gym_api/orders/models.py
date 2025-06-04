from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid
from gym_api.users.models import User
from gym_api.courses.models import Course

class MembershipPlan(models.Model):
    PLAN_TYPE_CHOICES = [
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('yearly', 'Yearly'),
        ('custom', 'Custom'),
    ]
    
    name = models.CharField(_('Plan name'), max_length=100)
    plan_type = models.CharField(_('Plan type'), max_length=20, choices=PLAN_TYPE_CHOICES)
    duration = models.IntegerField(_('Duration (days)'))
    price = models.DecimalField(_('Price'), max_digits=10, decimal_places=2)
    description = models.TextField(_('Description'), blank=True, null=True)
    benefits = models.TextField(_('Benefits'), blank=True, null=True)
    is_active = models.BooleanField(_('Is active'), default=True)
    
    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('Membership plan')
        verbose_name_plural = _('Membership plan')
        db_table = 'gym_membership_plan'
        
    def __str__(self):
        return f"{self.name} ({self.get_plan_type_display()}) - {self.price}元"

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]
    
    ORDER_TYPE_CHOICES = [
        ('membership', 'Membership'),
        ('course', 'Course'),
        ('product', 'Product'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('wechat', 'Wechat'),
        ('alipay', 'Alipay'),
        ('cash', 'Cash'),
        ('card', 'Card'),
    ]
    
    order_id = models.CharField(_('Order ID'), max_length=50, unique=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders',
                          verbose_name=_('User'))
    order_type = models.CharField(_('Order type'), max_length=20, choices=ORDER_TYPE_CHOICES)
    status = models.CharField(_('Order status'), max_length=20, choices=STATUS_CHOICES, default='pending')
    
    total_amount = models.DecimalField(_('Total amount'), max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(_('Discount amount'), max_digits=10, decimal_places=2, default=0)
    actual_amount = models.DecimalField(_('Actual payment amount'), max_digits=10, decimal_places=2)
    
    payment_method = models.CharField(_('Payment method'), max_length=20, choices=PAYMENT_METHOD_CHOICES, null=True, blank=True)
    payment_id = models.CharField(_('Payment transaction ID'), max_length=100, null=True, blank=True)
    paid_at = models.DateTimeField(_('Payment time'), null=True, blank=True)
    
    remark = models.TextField(_('Remark'), null=True, blank=True)
    
    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('Order')
        verbose_name_plural = _('Order')
        db_table = 'gym_order'
        ordering = ['-created_at']
        
    def __str__(self):
        return f"Order {self.order_id} - {self.user.username} - {self.actual_amount}元"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items',
                           verbose_name=_('Order'))
    
    membership_plan = models.ForeignKey(MembershipPlan, on_delete=models.SET_NULL, null=True, blank=True,
                                      related_name='order_items', verbose_name=_('Membership plan'))
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True,
                            related_name='order_items', verbose_name=_('Course'))
    
    item_name = models.CharField(_('Item name'), max_length=200)
    item_price = models.DecimalField(_('Item price'), max_digits=10, decimal_places=2)
    quantity = models.IntegerField(_('Quantity'), default=1)
    item_total = models.DecimalField(_('Item total'), max_digits=10, decimal_places=2)
    
    class Meta:
        verbose_name = _('Order item')
        verbose_name_plural = _('Order item')
        db_table = 'gym_order_item'
        
    def __str__(self):
        return f"{self.item_name} x {self.quantity} - {self.item_total}元"
    
    def save(self, *args, **kwargs):
        # 自动计算商品总价
        self.item_total = self.item_price * self.quantity
        super().save(*args, **kwargs) 