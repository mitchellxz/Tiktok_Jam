from django.db import models

class Song(models.Model):
    id = models.AutoField(primary_key=True)
    artist_name = models.CharField(max_length=100)
    song_name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.artist_name} - {self.song_name}'