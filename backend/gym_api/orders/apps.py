from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _
 
class OrdersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'gym_api.orders'
    verbose_name = _('Order management') 