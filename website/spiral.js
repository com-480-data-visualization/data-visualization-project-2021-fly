var margin = {
        top: 30,
        right: 30,
        bottom: 70,
        left: 100
    },
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var transitionDuration = 3000

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

function addRowDescription(g, data) {
  return g.attr('transform', `translate(0, ${margin.top + 200})`)
  .selectAll('text-description')
  .append("text")
    .attr('class', 'description')
    .attr("class", "spiral-element")
    .attr('y', function(){
      console.log('hi');
      return 100;})
    .text(data);}

/* 
-----------------SPIRALS-----------------
*/

section = 0;

statistics = [{"Number": 847, "Event": "Elton John", "centerX": width/4, "centerY" : height/3, "radius": 35, "sides": 200, "coils": 3, "rotation":0},

{"Number": 328, "Event": "Gold - Connie Francis (Album)", "centerX": width/2, "centerY" : height/3, "radius": 35, "sides": 300, "coils": 5, "rotation":0},

{"Number": 87, "Event": "Radioactive - Imagine Dragons", "centerX": 3*width/4, "centerY" : height/3, "radius": 35, "sides": 200, "coils": 3, "rotation":0},

{"Number": 62, "Event": "Mariah Carey", "centerX": width/4, "centerY" : height/3, "radius": 35, "sides": 200, "coils": 3, "rotation":0},

{"Number": 19, "Event": "Old Town Road - Lil Nas X ft. Billy Ray Cyrus", "centerX": width/2, "centerY" : height/3, "radius": 35, "sides": 200, "coils": 2, "rotation":0},

{"Number": 29, "Event": "Scorpion - Drake", "centerX": 3*width/4, "centerY" : height/3, "radius": 35, "sides": 200, "coils": 3, "rotation":0}]



// Parameters for the spiral along which circles will move
var numAnchorPoints = 50;
var lineData = d3.range(numAnchorPoints);

var a = 1.75; // Scaling of the spiral

// Scale for mapping integer numbers 1..numAnchorPoints to radians of the spiral

function scale_(nb_loops){
  return d3.scaleLinear()
                    .domain([0,numAnchorPoints])
                    .range([6.25,nb_loops*2*Math.PI]);
}


 // Archimedes spiral
var spiral = function(t, nb_loops){
        return {"x":a*scale_(nb_loops)(t)*Math.cos(scale_(nb_loops)(t)),
                "y":a*scale_(nb_loops)(t)*Math.sin(scale_(nb_loops)(t))};
      };

// Accessor function that will calculate svg path of the spiral
var lineFunction = function(size){
                  return d3.line()
                  .x(function(d) { return spiral(d, size).x; })
                  .y(function(d) { return spiral(d, size).y; })
                 .curve(d3.curveBasis);} // try with "linear" or "basis"}



// Scale the number of loops
var loop_scale = d3.scaleLog()
                    .domain([1,847])
                    .range([0,4]);

/* 
-----------------SPIRAL CHOICE-----------------
*/
// Function that change a color
function changeGraph() {
  if (d3.select("#top-one").property("checked")) {
    section = 0;
    d3.selectAll(".spiral-element").remove();
    var path = svg.selectAll("path")
          .data(statistics.slice(section * 3, section * 3 + 3))         
          .enter()
          .append("path")
          .attr("class", "spiral-element")
          .attr("d", d => lineFunction(loop_scale(d.Number))(lineData))
          .attr("stroke", "#f5b310")
          .attr("stroke-width", 3)
          .attr("fill", "none")
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr("transform", (d, i) => "translate(" + d.centerX + "," + d.centerY+ ")")  
        }
    else{
      section = 1;
    d3.selectAll(".spiral-element").remove();
    var path = svg.selectAll("path")
            .data(statistics.slice(section * 3, section * 3 + 3))         
            .enter()
            .append("path")
            .attr("class", "spiral-element")
            .attr("d", d => lineFunction(loop_scale(d.Number))(lineData))
            .attr("stroke", "#f5b310")
            .attr("stroke-width", 3)
            .attr("fill", "none")
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr("transform", (d, i) => "translate(" + d.centerX + "," + d.centerY+ ")")
    }


    var totalLength = svg.selectAll("path").node().getTotalLength();


    path.attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .delay(transitionDuration*0.1)
    .duration(transitionDuration )
    .ease(d3.easeSin)
    .attr("stroke-dashoffset", 0);


/*-----------------ROW DESCRPTIONS-----------------*/
// svg.append('g')
//     .call(addRowDescription, row_descriptions[section]);

svg.append("text")
               // .attr("dy", function(d){return "62%"})
                .attr("x", margin.right)
                .attr("y", 0)
                .attr("class", "spiral-element")
                 .text(row_descriptions[section])
                .style( "opacity", 0 )
                .transition()
                .delay((d, i) => i *  0.1 *  transitionDuration)
                  .ease(d3.easeBounce)
                .duration(transitionDuration*0.17)
                .style( "opacity", 1 )
                .attr('y',  height/3);
/*----------------------------------------------*/

/* 
-----------------SPIRAL TEXT-----------------*/
var start_val = 0;
svg.selectAll("text.number")
                .data(statistics.slice(section * 3, section * 3 + 3))
                .enter()
                .append("text")
          .text(start_val)
                .attr("y", function(d){return d.centerY})
                 .attr("x", function(d){return d.centerX})
                 .attr("class", "spiral-content spiral-element")
                  .attr( "fill-opacity", 0 )
                  .transition()
                .delay((d, i) => i * 0.1 * transitionDuration)
                  .ease(d3.easeCubicOut)
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
                  .data(statistics.slice(section * 3, section * 3 + 3))
                  .enter()
                  .append("text")
                  .attr("x", function(d){return d.centerX})
                  .attr("y", function(d){return d.centerY + 40})
                  .attr("class", "spiral-content spiral-element")
                   .text(function(d){ return d.Event;})
                  .style( "opacity", 0 )
                  .transition()
                  .delay((d, i) => i *  0.1 *  transitionDuration)
                    .ease(d3.easeBounce)
                  .duration(transitionDuration*0.17)
                  .style( "opacity", 1 )
                  .attr('y',  function(d){return d.centerY + 60});

/* ---------------------------------------------------*/
}


// Event listener to the radio button
changeGraph();
d3.select("#radio-buttons").on("change", changeGraph )

/* 
---------------------------------------------------*/