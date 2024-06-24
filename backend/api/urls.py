from django.urls import path
from . import views

urlpatterns = [
    path('spotify/callback/', views.SpotifyCallbackView.as_view(), name='spotify-callback'),
]