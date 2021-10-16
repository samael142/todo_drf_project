from rest_framework import serializers
from .models import TodoUser


class TodoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoUser
        fields = ('username', 'first_name', 'last_name', 'email')


class TodoUserSerializerV2(serializers.ModelSerializer):
    class Meta:
        model = TodoUser
        fields = ('username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')
