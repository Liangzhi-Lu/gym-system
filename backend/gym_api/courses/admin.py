from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Course, CourseCategory, CourseSchedule, CourseEnrollment
@admin.register(CourseCategory)
class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'instructor', 'price', 'capacity', 'duration', 'is_active')
    list_filter = ('category', 'is_active', 'instructor')
    search_fields = ('name', 'description', 'instructor__username')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {'fields': ('name', 'description', 'category', 'instructor')}),
        (_('Course Info'), {'fields': ('image', 'price', 'capacity', 'duration', 'difficulty')}),
        (_('Status'), {'fields': ('is_active',)}),
        (_('Meta'), {'fields': ('created_at', 'updated_at')}),
    )

@admin.register(CourseSchedule)
class CourseScheduleAdmin(admin.ModelAdmin):
    list_display = ('course', 'start_time', 'end_time', 'location', 'current_capacity', 'capacity')
    list_filter = ('course', 'start_time', 'location')
    search_fields = ('course__name', 'location')
    readonly_fields = ('created_at', 'updated_at', 'current_capacity')
    
    def capacity(self, obj):
        return obj.course.capacity
    capacity.short_description = _('容量')

@admin.register(CourseEnrollment)
class CourseEnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'schedule', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'schedule__course__name')
    readonly_fields = ('created_at', 'updated_at')
    
    actions = ['approve_enrollments', 'reject_enrollments', 'mark_as_completed']
    
    def approve_enrollments(self, request, queryset):
        queryset.update(status='approved')
    approve_enrollments.short_description = _('Approve Enrollments')
    
    def reject_enrollments(self, request, queryset):
        queryset.update(status='rejected')
    reject_enrollments.short_description = _('Reject Enrollments')
    
    def mark_as_completed(self, request, queryset):
        queryset.update(status='completed')
    mark_as_completed.short_description = _('Mark as Completed') 