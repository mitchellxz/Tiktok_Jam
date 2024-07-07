const sliderData = [
  {
    id: 1,
    sliderName: "acousticness",
    min: 0,
    max: 1,
    description:
      "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.",
  },
  {
    id: 2,
    sliderName: "danceability",
    min: 0,
    max: 1,
    description:
      "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.",
  },
  {
    id: 3,
    sliderName: "energy",
    min: 0,
    max: 1,
    description:
      "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.",
  },
  {
    id: 4,
    sliderName: "instrumentalness",
    min: 0,
    max: 1,
    description:
      "Predicts whether a track contains no vocals. 'Ooh' and 'aah' sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly 'vocal'. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.",
  },
  {
    id: 5,
    sliderName: "liveness",
    min: 0,
    max: 1,
    description:
      "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.",
  },
  {
    id: 6,
    sliderName: "loudness",
    min: -60,
    max: 0,
    description:
      "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.",
  },
  {
    id: 7,
    sliderName: "speechiness",
    min: 0,
    max: 1,
    description:
      "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.",
  },
  {
    id: 8,
    sliderName: "valence",
    min: 0,
    max: 1,
    description:
      "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).",
  },
  {
    id: 9,
    sliderName: "tempo",
    min: 0,
    max: 200,
    description:
      "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.",
  },
  {
    id: 10,
    sliderName: "key",
    min: 0,
    max: 11,
    description:
      "The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.",
  },
];

export default sliderData;
