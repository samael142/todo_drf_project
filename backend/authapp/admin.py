from django.contrib import admin
from authapp.models import TodoUser
from mainapp.models import Todo, Project

# Register your models here.
admin.site.register(TodoUser)
admin.site.register(Project)
admin.site.register(Todo)
