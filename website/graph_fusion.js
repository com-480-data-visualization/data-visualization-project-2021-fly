// dimensions and margins of graph
var margin = {top: 10, right: 10, bottom: 30, left: 100},
    // width = d3.select("#danceability_speechiness").node().getBoundingClientRect().width,
    width = 1200  - margin.left - margin.right,

    height = 800 - margin.top - margin.bottom;

transitionDuration = 2000;

var colors = ['#e3b128', '#88446c']

// append the svg object to the body of the page
var svg = d3.select("#danceability_speechiness")
   // Container class to make it responsive.
   .classed("svg-container", true) 
  .append("svg")
   // Responsive SVG needs these 2 attributes and no width and height attr.
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 1400 800")
   // Class to make it responsive.
   .classed("svg-content-responsive", true)
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


//Read the data
d3.csv("files/features/billboard_features_top_100.csv", 

  // Preprocessing
  function (data) {

    return {
      year : d3.timeParse("%Y")(data.year),
      danceability: data.danceability,
      speechiness: data.speechiness}
    },

  //Processing
  function (data) {

    // Add a title to the graph
    svg.append("text")
        .attr("y", 0 - margin.top)
        .attr("x",(width / 2))
        .attr("dy", "3em")
        .attr("font-weight", "bold")
        .attr("font-size", "16px")
        .attr("class", "title")
        .style("text-anchor", "middle")
        .text("Danceability & Speechiness through the years");


    // Create X Axis using a time scale
    var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.year; }))
            .range([ 0, width - 150])

    // Append the X axis to the bottom of the svg object
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("class", "axis");

    // Create Y Axis
    var y_danceability = d3.scaleLinear()
            .domain([0.5, 0.7])
            .range([ height, 0 ]);
    // Append the Y axis to the left of the svg object
    svg.append("g")
           .call(d3.axisLeft(y_danceability))
           .attr("class", "axis")
           .style("stroke", colors[0]);
    // Add labels for the Y Axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", - margin.left - 5)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em") 
        .attr("class", "axis")
        .style("fill", colors[0])
        .attr("font-size", "18px")
        .style("text-anchor", "middle")
        .text("Danceability");



    // Speechiness axis
    var y_speechiness = d3.scaleLinear()
            .domain([0.0, 0.2])
            .range([ height, 0 ]);
    // Append the Y axis to the left of the svg object
    svg.append("g")
          .attr("transform", "translate("+ (width - 150) +", 0)")
           .call(d3.axisRight(y_speechiness))
           .attr("class", "axis")
           .style("stroke", colors[1]);
    // Add labels for the Y Axis

    // var rotateTranslate = d3Transform().rotate(-45).translate(width - 150, 0);


    svg.append("text")
        // .attr("transform", "translate("+ (width - 150) +", 0)")
        .attr("transform", "translate("+ (width - 70) +", " + (height/2) + "),rotate(90)")
        // .attr("y",height/2)
        // .attr("x",width - 150)
        .attr("dy", "1em") 
        .attr("class", "axis")
        .style("fill", colors[1])
        .attr("font-size", "18px")
        .style("text-anchor", "middle")
        .text("Speechiness");


    // Adding the actual data (one line per feature)
    var features = ['danceability', 'speechiness']
    var scales = [y_danceability, y_speechiness]


    // Add the line


    var valueline = d3.line()
      // Smoothing the curve
      .curve(d3.curveBasis)
      .x(function(d) {return x(d.year); })
      .y(function(d) {return scales[i](d[features[i]]); });

    // Append the paths
    for(var i = 0; i < features.length; i++){
      line_path = svg.append("path")
         .data([data])
         .attr("fill", "none")
         // .attr("stroke", "url(#linear-gradient)")
         .attr("stroke", colors[i])
         .attr("class", "line")
         .attr("stroke-width", 4)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
         .attr("d", valueline)

      // Smooth display animation of lines
      var totalLength = line_path.node().getTotalLength();
      line_path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(transitionDuration)
        .ease(d3.easeSin)
        .attr("stroke-dashoffset", 0);


    }
  

/****************LINE CURSORS****************/

    // Line that follows the cursor 
    var lineCursor = svg
    .append('path')
    .attr("class", "line-bar")
      // .attr("stroke", "white")
      .style("opacity", 0)


    // Circle that travels along the curve of chart & follows the cursor
    var focus_danceability = svg
    .append('g')
    .append('circle')
      .style("fill", colors[0])
      .attr("stroke", "black")
      .attr('r', 7)
      .style("opacity", 0)

    var focus_speechiness = svg
    .append('g')
    .append('circle')
      .style("fill", colors[1])
      .attr("stroke", "black")
      .attr('r', 7)
      .style("opacity", 0)

    // Text that travels along the curve of chart & follows the cursor
    var focusText_danceability = svg
    .append('g')
    .append('text')
      .style("opacity", 0)   
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")

    var focusText_speechiness = svg
    .append('g')
    .append('text')
      .style("opacity", 0)   
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")



    // Append a rect on top of the svg area to detect cursor pos
  rect = svg
    .append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr("width", width - 150)
    .attr("height", height + margin.top + margin.bottom)
    .on('mouseover', cursorover);
  rect.on('mousemove', function() {
      var mouse = d3.mouse(this);
      // move the vertical line
      d3.select(".line-bar")
      .attr("d", function() {
        console.log(rect.attr("width"))
        var d = "M" + mouse[0] + "," + 700;
        d += " " + mouse[0] + "," + 0;
        return d;
      });

      cursormove_danceability(this);
      cursormove_speechiness(this);
    })
    .on('mouseout', cursorout);


function cursorover() {
  d3.select(".line-bar")
      .style("opacity", "0.2");
  curserover_danceability();
  curserover_speechiness();
  }

function cursorout() {
  d3.select(".line-bar")
      .style("opacity", "0");
  cursorout_danceability();
  cursorout_speechiness();
  }

    // When the cursor moves, show annotations at correspondings pos
  function curserover_speechiness() {
    focus_speechiness.style("opacity", 1)
    focusText_speechiness.style("opacity",1)
  }

  function cursormove_speechiness(object) {
    // recover coordinate we need
    var x0 = x.invert(d3.mouse(object)[0]);
    var i = bisect(data, x0, 1);
    selection = data[i]
    focus_speechiness
      .attr("cx", x(selection.year))
      .attr("cy", y_speechiness(selection["speechiness"]))
    focusText_speechiness
      .html(selection.year.getFullYear() + "  -  " + "Speechiness: " + parseFloat(selection.speechiness).toFixed(2))
      .attr("x", x(selection.year)+15)
      .attr("y", y_speechiness(selection["speechiness"]))
      .style("fill", "cornsilk")
    }

  function cursorout_speechiness() {
    focus_speechiness.style("opacity", 0)
    focusText_speechiness.style("opacity", 0)
  }

    // When the cursor moves, show annotations at correspondings pos
  function curserover_danceability() {
    focus_danceability.style("opacity", 1)
    focusText_danceability.style("opacity",1)
  }


  // This allows to find the closest X index of the mouse:
  var bisect = d3.bisector(function(d) {return d.year; }).left;

  function cursormove_danceability(object) {
    // recover mouse coords
    var x0 = x.invert(d3.mouse(object)[0]);
    var i = bisect(data, x0, 1);
    selection = data[i]
    focus_danceability
      .attr("cx", x(selection.year))
      .attr("cy", y_danceability(selection["danceability"]))
    focusText_danceability
      .html(selection.year.getFullYear() + "  -  " + "Danceability: " + parseFloat(selection.danceability).toFixed(2))
      .attr("x", x(selection.year)+15)
      .attr("y", y_danceability(selection["danceability"]))
      .style("fill", "cornsilk")
    }

  function cursorout_danceability() {
    focus_danceability.style("opacity", 0)
    focusText_danceability.style("opacity", 0)
  }
/*********************************************/




/****************ANNOTATIONS & TOOLTIP WHEN INTERACTING WITH CIRCLES****************/

mainEvents = [//Danceability Events
              [{"Year": 1974, "Event": "The Age of Disco: Records start using drum machines (Rock Your Baby - George McCrae)", danceability: 0.594},
              {"Year": 1982, "Event": "Arrival of Electro on the Dancefloors: Planet Rock - Afrika Bambaataa", danceability: 0.915},
              // {"Year": 1985, "Event": "On and On - Jessie Saunders: First House Record", danceability: 0.81},
              {"Year": 1986, "Event": "You Be Illin' - Run D.M.C: The rise of danceable hip hop", danceability: 0.962},
              {"Year": 1989, "Event": "Funky Cold Medina - Tone-Loc: The most danceable on the billboard", danceability: 0.988},
              {"Year": 1996, "Event": "Emergence and Spreading of Trance music", danceability: 0.604},
              {"Year": 1998, "Event": "Around the World - Daft Punk: French House goes international", danceability: 0.956},
              {"Year": 1998, "Event": "Blue (Da Ba Dee) - Eiffel 65: International success", danceability: 0.956},
              {"Year": 2001, "Event": "Sandstorm - Darude: an Iconic EDM Song", danceability: 0.956},
              {"Year": 2006, "Event": "Temperature - Sean Paul: Dance pop still at the top of the chart)", danceability: 0.951},
              {"Year": 2010, "Event": "Alive! - Mondotek: The rise of Tecktonik dance", danceability: 0.74},
              {"Year": 2013, "Event": "Harlem Shake - Baauer: Dance & Electro songs develop into memes (n°1 for 5 consecutive weeks)", danceability: 0.951},
              {"Year": 2014, "Event": "Summer - Calvin Harris: The Scottish DJ-producer is all over the Billboard", danceability: 0.74},
              {"Year": 2018, "Event": "Look Alive -  BlocBoy JB ft. Drake: Hip hop and rap still is as danceable, with artists like Drake", danceability: 0.922},
              {"Year": 2020, "Event": "Billie Eilish - Therefore I am: The Age of Billie Eilish & Dark Pop", danceability: 0.74}],
              // Speechiness events
              [{"Year": 1979, "Event": "Kurtis Blow was the first rapper signed to Mercury Records", speechiness: 0.050381922},
                                  {"Year": 1991, "Event": "N.W.A.: First time that a rap group claimed top spot on the Billboard 200", speechiness: 0.0531319766134471},
                                  {"Year": 2000, "Event": "Eminem's Album: The Marshall Mathers", speechiness: 0.0730505892081869}]
              ]

for(var i = 0; i < features.length; i++){

      //This is the tooltip that will appear when hovering over a circle
      var div = d3.select("body").append("div")   
      .attr("id", "event-tooltip")
      .attr("class", "tooltip")               
      .style("opacity", 0);

      var bisect = d3.bisector(function(d) {return d.year; }).left;
      events = svg.selectAll("dot")    
          .data(mainEvents[i])         
      .enter().append("ellipse")                
      .style("opacity", 0)                              
      .attr("rx", 12)                                   
      .attr("ry", 15)      
      .attr("cx", function(d) {
        return x(new Date(d.Year+"-01-01T00:00"))})       
      .attr("cy", function(d) {
         return scales[i](data[bisect(data, new Date(d.Year+"-01-01T00:00"), 1)][features[i]]);
       })      
      .attr("fill", colors[i]) 
      .on("mouseover", function(d) {
        if(d3.select("#eventCheckbox").property("checked")) {     
                  div.transition()        
                      .duration(200)      
                      .style("opacity", .9);      
                  div .html(d.Year+ "<br/>"  + d.Event)  
                      .style("left", (d3.event.pageX) + "px")     
                      .style("top", (d3.event.pageY - 28) + "px");    
                  }})                  
      .on("mouseout", function(d) {       
          div.transition()        
              .duration(500)      
              .style("opacity", 0);   
      })
      .transition()
      .delay((d, i) => i * transitionDuration * 0.07)             
      .duration(transitionDuration)  
      .style("opacity", .7);

/********************************************************************************/
      }
},)


/****************BUTTON FOR DISPLAYING EVENTS****************/

d3.select("#eventCheckbox").on("click",update);
update();
      
      
function update(){
  updateEvents(d3.select("#eventCheckbox").property("checked"));
}

// This updates the display of the events
function updateEvents(opacity) {
  svg.selectAll("ellipse")
    .transition()
    .delay((d, i) => i * transitionDuration * 0.05)
    .duration(transitionDuration * 0.2)
    .style("opacity", +opacity * 0.7)
}
/*********************************************/