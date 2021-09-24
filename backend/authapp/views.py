from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .models import TodoUser
from .serializers import TodoUserSerializer


class TodoUserViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserSerializer
