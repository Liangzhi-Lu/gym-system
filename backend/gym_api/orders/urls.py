from django.urls import path
from .views import (
    MembershipPlanListCreateView,
    MembershipPlanDetailView,
    OrderListCreateView,
    OrderDetailView,
    CancelOrderView,
    AdminMembershipPlanListView,
    AdminMembershipPlanCreateView,
    AdminMembershipPlanDetailView,
    AdminOrderListView,
    AdminOrderDetailView,
)

app_name = 'orders'

urlpatterns = [
    path('membership-plans/', MembershipPlanListCreateView.as_view(), name='membership-plan-list-create'),
    path('membership-plans/<int:pk>/', MembershipPlanDetailView.as_view(), name='membership-plan-detail'),
    
    path('', OrderListCreateView.as_view(), name='order-list-create'),
    path('<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('<int:pk>/cancel/', CancelOrderView.as_view(), name='order-cancel'),
    
    path('admin/membership-plans/', AdminMembershipPlanListView.as_view(), name='admin-membership-plan-list'),
    path('admin/membership-plans/create/', AdminMembershipPlanCreateView.as_view(), name='admin-membership-plan-create'),
    path('admin/membership-plans/<int:pk>/', AdminMembershipPlanDetailView.as_view(), name='admin-membership-plan-detail'),
    
    path('admin/orders/', AdminOrderListView.as_view(), name='admin-order-list'),
    path('admin/orders/<int:pk>/', AdminOrderDetailView.as_view(), name='admin-order-detail'),
] 