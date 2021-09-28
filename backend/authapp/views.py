from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets
from .models import TodoUser
from .serializers import TodoUserSerializer


class TodoUserViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      viewsets.GenericViewSet,):
    queryset = TodoUser.objects.all().order_by('-pk')
    serializer_class = TodoUserSerializer
