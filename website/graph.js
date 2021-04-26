// dimensions and margins of graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#billboard_features")
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
      danceability: data.danceability, 
      energy: data.energy, 
      instrumentalness: data.instrumentalness, 
      speechiness: data.speechiness, 
      acousticness: data.acousticness, 
      valence: data.valence,
      mode: data.mode}   
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
        .text("Audio features throughout the years");


    // Create X Axis using a time scale
    var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.year; }))
            .range([ 0, width ]);
    
    // Append the X axis to the bottom of the svg object
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Create Y Axis (its domain is (0..1))
    var y = d3.scaleLinear()
            .domain([0, 1])
            .range([ height, 0 ]);
    // Append the Y axis to the left of the svg object
    svg.append("g")
           .call(d3.axisLeft(y));
    // Add labels for the Y Axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em") 
        .attr("font-size", "12px")
        .style("text-anchor", "middle")
        .text("Values of the audio features");


    // Adding the actual data (one line per feature)
    var features = ['danceability', 'energy', 'instrumentalness', 'speechiness', 'acousticness', 'valence', 'mode'];
    var color = d3.scaleOrdinal()
       .domain(features)
       .range(d3.schemePaired  ); 
       // .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#984eb3','#ff7f10'])

    // Add a line for each feature

    // define the line
    var valueline = d3.line()
      .x(function(d) {return x(d.year); })
      .y(function(d) { return y(d[features[i]]); });

    // Append the path
    for(var i = 0; i < features.length; i++){
      svg.append("path")
         .datum(data)
         .attr("fill", "none")
         .attr("stroke", function(d){
            return color(features[i]);
          })
         .attr("stroke-width", 4)
         // .attr("d", valueline(data))
         .attr("d",valueline)}

    // Add a legend to the graph
    var lineLegend = svg.selectAll(".lineLegend").data(features)
                      .enter().append("g")
                      .attr("class","lineLegend")
                      .attr("transform", function (d,i) {
                        // we mult by 4 so that the legend is pushed enough to left
                        position = width - 4 * margin.right
                          return "translate(" + position + "," + (i*20)+")";
                        });

                    lineLegend.append("text").text(function (d) {return d;})
                      .attr("transform", "translate(15,9)"); //align texts w/ boxes
                    lineLegend.append("rect")
                      .attr("fill", function (d, i) {return color(d); })
                      .attr("width", 10).attr("height", 10);


  }

  )