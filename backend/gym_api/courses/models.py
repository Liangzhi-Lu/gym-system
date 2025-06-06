from django.db import models
from django.utils.translation import gettext_lazy as _
from gym_api.users.models import User

class CourseCategory(models.Model):
    name = models.CharField(_('Category Name'), max_length=50)
    description = models.TextField(_('Category Description'), blank=True, null=True)
    
    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('Course Category')
        verbose_name_plural = _('Course Categories')
        db_table = 'gym_course_category'
        
    def __str__(self):
        return self.name

class Course(models.Model):
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    name = models.CharField(_('Course'), max_length=100)
    description = models.TextField(_('Course Description'))
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE, related_name='courses',
                              verbose_name=_('Course Category'))
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='taught_courses',
                                verbose_name=_('Instructor'), limit_choices_to={'role': 'staff'})
    image = models.CharField(_('URL'), max_length=500, null=True, blank=True)
    price = models.DecimalField(_('Price'), max_digits=10, decimal_places=2)
    duration = models.IntegerField(_('Duration (minutes)'))
    capacity = models.IntegerField(_('Capacity'), help_text=_('Maximum number of participants'))
    difficulty = models.CharField(_('Difficulty Level'), max_length=15, choices=DIFFICULTY_CHOICES, default='beginner')
    is_active = models.BooleanField(_('Is Active'), default=True)
    
    # 元数据
    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('Course')
        verbose_name_plural = _('Courses')
        db_table = 'gym_course'
        
    def __str__(self):
        return self.name

class CourseSchedule(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='schedules',
                            verbose_name=_('Course'))
    start_time = models.DateTimeField(_('Start Time'))
    end_time = models.DateTimeField(_('End Time'))
    location = models.CharField(_('Location'), max_length=100)
    current_capacity = models.IntegerField(_('Current Capacity'), default=0)
    
    # 元数据
    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('Course Schedule')
        verbose_name_plural = _('Course Schedules')
        db_table = 'gym_course_schedule'
        
    def __str__(self):
        return f"{self.course.name} - {self.start_time.strftime('%Y-%m-%d %H:%M')}"

class CourseEnrollment(models.Model):
    STATUS_CHOICES = [
        ('enrolled', 'Enrolled'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments',
                          verbose_name=_('用户'))
    schedule = models.ForeignKey(CourseSchedule, on_delete=models.CASCADE, related_name='enrollments',
                              verbose_name=_('课程安排'))
    status = models.CharField(_('状态'), max_length=15, choices=STATUS_CHOICES, default='enrolled')
    attendance = models.BooleanField(_('是否出席'), null=True, blank=True)
    feedback = models.TextField(_('反馈'), null=True, blank=True)
    rating = models.IntegerField(_('评分'), null=True, blank=True, choices=[(i, i) for i in range(1, 6)])
    
    created_at = models.DateTimeField(_('创建时间'), auto_now_add=True)
    updated_at = models.DateTimeField(_('更新时间'), auto_now=True)
    
    class Meta:
        verbose_name = _('Course Enrollment')
        verbose_name_plural = _('Course Enrollments')
        db_table = 'gym_course_enrollment'
        unique_together = ('user', 'schedule')  
        
    def __str__(self):
        return f"{self.user.username} - {self.schedule.course.name}" 