var width = 960,
    height = 500;

var transitionDuration = 2000



var lineFunction = d3.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; })
                    .curve(d3.curveCardinal);

//Coloring the spiral
    var colorRange = ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641']
    var color = d3.scaleLinear().range(colorRange).domain([1, 2, 3, 4, 5]);


/*
FIRST SPIRAL
*/



var svg = d3.select("#spiral").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");



statistics = [{"Number": 847, "Event": "Elton John", "centerX": width/4, "centerY" : height/2, "radius": 170, "sides": 200, "coils": 3, "rotation":0},
{"Number": 847, "Event": "Elton John", "centerX": 3*width/4, "centerY" : height/2, "radius": 170, "sides": 200, "coils": 2, "rotation":0}]
         // ,
         // {"Number": 0, "Event": "X"}]


// path_1 = svg.append("path")
//   .attr("d", lineFunction(new_time))
//   .attr("stroke", "url(#linear-gradient)")
//   // .attr("stroke", "red")
//   .attr("stroke-width", 10)
//   .attr("opacity", 0.5)
//   .attr("fill", "none")

svg.selectAll()    
          .data(statistics)         
      .enter().append("path")
      .attr("d", function(d){

        // How far to step away from center for each side.
        var awayStep = d.radius/d.sides; 
        // How far to rotate around center for each side.
        var aroundStep = d.coils/d.sides;// 0 to 1 based.
        // Convert aroundStep to radians.
        var aroundRadians = aroundStep * 2 * Math.PI;
        // Convert rotation to radians.
        d.rotation *= 2 * Math.PI;

        var new_time = [];

        // For every side, step around and away from center.
        for(var i=100; i<=d.sides; i++){
          // How far away from center
          var away = i * awayStep ;
         
          // How far around the center.
          var around = i * aroundRadians + d.rotation;

          // Convert 'around' and 'away' to X and Y.
          var x = d.centerX + Math.cos(around) * away;
          var y = d.centerY + Math.sin(around) * away;
          
          new_time.push({x: x, y: y});
        }
        return lineFunction(new_time);
      })
      .attr("stroke", "url(#linear-gradient)")
      .attr("stroke-width", 10)
      .attr("opacity", 0.5)
      .attr("fill", "none")
      .append("text")
      .attr("y", function(d){return d.centerY - 20})
     .attr("x", function(d){return d.centerX - 20})
     .attr('text-anchor', 'middle')
     .attr("class", "spiral-content")
     .text("402")
     .append("tspan")
     // .attr("y", centerY+40)
     .attr("y", function(d){
        console.log(d.centerX);
        return d.centerY + 40})
     // .attr("x", centerX)
     .attr("y", function(d){return d.centerX})
     .text("entries")
      .attr( "fill-opacity", 0 )
      .transition()
      .duration(transitionDuration )
      .attr( "fill-opacity", 1 );

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

// Transition
var totalLength = svg.selectAll("path").node().getTotalLength();
svg.selectAll("path")
.attr("stroke-dasharray", totalLength + " " + totalLength)
.attr("stroke-dashoffset", totalLength)
.transition()
  .duration(transitionDuration)
  .ease(d3.easeSin)
  .attr("stroke-dashoffset", 0);






//Text

// svg.data(statistics)         
//       .enter().append("text")
//    .attr("y", function(d){return d.centerY - 20})
//    .attr("x", function(d){return d.centerX - 20})
//    .attr('text-anchor', 'middle')
//    .attr("class", "spiral-content")
//    .text("402")
//    .append("tspan")
//    // .attr("y", centerY+40)
//    .attr("y", function(d){
//       return d.centerY + 40})
//    // .attr("x", centerX)
//    .attr("y", function(d){return d.centerX})
//    .text("entries")
//     .attr( "fill-opacity", 0 )
//     .transition()
//     .duration(transitionDuration )
//     .attr( "fill-opacity", 1 );


/*
SECOND SPIRAL
*/

