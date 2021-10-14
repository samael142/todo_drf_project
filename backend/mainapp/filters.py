from .models import Todo, Project
from django_filters import rest_framework as filters
from django_filters.widgets import RangeWidget


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TodoFilter(filters.FilterSet):
    created_range = filters.DateFromToRangeFilter(field_name='created',
                                                  widget=RangeWidget(attrs={'placeholder': 'YYYY-MM-DD'}))

    class Meta:
        model = Todo
        fields = ['project']
