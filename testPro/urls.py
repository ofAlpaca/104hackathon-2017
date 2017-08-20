from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^show_data', views.show_data, name='show_data'),
    url(r'', views.save_file, name='save_file'),
    ]
