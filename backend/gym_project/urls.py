"""gym_project URL Configuration"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.http import HttpResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

admin.site.site_header = 'Gym System Admin'
admin.site.site_title = 'Gym System Admin Portal'
admin.site.index_title = 'Welcome to Gym System Admin Portal'

def check_path(request):
    return HttpResponse(f"Requested path: {request.path}")

api_urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('api/users/', include('gym_api.users.urls')),
    path('api/courses/', include('gym_api.courses.urls')),
    path('api/orders/', include('gym_api.orders.urls')),
    path('api/auth/', include('gym_api.auth.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('gym_api.urls')),
    path('check-path/', check_path),
]

urlpatterns = api_urlpatterns

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += [
    re_path(r'^admin/.*$', TemplateView.as_view(template_name='index.html')),
    re_path(r'^(?!api/|django-admin/|static/|media/|check-path/).*$', TemplateView.as_view(template_name='index.html')),
] 