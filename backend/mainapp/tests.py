from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from authapp.models import TodoUser
from authapp.views import TodoUserViewSet
from .models import Project


class TestUserViewset(TestCase):

    def setUp(self):
        self.admin = TodoUser.objects.create_superuser('admin', 'admin@mail.ru', '12345678Qwe')

    def test_get_users_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        force_authenticate(request, self.admin)
        view = TodoUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_detail(self):
        user = mixer.blend(TodoUser)
        client = APIClient()
        client.login(username='admin', password='12345678Qwe')
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectViewset(APITestCase):

    def setUp(self):
        TodoUser.objects.create_superuser('admin', 'admin@mail.ru', '12345678Qwe')
        self.client.login(username='admin', password='12345678Qwe')

    def test_edit_project(self):
        user1 = mixer.blend(TodoUser)
        user2 = mixer.blend(TodoUser)
        user3 = mixer.blend(TodoUser)
        project = mixer.blend(Project, users=[user1, user2])
        response = self.client.put(f'/api/projects/{project.id}/', {'name': 'dfdjjndjgd',
                                                                    'http_link': '',
                                                                    'users': user3.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'dfdjjndjgd')
