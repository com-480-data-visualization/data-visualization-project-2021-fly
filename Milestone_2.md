
To execute the website locally, you need to pull our project and run the following commands in your terminal :

	$ cd website 
	$ python3 -m http.server #add the port number you that you want to use

# 
For our datastory on the evolution of music, we will have several parts, each with visual elements that we integrate:

### Introduction:  
This part will allow us to describe our goal and introduce the different parts of our visualization. This part will also include a spotify playlist representing the greatest hits of each year since 1958. Below is a sketch of this part. This part is already available on our website. It will include mainly text and an integration of the spotify greatest hits playlist as an interactive element. For these visualizations we only use HTML and CSS so we mainly use the first lectures of the course.

![](https://lh3.googleusercontent.com/X0sf5-rmjTl48hPYi0JVeRyQfpx8PzGp8BBo9x10xxGYjGbXXrtPd3De8utQKgJAonYuFgRVn_KErryr78b0MqCAVaGD8Te8TmgBl7BorhwMropYPkf3SLnPd_-wVwXBNKVzcdZq)
    
### Evolution of pop and rock through decades:  
For this part of our data story, we try to study the evolution of the dominant musical genres for the last 60 years that are pop and rock. This part is mainly based on a [Cleveland dot plot](https://www.d3-graph-gallery.com/graph/lollipop_cleveland.html) made with d3.js. The plot will be dynamic, with the possibility to choose the genre we want to explore (pop or rock) and the decades of references we want to choose. Below is a first version of this part with the visualization, it is also available on our website. For this part we use HTML, CSS as well as JS and D3.JS. We also made sure to respect the different rules and advices we had during the "Do and don't viz" lectures and the lecture on visualizations related to music. 

![](https://lh4.googleusercontent.com/M_OZRljtcCYbveUHO4Wj-ewHqzRrjPLNxK0IkP82lrVclUil4fgyqovFCV_arWsjgnmsyQ-ogk0AV_nT8hQaodPSJ9jE4tkyX8pNda9u4ZsXsn01hhAOns_zdX4Qk0V1QqDgEHE7)

### Audio features, and what their history tells us about music  
From the audio features data, we gathered several characteristics like speechiness, valence, and instrumentalness. The idea is to plot each of these features and see how the changes in people’s taste and how the music industry in general affected it. For example, in the plot below, we choose to plot speechiness and show how its changes correlate with rap music. The plots is interactive by displaying the main events with the mouse. For this part we use tools of binding data (data-join) and D3 events & interactions, and mainly refer to the lectures D3.js and Interactions & More Interactive D3.js. 

![](https://lh6.googleusercontent.com/5ZFs0ArO9hxaHKbHPNfs575kENeyKlxuYPF4V--BpfP1oPzIt3A-brjoCW7ZtpnSTX1lzRXqDAPGr89z27mFbFAWoqpWGcWQwJzQEWeqRi6xPKiuTH8hCOI6FLniXPpspPPcQeXO)
    
### Key achievements and milestones in the Billboard Hot 100 chart  
Ideally, we would like to find the most influential artists and/or songs. We display each key achievement through a number, whether it is the number of times it appeared in the billboard or the number of consecutive weeks it stayed on it. For more intuitiveness, we would like to map the number to the length of its corresponding spiral. This section can be further improved by embedding a spotify ‘Play’ button next to the corresponding songs.
    

![](https://lh5.googleusercontent.com/ongRjLB1msX_6HwNYxbVZ5BtpCgHgIwdR44FPrDwAhz1QMb5LOHCYJrnHc6LypOTtwQZ1WroLUIK48nZpwxIt3xCHOWK19zP5mrGOZP4avjcpOVcZBl0OMIEw4qCSYK9adWtK8oD)
### NLP
For the final part we want to study the evolution of the lyrics through the decades. This will be shown using 2 visualizations.
    
 **1. Circular bar chart for sentiment analysis:**
 
![](https://lh3.googleusercontent.com/Hb3AT2fzR7W_BTjLTyTUo9eHaDQRzL7B7yb18BwQeMzfeYzxTzmo6WtNS1T8o0NIr6Ph5YuOrt7OFdlgmh01181XfZ7Gt3pWyoxYYMkUY_jf4SPTBTCbM4EFjwKBDo8UEEHstK2o)

The x-axis represents the decades (from 1950 to 2020), and the y-axis shows the percentage of each sentiment in the corpus of lyrics of the corresponding decade.

The visualization can further be improved by adding to it an animation (in spiral) on first appearance, or an interaction: zoom in when hovering over a bar (a decade) to put it in evidence.

*(The data used in the above visualization is hard coded)*
 

**2.  Word cloud per decade:**
   
We form a cloud of the most frequent words of each decade to show how the language evolves over time.

![](https://lh3.googleusercontent.com/4hsp4-ehmFNSnoc6Gd1JMKPkYGmrELaHcA0ht4PeMbM4QzRMpiCfjDDs0P_lZ93s3A-G1Z12E5Mpe8tQKGZAG7tW09iHhh-F5KLbmf7ju8ZHM_CuEF6bb1wGdcY1-AfG7-YBIaKP)
We make the same visualization for each decade and the user can go from one to the other using horizontal scrolling on the website.

This visualization can further be improved by adding interaction when hovering over, or by clustering words by topic and use a different color per cluster.

*(The above visualization is made using song lyrics of the 2000’s).*

For the above two visualization we will be using D3 for text visualization and refer to Lecture: Text viz.

## Extra ideas that will enhance the visualization

-   Use Fullpage.js and integrate [horizontal scrolling](https://alvarotrigo.com/fullPage/extensions/scroll-horizontally.html).    
-   Use more consistent colors.    
