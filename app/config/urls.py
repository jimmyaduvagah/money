"""mobile_money URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework.authtoken import views as auth_views
from rest_framework_simplejwt import views as jwt_views

from upload.views import image_upload
from users.views import UserViewSet, UserRegisterViewSet, LoginViewSet, ObtainTokenPairWithUser



router = routers.SimpleRouter()

router.register(r'users', UserViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/token/obtain/', ObtainTokenPairWithUser.as_view(), name='token_create'),
    path('api/v1/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api-token-auth/', auth_views.obtain_auth_token),
    path("", image_upload, name="upload"),
    path('admin/', admin.site.urls),
]

if bool(settings.DEBUG):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
    
# curl -d '{"password":"asante34", "email":"jimmy.@gmail.com"}'     -H 'Content-Type:application/json' -X POST http://127.0.0.1:8000/api/v1/token/obtain/
