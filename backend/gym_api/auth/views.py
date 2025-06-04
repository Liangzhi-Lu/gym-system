from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from gym_api.users.serializers import UserSerializer
from .permissions import IsAdmin
import logging

logger = logging.getLogger(__name__)
User = get_user_model()

class RegisterView(APIView):
    """
    User registration view
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        try:
            # Log the incoming request data
            logger.info(f"Registration attempt with data: {request.data}")
            
            # Create a copy of the data to modify
            data = request.data.copy()
            
            # Set default role if not provided
            if 'role' not in data:
                data['role'] = 'user'
            
            # Validate the data
            serializer = UserSerializer(data=data)
            if not serializer.is_valid():
                logger.error(f"Registration validation failed: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # Create the user
            user = serializer.save()
            
            # Create JWT tokens
            refresh = RefreshToken.for_user(user)
            
            logger.info(f"User registered successfully: {user.username}")
            
            return Response({
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            logger.error(f"Registration error: {str(e)}", exc_info=True)
            return Response({
                'error': 'Registration failed',
                'detail': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        
        if not user:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
        
        refresh = RefreshToken.for_user(user)
        
        serializer = UserSerializer(user)
        
        return Response({
            'user': serializer.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Logout successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AdminUserCreateView(APIView):
    permission_classes = [IsAdmin]
    
    def post(self, request):
        data = request.data.copy()
        
        if 'password' not in data:
            return Response({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(data['password'])
            
            if 'role' in data:
                user.role = data['role']
            else:
                user.role = 'member'
                
            user.save()
            
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminUserUpdateView(APIView):
    permission_classes = [IsAdmin]
    
    def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            
        data = request.data.copy()
        
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            if 'password' in data and data['password']:
                user.set_password(data['password'])
                
            serializer.save()
            
            if 'role' in data:
                user.role = data['role']
                user.save()
                
            return Response(UserSerializer(user).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 