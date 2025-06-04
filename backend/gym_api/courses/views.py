from rest_framework import generics, status, permissions, filters
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from .models import CourseCategory, Course, CourseSchedule, CourseEnrollment
from .serializers import (
    CourseCategorySerializer,
    CourseSerializer,
    CourseDetailSerializer,
    CourseScheduleSerializer,
    CourseEnrollmentSerializer,
)
from gym_api.auth.permissions import IsAdminUserOrReadOnly, IsOwnerOrAdmin, IsStaffOrAdmin, IsAdmin

class CourseCategoryListCreateView(generics.ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [IsAdminUserOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']

class CourseCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [IsAdminUserOrReadOnly]

class AdminCourseCategoryListView(generics.ListAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [IsAdmin]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']

class AdminCourseCategoryCreateView(generics.CreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [IsAdmin]

class AdminCourseCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [IsAdmin]

class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsStaffOrAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'instructor', 'difficulty', 'is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'price', 'created_at']
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return super().get_permissions()
    
    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        
        if user.is_authenticated and user.role in ['staff', 'admin']:
            return queryset
        
        return queryset.filter(is_active=True)

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    permission_classes = [IsStaffOrAdmin]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CourseDetailSerializer
        return CourseSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return super().get_permissions()

class AdminCourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'instructor', 'difficulty', 'is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'price', 'created_at']

class AdminCourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdmin]

class AdminCourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer
    permission_classes = [IsAdmin]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CourseDetailSerializer
        return CourseSerializer

class CourseScheduleListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseScheduleSerializer
    permission_classes = [IsStaffOrAdmin]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['course']
    ordering_fields = ['start_time', 'created_at']
    
    def get_queryset(self):
        queryset = CourseSchedule.objects.all()
        course_id = self.request.query_params.get('course_id')
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        return queryset
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return super().get_permissions()

class CourseScheduleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseSchedule.objects.all()
    serializer_class = CourseScheduleSerializer
    permission_classes = [IsStaffOrAdmin]
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return super().get_permissions()

class AdminCourseScheduleListView(generics.ListAPIView):
    serializer_class = CourseScheduleSerializer
    permission_classes = [IsAdmin]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['course']
    ordering_fields = ['start_time', 'created_at']
    
    def get_queryset(self):
        queryset = CourseSchedule.objects.all()
        course_id = self.request.query_params.get('course_id')
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        return queryset

class AdminCourseScheduleCreateView(generics.CreateAPIView):
    queryset = CourseSchedule.objects.all()
    serializer_class = CourseScheduleSerializer
    permission_classes = [IsAdmin]

class AdminCourseScheduleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseSchedule.objects.all()
    serializer_class = CourseScheduleSerializer
    permission_classes = [IsAdmin]

class CourseEnrollmentListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseEnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['user', 'schedule', 'status']
    ordering_fields = ['created_at']
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return CourseEnrollment.objects.all()
        elif user.role == 'staff':
            return CourseEnrollment.objects.filter(schedule__course__instructor=user)
        else:
            return CourseEnrollment.objects.filter(user=user)
    
    def perform_create(self, serializer):
        schedule = serializer.validated_data.get('schedule')
        if CourseEnrollment.objects.filter(user=self.request.user, schedule=schedule).exists():
            raise ValidationError('You have already enrolled in this course')
        
        serializer.save(user=self.request.user)

class CourseEnrollmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CourseEnrollmentSerializer
    permission_classes = [IsOwnerOrAdmin]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return CourseEnrollment.objects.all()
        elif user.role == 'staff':
            return CourseEnrollment.objects.filter(schedule__course__instructor=user)
        else:
            return CourseEnrollment.objects.filter(user=user)
    
    def perform_update(self, serializer):
        old_status = self.get_object().status
        new_status = serializer.validated_data.get('status', old_status)
        
        if old_status == 'enrolled' and new_status == 'cancelled':
            schedule = self.get_object().schedule
            schedule.current_capacity -= 1
            schedule.save()
        
        serializer.save()
    
    def perform_destroy(self, instance):
        if instance.status == 'enrolled':
            schedule = instance.schedule
            schedule.current_capacity -= 1
            schedule.save()
        
        instance.delete() 