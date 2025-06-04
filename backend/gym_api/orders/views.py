from rest_framework import generics, status, permissions, filters
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from .models import MembershipPlan, Order, OrderItem
from .serializers import (
    MembershipPlanSerializer,
    OrderSerializer,
    OrderCreateSerializer,
    OrderUpdateSerializer,
)
from gym_api.auth.permissions import IsAdminUserOrReadOnly, IsOwnerOrAdmin, IsStaffOrAdmin, IsAdmin
import requests

class MembershipPlanListCreateView(generics.ListCreateAPIView):
    queryset = MembershipPlan.objects.all()
    serializer_class = MembershipPlanSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'duration', 'created_at']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.method == 'GET':
            user = self.request.user
            
            if not user.is_authenticated or user.role not in ['staff', 'admin']:
                queryset = queryset.filter(is_active=True)
                
        return queryset

class MembershipPlanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MembershipPlan.objects.all()
    serializer_class = MembershipPlanSerializer
    permission_classes = [IsAdminUserOrReadOnly]
class AdminMembershipPlanListView(generics.ListAPIView):
    queryset = MembershipPlan.objects.all()
    serializer_class = MembershipPlanSerializer
    permission_classes = [IsAdmin]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'duration', 'created_at']

class AdminMembershipPlanCreateView(generics.CreateAPIView):
    queryset = MembershipPlan.objects.all()
    serializer_class = MembershipPlanSerializer
    permission_classes = [IsAdmin]

class AdminMembershipPlanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MembershipPlan.objects.all()
    serializer_class = MembershipPlanSerializer
    permission_classes = [IsAdmin]

# 订单视图
class OrderListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'order_type']
    ordering_fields = ['created_at', 'paid_at']
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrderCreateSerializer
        return OrderSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Order.objects.all()
        elif user.role == 'staff':
            return Order.objects.all()
        else:
            return Order.objects.filter(user=user)
    
    def perform_create(self, serializer):
        try:
            order = serializer.save(user=self.request.user)
            print(f"Order created successfully: ID={order.id}, User={self.request.user.username}, Amount={order.actual_amount}")
            
            if order.status == 'paid' and order.order_type == 'membership':
                self.update_user_membership(order)
        except Exception as e:
            print(f"Order creation failed: {str(e)}")
            raise ValidationError(f"Order creation failed: {str(e)}")
    
    def update_user_membership(self, order):
        if order.order_type == 'membership':
            membership_items = order.items.filter(membership_plan__isnull=False)
            
            if membership_items.exists():
                membership_item = membership_items.first()
                plan_id = membership_item.membership_plan.id
                user_id = order.user.id
                
                try:
                    from gym_api.users.views import CreateUserMembershipView
                    request_data = {
                        'user_id': user_id,
                        'plan_id': plan_id
                    }
                    view = CreateUserMembershipView()
                    view.post(request=self.request._request, data=request_data)
                    print(f"用户会员信息更新成功: 用户ID={user_id}, 套餐ID={plan_id}")
                except Exception as e:
                    # 记录错误但不中断流程
                    print(f"更新用户会员信息失败: {str(e)}")

class OrderDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsOwnerOrAdmin]
    
    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return OrderUpdateSerializer
        return OrderSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Order.objects.all()
        elif user.role == 'staff':
            return Order.objects.all()
        else:
            return Order.objects.filter(user=user)
    
    def perform_update(self, serializer):
        instance = self.get_object()
        old_status = instance.status
        
        order = serializer.save()
        
        if old_status == 'pending' and order.status == 'paid':
            self.update_user_membership(order)
    
    def update_user_membership(self, order):
        if order.order_type == 'membership':
            membership_items = order.items.filter(membership_plan__isnull=False)
            
            if membership_items.exists():
                membership_item = membership_items.first()
                plan_id = membership_item.membership_plan.id
                user_id = order.user.id
                
                try:
                    from gym_api.users.views import CreateUserMembershipView
                    request_data = {
                        'user_id': user_id,
                        'plan_id': plan_id
                    }
                    view = CreateUserMembershipView()
                    view.post(request=self.request._request, data=request_data)
                except Exception as e:
                    print(f"Update user membership failed: {str(e)}")

# 管理员订单管理视图
class AdminOrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'order_type', 'payment_method']
    search_fields = ['order_id', 'user__username']
    ordering_fields = ['created_at', 'paid_at', 'total_amount']

class AdminOrderDetailView(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    permission_classes = [IsAdmin]
    
    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return OrderUpdateSerializer
        return OrderSerializer
    
    def perform_update(self, serializer):
        instance = self.get_object()
        old_status = instance.status
        
        order = serializer.save()
        
        if old_status == 'pending' and order.status == 'paid':
            self.update_user_membership(order)
    
    def update_user_membership(self, order):
        if order.order_type == 'membership':
            # 获取订单中的会员套餐信息
            membership_items = order.items.filter(membership_plan__isnull=False)
            
            if membership_items.exists():
                membership_item = membership_items.first()
                plan_id = membership_item.membership_plan.id
                user_id = order.user.id
                
                try:
                    from gym_api.users.views import CreateUserMembershipView
                    request_data = {
                        'user_id': user_id,
                        'plan_id': plan_id
                    }
                    view = CreateUserMembershipView()
                    view.post(request=self.request._request, data=request_data)
                except Exception as e:
                    print(f"Update user membership failed: {str(e)}")

class CancelOrderView(generics.UpdateAPIView):
    permission_classes = [IsOwnerOrAdmin]
    serializer_class = OrderUpdateSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Order.objects.all()
        return Order.objects.filter(user=user)
    
    def update(self, request, *args, **kwargs):
        order = self.get_object()
        
        if order.status != 'pending':
            return Response(
                {'error': 'Only pending orders can be cancelled'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.status = 'cancelled'
        order.save()
        
        serializer = OrderSerializer(order)
        return Response(serializer.data) 