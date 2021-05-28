var margin = {
        top: 30,
        right: 30,
        bottom: 70,
        left: 100
    },
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var transitionDuration = 2000

var lineSeparation = 80

// Create SVG
var svg = d3.select("#spiral").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");

/* 
-----------------TITLES-----------------
*/

const title = svg.append('g');
  title.append('g')
    .call(addTitle, 'Achievements and Milestones in the Billboard 100');
  title.append('g')
    .call(addTitle, 'Top Hits & Artists in numbers', 'subtitle');

spiral_description = ['Blabla 1.', 'Blabla 2.']
svg.append('g')
    .call(addDescription, spiral_description);


function addTitle(g, title, type = 'title') {
  return g.attr('transform', `translate(${margin.left}, ${margin.top + (type == 'subtitle' ? 25 : 0)})`)
  .append('text')
    .attr('class', type)
    .text(title)
}

function addDescription(g, data) {
  return g.attr('transform', `translate(${margin.left + 7.5}, ${margin.top + 50})`)
  .selectAll('text-description')
  .data(data)
  .enter().append("text")
    .attr('class', 'description')
    .attr('y', (d, i) => i * lineSeparation)
    .text(d => d);}

/* 
-----------------ROW DESCRIPTION-----------------
*/
row_descriptions = ['Top appearences in Billboard', 'Most weeks in Top 1']
svg.append('g')
    .call(addRowDescription, row_descriptions);

function addRowDescription(g, data) {
  return g.attr('transform', `translate(0, ${margin.top + 200})`)
  .selectAll('text-description')
  .data(data)
  .enter().append("text")
    .attr('class', 'description')
    .attr('y', (d, i) => i * (lineSeparation + 100))
    .text(d => d);}

/* 
-----------------SPIRALS-----------------
*/

statistics = [{"Number": 847, "Event": "Elton John", "centerX": width/4, "centerY" : height/3, "radius": 35, "sides": 200, "coils": 3, "rotation":0},

{"Number": 328, "Event": "Gold - Connie Francis (Album)", "centerX": width/2, "centerY" : height/3, "radius": 100, "sides": 300, "coils": 5, "rotation":0},

{"Number": 87, "Event": "Radioactive - Imagine Dragons", "centerX": 3*width/4, "centerY" : height/3, "radius": 35, "sides": 200, "coils": 3, "rotation":0},

{"Number": 62, "Event": "Mariah Carey", "centerX": width/4, "centerY" : 2*height/3, "radius": 35, "sides": 200, "coils": 3, "rotation":0},

{"Number": 19, "Event": "Old Town Road - Lil Nas X ft. Billy Ray Cyrus", "centerX": width/2, "centerY" : 2*height/3, "radius": 35, "sides": 200, "coils": 2, "rotation":0},

{"Number": 29, "Event": "Scorpion - Drake", "centerX": 3*width/4, "centerY" : 2*height/3, "radius": 35, "sides": 200, "coils": 3, "rotation":0}]

var lineFunction = d3.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; })
                    .curve(d3.curveCardinal);

spirals = svg.selectAll()    
          .data(statistics)         
      .enter().append("path")
      .attr("d", function(d, i){

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
      // .attr("stroke", "url(#linear-gradient)")
      .attr("stroke", "#8aded1")
      .attr("stroke-width", 1)
      .attr("opacity", 0.5)
      .attr("fill", "none")
      // .attr('transform', `translate(${margin.left}, 100)`)



// Transition
var totalLength = svg.selectAll("path").node().getTotalLength();
svg.selectAll("path")
.attr("stroke-dasharray", totalLength + " " + totalLength)
.attr("stroke-dashoffset", totalLength)
.transition()
  .duration(transitionDuration)
  .ease(d3.easeSin)
  .attr("stroke-dashoffset", 0);

/* 
-----------------SPIRAL TEXT-----------------
*/
var start_val = 0;
svg.selectAll("text.number")
                .data(statistics)
                .enter()
                .append("text")
    			.text(start_val)
                .attr("y", function(d){return d.centerY + 5})
                 .attr("x", function(d){return d.centerX})
                 .attr("class", "spiral-content")
                  .attr( "fill-opacity", 0 )
                  .transition()
                  .ease(d3.easeLinear)
                  .duration(transitionDuration)
                  .attr( "fill-opacity", 1 )
                  .tween("text", function(d) {
                  	var node = this;
                  	let i = d3.interpolate(node.textContent, d.Number);
                  	return function(t) {
                  		d3.select(node).text(Math.round(i(t)));
                  	};
                  });



svg.selectAll("spiral.description")
                .data(statistics)
                .enter()
                .append("text")
               // .attr("dy", function(d){return "62%"})
                .attr("x", function(d){return d.centerX})
                .attr("y", function(d){return d.centerY + 60})
               .attr("class", "spiral-content")
                 .text(function(d){ return d.Event;})
                .attr( "fill-opacity", 0 )
                .transition()
                .duration(transitionDuration )
                .attr( "fill-opacity", 1 );

/* 
---------------------------------------------------*/



// Define the gradient
//Coloring the spiral
    var colorRange = ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641']
    var color = d3.scaleLinear().range(colorRange).domain([1, 2, 3, 4, 5]);

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
