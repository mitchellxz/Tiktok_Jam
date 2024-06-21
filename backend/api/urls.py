from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>", views.NoteDelete.as_view(), name="delete-note"),
    path('spotify/callback/', views.SpotifyCallbackView.as_view(), name='spotify-callback'),
    path('spotify/user/', views.SpotifyProfileView.as_view(), name='spotify-user'),
]