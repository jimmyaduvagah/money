"""Module for app users models."""

import uuid
import jwt

from datetime import datetime, timedelta

from django.core.validators import validate_email
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin)
from django.db import models
from django.utils import timezone

from .user_manager import UserManager


GENDER_CHOICES = (
    ('MA', 'Male'),
    ('FM', 'Female')
)


class User(AbstractBaseUser, PermissionsMixin):
    """Our custom user class."""

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()

    guid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    phone_number = models.CharField(db_index=True, max_length=32, unique=True,
                                    null=True, blank=True)
    username = models.CharField(db_index=True, max_length=255, unique=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True, validators=[validate_email])
    gender = models.CharField(null=True, blank=True, choices=GENDER_CHOICES, max_length=2)
    # profile_image = models.ImageField(null=True, blank=True, upload_to='avatars/')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        'self', on_delete=models.PROTECT, related_name='user_created_by',
        null=True, blank=True)
    updated_by = models.ForeignKey(
        'self', on_delete=models.PROTECT, related_name='user_updated_by',
        null=True, blank=True)
    created_on = models.DateTimeField(db_index=True, default=timezone.now)
    updated_on = models.DateTimeField(db_index=True, default=timezone.now)

    def get_short_name(self):
        """Funtion to return users short name."""
        return self.short_name

    def get_full_name(self):
        """Funtion to return users full name."""
        return self.full_name

    @property
    def short_name(self):
        """Property to return users short name."""
        return self.first_name

    @property
    def full_name(self):
        """Property to return users full name."""
        if self.other_names:
            return " ".join(
                [self.first_name, self.other_names, self.last_name])
        return " ".join([self.first_name, self.last_name])

    def __str__(self):
        """Return a string representation of this `User`."""
        return self.email

    @property
    def token(self):
        """Allow to get a user's token by calling `user.token`."""
        return self._generate_jwt_token()

    def _generate_jwt_token(self):
        """Generate a JSON Web Token."""
        dt = datetime.now() + timedelta(days=1)
        token = jwt.encode({
            'id': self.pk, 'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token
