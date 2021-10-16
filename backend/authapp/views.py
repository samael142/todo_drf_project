from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets
from .models import TodoUser
from .serializers import TodoUserSerializer, TodoUserSerializerV2


class TodoUserViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      viewsets.GenericViewSet, ):
    queryset = TodoUser.objects.all().order_by('-pk')
    filterset_fields = ['username']

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return TodoUserSerializerV2
        return TodoUserSerializer
