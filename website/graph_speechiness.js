// dimensions and margins of graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1350 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

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
      // tempo: data.tempo}
      // danceability: data.danceability, 
      // energy: data.energy, 
      // instrumentalness: data.instrumentalness, 
      speechiness: data.speechiness} 
      // acousticness: data.acousticness, 
      // valence: data.valence,
      // mode: data.mode}   
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
        .text("Speechiness");


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
            .domain([0, 0.15])
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
    var features = ['speechiness']

    // Add the line
    // define the line
    var colorRange = ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'] //['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494']
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
      .y(function(d) { return y(d[features[i]]); });
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

      // svg.on("click", function(){
      //   path      
      //   .transition()
      //   .duration(2000)
      //   .ease("easeLinear")
      //   .attr("stroke-dashoffset", totalLength);
      // })



      var div = d3.select("body").append("div")   
      .attr("class", "tooltip")               
      .style("opacity", 0);


      mainEvents = [{"Year": 1979, "Event": "Kurtis Blow was the first rapper signed to Mercury Records", speechiness: 0.050381922},
                    {"Year": 1991, "Event": "N.W.A.: First time that a rap group claimed top spot on the Billboard 200", speechiness: 0.0531319766134471},
                    {"Year": 2000, "Event": "Eminem's Album: The Marshall Mathers", speechiness: 0.0730505892081869}]

      svg.selectAll("dot")    
          .data(mainEvents)         
      .enter().append("circle")                               
      .attr("r", 10)       
      .attr("cx", function(d) {
         return x(new Date(d.Year+"-01-01T00:00"))})       
      .attr("cy", function(d) {
         return y(d.speechiness)})      
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


    // Add interactive data

    

    // svg.selectAll("dot")    
    //     .data(data)         
    // .enter().append("circle")                               
    //     .attr("r", 10)       
    //     .attr("cx", function(d) { return x(d.year); })       
    //     .attr("cy", function(d) { return y(d.speechiness); })   
    //     // .attr("fill", "url(#linear-gradient)")  
    //     .on("mouseover", function(d) {      
    //         div.transition()        
    //             .duration(100)      
    //             .style("opacity", .9);      
    //         div .html(d.year + "<br/>"  + d.close)  
    //             .style("left", (d3.event.pageX) + "px")     
    //             .style("top", (d3.event.pageY - 28) + "px");    
    //         })                  
    //     .on("mouseout", function(d) {       
    //         div.transition()        
    //             .duration(500)      
    //             .style("opacity", 0);   
    //     });




    // Add a legend to the graph
    // var lineLegend = svg.selectAll(".lineLegend").data(features)
    //                   .enter().append("g")
    //                   .attr("class","lineLegend")
    //                   .attr("transform", function (d,i) {
    //                     // we mult by 4 so that the legend is pushed enough to left
    //                     position = width - 4 * margin.right
    //                       return "translate(" + position + "," + (i*30)+")";
    //                     });

    //                 lineLegend.append("text").text(function (d) {return d;})
    //                   .attr("transform", "translate(15,9)"); //align texts w/ boxes
    //                 lineLegend.append("rect")
    //                   .attr("fill", function (d, i) {return color(d); })
    //                   .attr("width", 10).attr("height", 10);



    // R&B's typical tempo: 60-80 BPM



    // Add interaction

      // var mouseG = svg.append("g")
      // .attr("class", "mouse-over-effects");

    // mouseG.append("path") // this is the black vertical line to follow mouse
    //   .attr("class", "mouse-line")
    //   .style("stroke", "black")
    //   .style("stroke-width", "1px")
    //   .style("opacity", "0");



    // var lines = document.getElementsByClassName('line');

    // var mousePerLine = mouseG.selectAll('.mouse-per-line')
    //   .data(features)
    //   .enter()
    //   .append("g")
    //   .attr("class", "mouse-per-line");

    // mousePerLine.append("circle")
    //   .attr("r", 7)
    //   .style("stroke", function(d) {
    //     return color(d.name); // ???
    //   })
    //   .style("fill", "none")
    //   .style("stroke-width", "1px")
    //   .style("opacity", "0");

    // mousePerLine.append("text")
    //   .attr("transform", "translate(10,3)");

    // mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
    //   .attr('width', width) // can't catch mouse events on a g element
    //   .attr('height', height)
    //   .attr('fill', 'none')
    //   .attr('pointer-events', 'all')
    //   .on('mouseout', function() { // on mouse out hide line, circles and text
    //     d3.select(".mouse-line")
    //       .style("opacity", "0");
    //     d3.selectAll(".mouse-per-line circle")
    //       .style("opacity", "0");
    //     d3.selectAll(".mouse-per-line text")
    //       .style("opacity", "0");
    //   })
    //   .on('mouseover', function() { // on mouse in show line, circles and text
    //     d3.select(".mouse-line")
    //       .style("opacity", "1");
    //     d3.selectAll(".mouse-per-line circle")
    //       .style("opacity", "1");
    //     d3.selectAll(".mouse-per-line text")
    //       .style("opacity", "1");
    //   })
    //   .on('mousemove', function() { // mouse moving over canvas
    //     var mouse = d3.mouse(this);
    //     d3.select(".mouse-line")
    //       .attr("d", function() {
    //         var d = "M" + mouse[0] + "," + height;
    //         d += " " + mouse[0] + "," + 0;
    //         return d;
    //       });

    //     d3.selectAll(".mouse-per-line")
    //       .attr("transform", function(d, i) {
    //         console.log(i)
    //         console.log(width/mouse[0])
    //         var xDate = x.invert(mouse[0]),
    //             bisect = d3.bisector(function(d) { return d.year; }).right;
    //             idx = bisect(d.values, xDate);
            
    //         var beginning = 0,
    //             end = lines[i].getTotalLength(),
    //             target = null;

    //         while (true){
    //           target = Math.floor((beginning + end) / 2);
    //           pos = lines[i].getPointAtLength(target);
    //           if ((target === end || target === beginning) && pos.x !== mouse[0]) {
    //               break;
    //           }
    //           if (pos.x > mouse[0])      end = target;
    //           else if (pos.x < mouse[0]) beginning = target;
    //           else break; //position found
    //         }
            
    //         d3.select(this).select('text')
    //           .text(y.invert(pos.y).toFixed(2));
              
    //         return "translate(" + mouse[0] + "," + pos.y +")";
    //       });
    //   });

  },

  )