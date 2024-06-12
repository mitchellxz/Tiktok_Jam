from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

from rest_framework.views import APIView
import os
from rest_framework.response import Response
import requests


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class GetTiktokToken(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        client_key = os.getenv('TIKTOK_CLIENT_KEY')
        client_secret = os.getenv('TIKTOK_CLIENT_SECRET')
        grant_type = request.data.get('grant_type')

        if grant_type == 'client_credentials':
            return self.get_client_credentials_token(client_key, client_secret)
        elif grant_type == 'authorization_code':
            code = request.data.get('code')
            redirect_uri = request.data.get('redirect_uri')
            code_verifier = request.data.get('code_verifier')
            return self.get_authorization_code_token(client_key, client_secret, code, redirect_uri, code_verifier)
        else:
            return Response({'error': 'Invalid grant_type'}, status=400)
        
    def get_client_credentials_token(self, client_key, client_secret):
        data = {
            'client_key': client_key,
            'client_secret': client_secret,
            'grant_type': 'client_credentials',
        }

        response = requests.post('https://open.tiktokapis.com/v2/oauth/token/', data=data)
        return Response(response.json())
    
    def get_authorization_code_token(self, client_key, client_secret, code, redirect_uri, code_verifier):
        data = {
            'client_key': client_key,
            'client_secret': client_secret,
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': redirect_uri,
            'code_verifier': code_verifier,
        }

        response = requests.post('https://open.tiktokapis.com/v2/oauth/token/', data=data)
        return Response(response.json())