var width = 960,
    height = 500;


data = [{"Number": 847, "Event": "Elton John"}]
         // ,
         // {"Number": 0, "Event": "X"}]

var centerX = width/2,
    centerY = height/2,
    radius = 170,
    sides = 200,
    coils = 4,
    rotation = 0;

var transitionDuration = 2000
    
// How far to step away from center for each side.
var awayStep = radius/sides; 
// How far to rotate around center for each side.
var aroundStep = coils/sides;// 0 to 1 based.
// Convert aroundStep to radians.
var aroundRadians = aroundStep * 2 * Math.PI;
// Convert rotation to radians.
rotation *= 2 * Math.PI;


var new_time = [];

// For every side, step around and away from center.
for(var i=100; i<=sides; i++){
  // How far away from center
  var away = i * awayStep ;
 
  // How far around the center.
  var around = i * aroundRadians + rotation;

  // Convert 'around' and 'away' to X and Y.
  var x = centerX + Math.cos(around) * away;
  var y = centerY + Math.sin(around) * away;
  
  new_time.push({x: x, y: y});
}



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



var spiral_1 = d3.select("#spiral").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");

path_1 = spiral_1.append("path")
  .attr("d", lineFunction(new_time))
  .attr("stroke", "url(#linear-gradient)")
  // .attr("stroke", "red")
  .attr("stroke-width", 10)
  .attr("opacity", 0.5)
  .attr("fill", "none")

// Define the gradient
var linearGradient = spiral_1.append("defs")
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
var totalLength = path_1.node().getTotalLength();
path_1
.attr("stroke-dasharray", totalLength + " " + totalLength)
.attr("stroke-dashoffset", totalLength)
.transition()
  .duration(transitionDuration)
  .ease(d3.easeSin)
  .attr("stroke-dashoffset", 0);

//Text
spiral_1.append("text")
   .attr("y", centerY - 20)
   .attr("x", centerX)
   .attr('text-anchor', 'middle')
   .attr("class", "spiral-content")
   .text("847")
   .append("tspan")
   .attr("y", centerY+40)
   .attr("x", centerX)
   .text("entries")
    .attr( "fill-opacity", 0 )
    .transition()
    .duration(transitionDuration )
    .attr( "fill-opacity", 1 );


/*
SECOND SPIRAL
*/

