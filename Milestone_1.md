

## Datasets

***Dataset 1**:  [Hot Stuff](https://data.world/kcmillersean/billboard-hot-100-1958-2017/workspace/file?filename=Hot+Stuff.csv)*

The dataset records more than 300’000 of weekly top 100 songs, according to the ranking of the Billboard magazine, between 1953 and 2021. Each row includes the following information:

-   url: string, the URL to the top 100 Billboard Chart of the corresponding week
    
-   weekiD: a date of the format yyyy-mm-dd, identifying the week when the song was among the top 100
    
-   week_position: integer, rank of the song on the given week’s chart
    
-   song: string, the title of the song
    
-   performer: string, the name of the performing artist or group
    
-   songid: string, concatenation of song name and performer name
    
-   instance: integer, number of times a songID has appeared on chart after dropping of the chart for at least one week
    
-   previous_week_position: integer, rank of the song on the previous week’s chart
    
-   peak_position: integer, highest position of the songID during the given week (not overall highest)
    
-   weeks_on_chart: number of weeks on the chart for a songID for the given week (not the overall running count of weeks)
    

  
  

***Dataset 2**: [Hot 100 Audio Features](https://data.world/kcmillersean/billboard-hot-100-1958-2017/workspace/file?filename=Hot+100+Audio+Features.xlsx)*

These are the values for each track pulled from the Spotify Web API:

-   songid: (same as above)
    
-   performer: (same as above)
    
-   song: (same as above)
    
-   spotify_genre: string
    
-   spotify_track_id: string
    
-   spotify_track_preview_url: string
    
-   spotify_track_album: string
    
-   spotify_track_explicit: boolean, explicit content
    
-   spotify_track_duration_ms: integer
    
-   spotify_track_popularity: integer between 0 and 100, with 100 being the most popular,
    
-   danceability: float in [0,1]
    
-   energy: float in [0,1]
    
-   key: integer
    
-   loudness: float,
    
-   mode: boolean, 1= major chord, 0= minor chord
    
-   speechiness: float in [0,1], proportion of lyrics
    
-   acousticness: float in [0,1], proportion of acoustic music
    
-   instrumentalness: float in [0,1], proportion of instrumental
    
-   liveness: float in [0,1], level of musical animation
    
-   valence: float in [0,1], measure of musical positiveness (0:sad, 1:happy)
    
-   tempo: float
    
-   time_signature: integer
    

  
  

***Dataset 3**:* We will be using [Genius](https://genius.com/) as a source for our lyrics.

  

## Problematic

We are interested in exploring the evolution of music by analysing the most popular songs since the 50’s: Are louder and/or more rhythmic hits more preferred nowadays ? Did old music contain rather more lyrics, was it more instrumental? Does the general public favour shorter songs now ?

To answer those questions, we intend to explore the lyrics of the top songs in depth using NLP and visualize the most recurring themes by genre or by decade. We also are interested in making comparisons between genres based on the musical components (tempo, loudness, liveness…) and show how each genre could evolve over time: is the pop of the 70’s the same as today’s ?

  

One of our sub-goals would be to visualize the song, artist and genre that would be the best representatives of each year/era.

  

Our work is designed for anyone who listened at least once to music. We would like to give the viewers an overview of how people's musical tastes could change over time and let them play with interactive visuals to make comparisons, to customize plots and get different perspectives about the subject. Ideally, we will use our time data to generate linked plots where one could zoom and filter to get a better feel of the data.

  
  

## Related work

**Related work that inspired us:**

-   [A Music Taste Analysis Using Spotify API and Python](https://towardsdatascience.com/a-music-taste-analysis-using-spotify-api-and-python-e52d186db5fc)
    
-   [Step by Step to Visualize Music Genres with Spotify API](https://towardsdatascience.com/step-by-step-to-visualize-music-genres-with-spotify-api-ce6c273fb827)
    
-   [Billboard analysis](https://towardsdatascience.com/billboard-hot-100-analytics-using-data-to-understand-the-shift-in-popular-music-in-the-last-60-ac3919d39b49)
    
-   [Million song project](https://cgallay.github.io/Ada/)
    

The **originality** of our work lies in the fact that it really seeks to show an overview of all 'popular' music through time, without focusing on a single singer or a specific music genre.

A nice [visualization](https://old.reddit.com/r/dataisbeautiful/comments/maqs96/oc_spotify_data_shows_that_you_can_dance_to_any/) that inspired us: ![](https://lh5.googleusercontent.com/DsdofsS_gKiBtDUddz_-B1bslAJ89CRTpFnzoBCxgjch5fjAzL4cUrNlCR81seRDdB6GxBtqvZHzH9sNeFEYMEv_QdLvTYkS-jJfsbUQvLjTVqKF-RFIRE4knQbPiaY3tg5QeWvv)
