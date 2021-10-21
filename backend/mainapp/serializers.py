from rest_framework import serializers
from .models import Todo, Project
from authapp.models import TodoUser
from authapp.serializers import TodoUserSerializer


class ProjectSerializer(serializers.ModelSerializer):
    # users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoSerializer(serializers.ModelSerializer):
    # user = TodoUserSerializer()
    # project = ProjectSerializer()

    class Meta:
        model = Todo
        fields = '__all__'


class ProjectWithUsers(serializers.ModelSerializer):
    users = TodoUserSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoWithUsers(serializers.ModelSerializer):
    user = TodoUserSerializer()

    class Meta:
        model = Todo
        fields = '__all__'