from rest_framework import serializers
from .models import TodoUser


class TodoUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TodoUser
        fields = ('url', 'username', 'first_name', 'last_name', 'email')
