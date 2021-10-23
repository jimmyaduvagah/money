# """Users app serializer module."""

# from django.contrib.auth import authenticate
# from rest_framework import serializers
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# from users.models import User
# from wallet.models import Wallet


# class UserSerializer(serializers.ModelSerializer):
#     """Users serializer class."""

#     class Meta:
#         """Users serializer meta class."""

#         model = User
#         fields = ['email', 'username', 'phone_number', 'first_name',
#                   'last_name', 'gender', 'guid']


# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     """Custom serializer class for JWT token."""

#     @classmethod
#     def get_token(cls, user):
#         """Get token class method."""
#         token = super(MyTokenObtainPairSerializer, cls).get_token(user)

#         return token

#     def validate(self, attrs):
#         """Validate method."""
#         data = super().validate(attrs)

#         data['email'] = self.user.email
#         data['first_name'] = self.user.first_name
#         data['last_name'] = self.user.last_name

#         return data


# class RegistrationSerializer(serializers.ModelSerializer):
#     """User Registration rerializer creates a new user."""

#     password = serializers.CharField(max_length=128, min_length=8,
#                                      write_only=True)

#     class Meta:
#         """User Registration rerializer meta class."""

#         model = User
#         fields = ['email', 'password', 'first_name', 'last_name', ]

#     def create(self, validated_data):
#         """User Registration create method."""
#         # Use the `create_user` method to create a new user.
#         user = User.objects.create_user(**validated_data)
#         wallet = Wallet(owner=user)
#         wallet.save()
#         return user


# class LoginSerializer(serializers.Serializer):
#     """Users login serializer class."""

#     email = serializers.CharField(max_length=255)
#     username = serializers.CharField(max_length=255, required=False)
#     password = serializers.CharField(max_length=128, write_only=True)
#     token = serializers.CharField(max_length=255, read_only=True)

#     def validate(self, data):
#         """Validate serializer function."""
#         email = data.get('email', None)
#         password = data.get('password', None)

#         # Raise an exception if an email is not provided.
#         if email is None:
#             raise serializers.ValidationError(
#                 'An email address is required to log in.')
#         # Raise an exception if a password is not provided.
#         if password is None:
#             raise serializers.ValidationError(
#                 'A password is required to log in.')

#         user = authenticate(username=email, password=password)
#         if user is None:
#             raise serializers.ValidationError(
#                 'A user with this email and password was not found.'
#             )

#         if not user.is_active:
#             raise serializers.ValidationError(
#                 'This user has been deactivated.'
#             )

#         return {
#             'email': user.email,
#             'username': user.username,
#             'token': user.token
#         }
