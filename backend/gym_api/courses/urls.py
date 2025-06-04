from django.urls import path
from .views import (
    CourseCategoryListCreateView,
    CourseCategoryDetailView,
    CourseListCreateView,
    CourseDetailView,
    CourseScheduleListCreateView,
    CourseScheduleDetailView,
    CourseEnrollmentListCreateView,
    CourseEnrollmentDetailView,
    # Admin Views
    AdminCourseListView,
    AdminCourseCreateView,
    AdminCourseDetailView,
    AdminCourseScheduleListView,
    AdminCourseScheduleCreateView,
    AdminCourseScheduleDetailView,
    AdminCourseCategoryListView,
    AdminCourseCategoryCreateView,
    AdminCourseCategoryDetailView,
)

app_name = 'courses'

urlpatterns = [
    path('categories/', CourseCategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CourseCategoryDetailView.as_view(), name='category-detail'),
    
    # Course
    path('', CourseListCreateView.as_view(), name='course-list-create'),
    path('<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    
    # Course Schedule
    path('schedules/', CourseScheduleListCreateView.as_view(), name='schedule-list-create'),
    path('schedules/<int:pk>/', CourseScheduleDetailView.as_view(), name='schedule-detail'),
    
    # Course Enrollment
    path('enrollments/', CourseEnrollmentListCreateView.as_view(), name='enrollment-list-create'),
    path('enrollments/<int:pk>/', CourseEnrollmentDetailView.as_view(), name='enrollment-detail'),
    
    # Admin Course Management
    path('admin/courses/', AdminCourseListView.as_view(), name='admin-course-list'),
    path('admin/courses/create/', AdminCourseCreateView.as_view(), name='admin-course-create'),
    path('admin/courses/<int:pk>/', AdminCourseDetailView.as_view(), name='admin-course-detail'),
    
    # Admin Course Category Management  
    path('admin/categories/', AdminCourseCategoryListView.as_view(), name='admin-category-list'),
    path('admin/categories/create/', AdminCourseCategoryCreateView.as_view(), name='admin-category-create'),
    path('admin/categories/<int:pk>/', AdminCourseCategoryDetailView.as_view(), name='admin-category-detail'),
    
    # Admin Course Schedule Management
    path('admin/schedules/', AdminCourseScheduleListView.as_view(), name='admin-schedule-list'),
    path('admin/schedules/create/', AdminCourseScheduleCreateView.as_view(), name='admin-schedule-create'),
    path('admin/schedules/<int:pk>/', AdminCourseScheduleDetailView.as_view(), name='admin-schedule-detail'),
] 