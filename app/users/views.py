# """Views module."""

# from rest_framework import status
# from rest_framework import viewsets
# from rest_framework.exceptions import (PermissionDenied, NotAcceptable,
#                                        MethodNotAllowed, ValidationError)
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework.response import Response
# from mobile_wallet.users.serializer import (User, UserSerializer,
#                                             RegistrationSerializer, LoginSerializer)
# from rest_framework_simplejwt.views import TokenObtainPairView
# from .serializer import MyTokenObtainPairSerializer


# class ObtainTokenPairWithUser(TokenObtainPairView):
#     """Token view class."""

#     serializer_class = MyTokenObtainPairSerializer


# class UserViewSet(viewsets.ModelViewSet):
#     """A viewset for viewing and editing User instances."""

#     permission_classes = (IsAuthenticated,)
#     serializer_class = UserSerializer
#     queryset = User.objects.all()


# class UserRegisterViewSet(viewsets.ViewSet):
#     """A viewset for registering new app users."""

#     permission_classes = (AllowAny, )
#     serializer_class = RegistrationSerializer

#     def create(self, request):
#         """Actual method for creating new users."""
#         if request.method.lower() == 'post':
#             if request.user.is_anonymous:
#                 serializer = RegistrationSerializer(data=request.data)
#                 import pdb
#                 pdb.set_trace()
#                 if serializer.is_valid(raise_exception=True):
#                     if len(User.objects.filter(email=serializer.data['email'])):
#                         raise ValidationError({"email": "This email has been used already."})
#                     user = serializer.create(serializer.validated_data)
#                     user.first_name = serializer.data['first_name']
#                     user.last_name = serializer.data['last_name']
#                     user.is_active = True
#                     user.save()
#                     serializer = UserSerializer(user)

#                     return Response(serializer.data)
#                 else:
#                     raise NotAcceptable()
#             else:
#                 raise PermissionDenied('You are already registered.')
#         else:
#             raise MethodNotAllowed(request.method)


# class LoginViewSet(viewsets.ViewSet):
#     """A viewset for login."""

#     permission_classes = (AllowAny,)
#     serializer_class = LoginSerializer

#     def create(self, request):
#         """Actual method for users login."""
#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
