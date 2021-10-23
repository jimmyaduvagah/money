"""User manager module."""

import uuid
from django.contrib.auth.models import BaseUserManager
from django.utils import timezone


class UserManager(BaseUserManager):
    """Django requires that custom users define their own Manager class."""

    def create_user(self, email, password=None, username=None, **extra_fields):
        """Create and return a `User`."""
        if email is None:
            raise TypeError('Users must have an email address.')

        if username is None:
            username = email

        first_name = extra_fields.pop('first_name', False)
        last_name = extra_fields.pop('last_name', False)

        user = self.model(username=username, email=self.normalize_email(email),
                          first_name=first_name, last_name=last_name)
        user.set_password(password)
        if user.guid is None:
            user.guid = uuid.uuid4()
        if user.created_on is None:
            user.created_on = timezone.now
        user.save()
        return user

    def create_superuser(self, username, email, password):
        """Create and return a `Super User`."""
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
