from django.db import models
from django.utils.translation import gettext_lazy as _
import os
import uuid

def upload_image_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    from django.utils import timezone
    now = timezone.now()
    path = f"uploads/{instance.business_type}/{now.year}/{now.month:02d}/{filename}"
    return path

class UploadedImage(models.Model):
    BUSINESS_TYPE_CHOICES = (
        ('user', 'User avatar'),
        ('course', 'Course image'),
        ('news', 'News image'),
        ('banner', 'Banner image'),
        ('other', 'Other'),
    )
    
    image = models.ImageField(_('Image'), upload_to=upload_image_path)
    business_type = models.CharField(_('Business type'), max_length=20, choices=BUSINESS_TYPE_CHOICES, default='other')
    business_id = models.IntegerField(_('BusinessID'), null=True, blank=True, 
                                   help_text=_('Associated business object ID, such as user ID, course ID, etc.'))
    title = models.CharField(_('Title'), max_length=100, null=True, blank=True)
    description = models.TextField(_('Description'), null=True, blank=True)
    is_active = models.BooleanField(_('Active'), default=True)
    
    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('Uploaded image')
        verbose_name_plural = _('Uploaded images')
        db_table = 'gym_uploaded_image'
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.get_business_type_display()} - {self.title or self.id}"
    
    @property
    def filename(self):
        return os.path.basename(self.image.name)
    
    @property
    def file_url(self):
        return self.image.url if self.image else None 