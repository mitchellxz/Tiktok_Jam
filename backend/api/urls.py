from django.urls import path
from . import views

urlpatterns = [
    path('spotify/callback/', views.SpotifyCallbackView.as_view(), name='spotify-callback'),
    path('tiktok/callback/', views.TikTokCallbackView.as_view(), name='tiktok-callback'),
    path('songs/', views.SongListView.as_view(), name='songs-list'),
]