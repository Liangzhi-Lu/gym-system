from django.urls import path
from .views import (
    UserListCreateView,
    UserDetailView,
    UserProfileView,
    ChangePasswordView,
    CurrentUserView,
    # 教练管理视图
    InstructorListView,
    InstructorCreateView,
    InstructorDetailView,
    # 会员管理视图
    UserMembershipView,
    AdminUserMembershipView,
    CreateUserMembershipView,
)

app_name = 'users'

urlpatterns = [
    path('', UserListCreateView.as_view(), name='user-list-create'),
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('profile/<int:user_id>/', UserProfileView.as_view(), name='user-profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    
    # 教练管理接口
    path('instructors/', InstructorListView.as_view(), name='instructor-list'),
    path('instructors/create/', InstructorCreateView.as_view(), name='instructor-create'),
    path('instructors/<int:pk>/', InstructorDetailView.as_view(), name='instructor-detail'),
    
    # 会员管理接口
    path('membership/', UserMembershipView.as_view(), name='user-membership'),
    path('admin/user-membership/<int:user_id>/', AdminUserMembershipView.as_view(), name='admin-user-membership'),
    path('create-membership/', CreateUserMembershipView.as_view(), name='create-membership'),
] 