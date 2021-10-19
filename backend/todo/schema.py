import graphene
from graphene_django import DjangoObjectType
from mainapp.models import Project, Todo
from authapp.models import TodoUser


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class TodoUserType(DjangoObjectType):
    class Meta:
        model = TodoUser
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(TodoUserType)
    all_todo = graphene.List(TodoType)


    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return TodoUser.objects.all()

    def resolve_all_todo(root, info):
        return Todo.objects.all()



schema = graphene.Schema(query=Query)
