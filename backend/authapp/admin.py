from django.contrib import admin
from mainapp.models import Todo, Project
from django.contrib.auth.admin import UserAdmin
from authapp.models import TodoUser


class TodoAdmin(UserAdmin):
    pass


# Register your models here.
admin.site.register(Project)
admin.site.register(Todo)
admin.site.register(TodoUser, TodoAdmin)
