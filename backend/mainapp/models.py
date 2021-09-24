from django.db import models
from authapp.models import TodoUser


class Project(models.Model):
    name = models.CharField(max_length=32)
    http_link = models.URLField(max_length=200, blank=True)
    users = models.ManyToManyField(TodoUser)

    def __str__(self):
        return self.name


class Todo(models.Model):
    name = models.TextField()
    user = models.ForeignKey(TodoUser, models.PROTECT)
    project = models.ForeignKey(Project, models.PROTECT)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
