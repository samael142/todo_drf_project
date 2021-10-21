from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo
from .serializers import ProjectSerializer, TodoSerializer, ProjectWithUsers, TodoWithUsers
from .filters import ProjectFilter, TodoFilter


class ProjectPagination(PageNumberPagination):
    page_size = 10


class TodoPagination(PageNumberPagination):
    page_size = 20


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all().order_by('-pk')
    # serializer_class = ProjectSerializer
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectWithUsers
        return ProjectSerializer


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all().order_by('-created')
    # serializer_class = TodoSerializer
    pagination_class = TodoPagination
    filterset_class = TodoFilter
    # filterset_fields = ['project', 'created']

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(TodoSerializer(self.get_object()).data)

    def get_serializer_class(self):
        if self.action == 'list':
            return TodoWithUsers
        return TodoSerializer
