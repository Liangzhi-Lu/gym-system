@echo off
echo Cleaning and preparing directories...
if exist "backend\frontend_build" rmdir /s /q backend\frontend_build
mkdir backend\frontend_build

echo Building frontend application...
cd frontend
call npm run build
cd ..

echo Copying build files to backend...
xcopy /E /I /Y frontend\build\* backend\frontend_build\

echo Starting Django server...
cd backend
python manage.py runserver

echo Done! 