from rest_framework import generics, status, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse, Http404
from django.conf import settings
import os

from .models import UploadedImage
from .serializers import UploadedImageSerializer
from gym_api.auth.permissions import IsStaffOrAdmin

class ImageUploadView(generics.CreateAPIView):
    serializer_class = UploadedImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save()

class ImageListView(generics.ListAPIView):
    serializer_class = UploadedImageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = UploadedImage.objects.filter(is_active=True)
        
        business_type = self.request.query_params.get('business_type')
        business_id = self.request.query_params.get('business_id')
        
        if business_type:
            queryset = queryset.filter(business_type=business_type)
        
        if business_id:
            queryset = queryset.filter(business_id=business_id)
        
        return queryset

class GetImageByBusinessView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, business_type, business_id, format=None):
        try:
            image = UploadedImage.objects.filter(
                business_type=business_type,
                business_id=business_id,
                is_active=True
            ).first()
            
            if not image:
                return Response({"detail": "No matching image found"}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = UploadedImageSerializer(image, context={"request": request})
            return Response(serializer.data)
            
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UploadedImage.objects.all()
    serializer_class = UploadedImageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ImagePreviewView(APIView):
    permission_classes = [permissions.AllowAny]  
    
    def get(self, request, pk, format=None):
        try:
            image = UploadedImage.objects.get(pk=pk, is_active=True)
        except UploadedImage.DoesNotExist:
            raise Http404("Image not found")
        
        file_path = os.path.join(settings.MEDIA_ROOT, image.image.name)
        
        if not os.path.exists(file_path):
            raise Http404("Image file not found")
        
        content_type = self._get_content_type(file_path)
        
        with open(file_path, 'rb') as f:
            return HttpResponse(f.read(), content_type=content_type)
    
    def _get_content_type(self, file_path):
        extension = os.path.splitext(file_path)[1].lower()
        
        content_types = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.bmp': 'image/bmp',
            '.webp': 'image/webp',
        }
        
        return content_types.get(extension, 'application/octet-stream')

class AdminImageListView(generics.ListAPIView):
    """
    GET /api/admin/uploads/images/
    """
    serializer_class = UploadedImageSerializer
    permission_classes = [IsStaffOrAdmin]
    
    def get_queryset(self):
        queryset = UploadedImage.objects.all()
        
        business_type = self.request.query_params.get('business_type')
        business_id = self.request.query_params.get('business_id')
        is_active = self.request.query_params.get('is_active')
        
        if business_type:
            queryset = queryset.filter(business_type=business_type)
        
        if business_id:
            queryset = queryset.filter(business_id=business_id)
        
        if is_active is not None:
            is_active_bool = is_active.lower() == 'true'
            queryset = queryset.filter(is_active=is_active_bool)
        
        return queryset

class AdminImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UploadedImage.objects.all()
    serializer_class = UploadedImageSerializer
    permission_classes = [IsStaffOrAdmin]
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if instance.image and os.path.exists(instance.image.path):
            os.remove(instance.image.path)
            
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT) 