from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.views import APIView
import os
from rest_framework.response import Response
import requests

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class SpotifyCallbackView(APIView):
    permission_classes = [AllowAny]
    REDIRECT_URI = os.getenv('SPOTIFY_REDIRECT_URI')

    def post(self, request):
        code = request.data.get('code')
        if not code:
            return Response({"error": "Code not provided"}, status=400)
        
        
        # Exchange code for access token
        token_url = "https://accounts.spotify.com/api/token"
        response = requests.post(token_url, {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': os.getenv('SPOTIFY_REDIRECT_URI'),
            'client_id': os.getenv('SPOTIFY_CLIENT_KEY'),
            'client_secret': os.getenv('SPOTIFY_CLIENT_SECRET'),
        })
        
        if response.status_code != 200:
            return Response(response.json(), status=response.status_code)
        
        token_data = response.json()
        access_token = token_data['access_token']
        refresh_token = token_data.get('refresh_token')

        profile_url = "https://api.spotify.com/v1/me"
        profile_response = requests.get(profile_url, headers={
            'Authorization': f'Bearer {access_token}'
        })

        if profile_response.status_code != 200:
            return Response(profile_response.json(), status=profile_response.status_code)
        
        profile_data = profile_response.json()
        
        return Response({
            'token_data': token_data,
            'profile_data': profile_data
        })