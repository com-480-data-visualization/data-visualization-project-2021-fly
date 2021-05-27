// dimensions and margins of graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1350  - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#danceability")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data/billboard_features_top_100.csv", 

  // Preprocessing
  function (data) {
    return {
      year : d3.timeParse("%Y")(data.year),
      danceability: data.danceability} 
    },

  //Processing
  function (data) {

    // Add a title to the graph
    svg.append("text")
        .attr("y", 0 - margin.top)
        .attr("x",(width / 2))
        .attr("dy", "1em")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .style("text-anchor", "middle")
        .text("Danceability");


    // Create X Axis using a time scale
    var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.year; }))
            .range([ 0, width - 150])

    // Append the X axis to the bottom of the svg object
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("class", "axis");

    // Create Y Axis (its domain is (0..1))
    var y = d3.scaleLinear()
            .domain([0.5, 1])
            .range([ height, 0 ]);
    // Append the Y axis to the left of the svg object
    svg.append("g")
           .call(d3.axisLeft(y))
           .attr("class", "axis");
    // Add labels for the Y Axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em") 
        .attr("font-size", "18px")
        .style("text-anchor", "middle")
        .text("Values of the audio features");


    // Adding the actual data (one line per feature)
    var features = ['danceability']

    // Add the line
    // define the line
    var colorRange = ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641']
    var color = d3.scaleLinear().range(colorRange).domain([1, 2, 3, 4, 5]);

    // Define the gradient
    var linearGradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "linear-gradient")
            .attr("gradientTransform", "rotate(90)");

        linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", color(1));

        linearGradient.append("stop")
            .attr("offset", "25%")
            .attr("stop-color", color(2));

        linearGradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", color(3));

        linearGradient.append("stop")
            .attr("offset", "75%")
            .attr("stop-color", color(4));

        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", color(5));



    var valueline = d3.line()
      // Smoothing the curve
      .curve(d3.curveBasis)
      // Specifying the data
      .x(function(d) {return x(d.year); })
      .y(function(d) {return y(d[features[i]]); });
    // Append the path
    for(var i = 0; i < features.length; i++){
      path = svg.append("path")
         .datum(data)
         .attr("fill", "none")
         .attr("stroke", "url(#linear-gradient)")
         .attr("class", "line")
         .attr("stroke-width", 4)
         .attr("d",valueline)

      // Smooth display animation of lines
      var totalLength = path.node().getTotalLength();
      path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(2000)
        .ease(d3.easeSin)
        .attr("stroke-dashoffset", 0);


      var div = d3.select("body").append("div")   
      .attr("class", "tooltip")               
      .style("opacity", 0);


      mainEvents = [{"Year": 1974, "Event": "The Age of Disco: Records start using drum machines (Rock Your Baby - George McCrae)", danceability: 0.594},
                    {"Year": 1982, "Event": "Arrival of Electro on the Dancefloors: Planet Rock - Afrika Bambaataa", danceability: 0.915},
                    {"Year": 1985, "Event": "On and On - Jessie Saunders: First House Record", danceability: 0.81},
                    {"Year": 1986, "Event": "You Be Illin' - Run D.M.C: The rise of danceable hip hop", danceability: 0.962},
                    {"Year": 1989, "Event": "Funky Cold Medina - Tone-Loc: The most danceable on the billboard", danceability: 0.988},
                    {"Year": 1996, "Event": "Emergence and Spreading of Trance music", danceability: 0.604},
                    {"Year": 1997, "Event": "Around the World - Daft Punk: French House goes international", danceability: 0.956},
                    {"Year": 1998, "Event": "Blue (Da Ba Dee) - Eiffel 65: International success", danceability: 0.956},
                    {"Year": 2001, "Event": "Sandstorm - Darude: an Iconic EDM Song", danceability: 0.956},
                    {"Year": 2006, "Event": "Temperature - Sean Paul: Dance pop still at the top of the chart)", danceability: 0.951},
                    {"Year": 2010, "Event": "Alive! - Mondotek: The rise of Tecktonik dance", danceability: 0.74},
                    {"Year": 2013, "Event": "Harlem Shake - Baauer: Dance & Electro songs develop into memes (n°1 for 5 consecutive weeks)", danceability: 0.951},
                    {"Year": 2014, "Event": "Summer - Calvin Harris: The Scottish DJ-producer is all over the Billboard", danceability: 0.74},
                    {"Year": 2018, "Event": "Look Alive -  BlocBoy JB ft. Drake: Hip hop and rap still is as danceable, with artists like Drake", danceability: 0.922},
                    {"Year": 2020, "Event": "Billie Eilish - Therefore I am: The Age of Billie Eilish & Dark Pop", danceability: 0.74},]

      svg.selectAll("dot")    
          .data(mainEvents)         
      .enter().append("circle")                               
      .attr("r", 10)       
      .attr("cx", function(d) {
        return x(new Date(d.Year+"-01-01T00:00"))})       
      .attr("cy", function(d) {
         return y(d.danceability)})      
      .attr("stroke", "white")  
      .attr("fill", "black")    
      .on("mouseover", function(d) {      
          div.transition()        
              .duration(100)      
              .style("opacity", .9);      
          div .html(d.Year+ "<br/>"  + d.Event)  
              .style("left", (d3.event.pageX) + "px")     
              .style("top", (d3.event.pageY - 28) + "px");    
          })                  
      .on("mouseout", function(d) {       
          div.transition()        
              .duration(500)      
              .style("opacity", 0);   
      });

      }
  },

  )