from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, SpotifyProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class SpotifyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyProfile
        fields = ["spotify_id", "display_name", "email", "access_token", "refresh_token"]