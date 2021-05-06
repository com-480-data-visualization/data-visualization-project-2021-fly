var width = 960,
    height = 500;

var centerX = width/2,
    centerY = height/2,
    radius = 200,
    sides = 200,
    coils = 4,
    rotation = 0;
    
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

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");

var lineFunction = d3.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; })
                    .curve(d3.curveCardinal);

path = svg.append("path")
  .attr("d", lineFunction(new_time))
  .attr("stroke", "red")
  .attr("stroke-width", 10)
  .attr("opacity", 0.5)
  .attr("fill", "none")

//Text
svg.append("text")
   .attr("y", centerY)
   .attr("x", centerX)
   .attr('text-anchor', 'middle')
   .attr("class", "spiral-content")
   .text("99%");

// Transition
var totalLength = path.node().getTotalLength();
path
.attr("stroke-dasharray", totalLength + " " + totalLength)
.attr("stroke-dashoffset", totalLength)
.transition()
  .duration(2000)
  .ease(d3.easeSin)
  .attr("stroke-dashoffset", 0);


