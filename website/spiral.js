function load_spiral(){

var margin = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 100
    },
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var transitionDuration = 3000

var lineSeparation = 80


// Create SVG
var svgSpiral = d3.select("#spiral")
    .append("svg")
    .attr("width", d3.select("#spiral").node().getBoundingClientRect().width)
    .attr("height", height)
  .append("g");

/* 
-----------------SPIRALS-----------------
*/

section = 0;

statistics = [{"Number": 847, "Event": "Elton John", "Singer" : "", "centerX": width/4, "centerY" : height/4},
{"Number": 837, "Event": "Madonna", "Singer" : "", "centerX": width/4, "centerY" : height/2},
{"Number": 827, "Event": "Taylor Swift", "Singer" : "", "centerX": width/4, "centerY" : 3*height/4},


{"Number": 87, "Event": "Radioactive", "Singer" : "Imagine Dragons", "Date":"2012", "centerX": width/2, "centerY" : height/4},
{"Number": 79, "Event": "Sail", "Singer" : "Awolnation", "Date":"2010", "centerX": width/2, "centerY" : height/2},
{"Number": 76, "Event": "I'm Yours", "Singer" : "Jason Mraz", "Date":"2005", "centerX": width/2, "centerY" : 3*height/4},

{"Number": 259, "Event": "Celebration", "Singer" : "Madonna", "Date":"2009", "centerX": 3*width/4, "centerY" : height/4},
{"Number": 195, "Event": "Night Visions", "Singer" : "Imagine Dragons", "Date":"2012", "centerX": 3*width/4, "centerY" : height/2},
{"Number": 197, "Event": "Beauty Behind The Madness", "Singer" : "The Weeknd", "Date":"2015", "centerX": 3*width/4, "centerY" : 3*height/4},


{"Number": 62, "Event": "Mariah Carey", "centerX": width/4, "centerY" : height/4},
{"Number": 54, "Event": "The Beatles", "centerX": width/4, "centerY" : height/2},
{"Number": 33, "Event": "Boyz II Men", "centerX": width/4, "centerY" : 3*height/4},

{"Number": 19, "Event": "Old Town Road", "Singer" : "Lil Nas X ft. Billy Ray Cyrus", "Date":"2018", "centerX": width/2, "centerY" : height/4},
{"Number": 16, "Event": "One Sweet Day", "Singer" : "Mariah Carey & Boyz II Men", "Date":"1995", "centerX": width/2, "centerY" : height/2},
{"Number": 16, "Event": "Despacito", "Singer" : "Luis Fonsi & Daddy Yankee ft. Justin Bieber", "Date":"2017", "centerX": width/2, "centerY" : 3*height/4},

{"Number": 29, "Event": "Scorpion", "Singer" : "Drake", "Date":"2018",  "centerX": 3*width/4, "centerY" : height/4},
{"Number": 28, "Event": "The E.N.D.", "Singer" : "Black Eyed Peas", "Date":"2009",  "centerX": 3*width/4, "centerY" : height/2},
{"Number": 29, "Event": "1", "Singer" : "The Beatles", "Date":"1962-1972", "centerX": 3*width/4, "centerY" : 3*height/4}]



// Parameters for the spiral along which circles will move
var numAnchorPoints = 50;
var lineData = d3.range(numAnchorPoints);

var a = 1.75; // Scaling of the spiral

// Scale for mapping integer numbers 1..numAnchorPoints to radians of the spiral

function scale_(nb_loops){
  return d3.scaleLinear()
                    .domain([0,numAnchorPoints])
                    .range([6.5,nb_loops*2*Math.PI]);
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
                 .curve(d3.curveBasis);}



// Scale the number of loops
var loop_scale = d3.scaleLog()
                    .domain([1,847])
                    .range([0,4]);



/*-----------------LEGEND-----------------*/


column_legend_names = ['Artists', 'Songs', 'Albums'];

function addLegend(){

  svgSpiral.append("text")
                .attr("x", margin.left + 120)
                .attr("y", height/6)
                .attr("class", "legend")
                 .text(column_legend_names[0])
                .style( "opacity", 0 )
                .style("fill", "cornsilk")
                .transition()
                .duration(transitionDuration*0.5)
                .style( "opacity", 1 )
                .style("text-anchor", "middle");

  svgSpiral.append("text")
                  .attr("x", margin.left + 335)
                  .attr("y", height/6)
                  .attr("class", "legend")
                   .text(column_legend_names[1])
                  .style( "opacity", 0 )
                  .style("fill", "cornsilk")
                  .transition()
                  .duration(transitionDuration*0.5)
                  .style( "opacity", 1 )
                  .style("text-anchor", "middle");

  svgSpiral.append("text")
                  .attr("x", margin.left + 550)
                  .attr("y", height/6)
                  .attr("class", "legend")
                   .text(column_legend_names[2])
                  .style( "opacity", 0 )
                  .style("fill", "cornsilk")
                  .transition()
                  .duration(transitionDuration*0.5)
                  .style( "opacity", 1 )
                  .style("text-anchor", "middle");
}


/*----------------------------------------------*/

/* 
-----------------SPIRAL CHOICE-----------------
*/
// Function that change a color
function changeGraph() {
  if (d3.select("#all").property("checked")) {
    section = 0;
    d3.selectAll(".spiral-element").remove();
    d3.selectAll(".legend").remove();
    addLegend();
    var path = svgSpiral.selectAll("spiral-path")
          .data(statistics.slice(section * 9, section * 9 + 9))         
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
    d3.selectAll(".legend").remove();
    addLegend();
    var path = svgSpiral.selectAll("spiral-path")
            .data(statistics.slice(section * 9, section * 9 + 9))         
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


    var totalLength = svgSpiral.selectAll("path").node().getTotalLength();


    path.attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .delay((d, i) => i * transitionDuration*0.1)
    .duration(transitionDuration )
    .ease(d3.easeSin)
    .attr("stroke-dashoffset", 0);


/*-----------------ROW DESCRPTIONS-----------------*/

row_descriptions = ['Weeks spent on the Billboard: all positions', "Weeks spent on the Billboard: 1ˢᵗ position"]

svgSpiral.append("text")
                .attr("x", margin.right)
                .attr("y", 0)
                .attr("class", "spiral-element")
                 .text(row_descriptions[section])
                .style( "opacity", 0 )
                .style("fill", "cornsilk")
                .transition()
                .delay((d, i) => i *  0.1 *  transitionDuration)
                  .ease(d3.easeBounce)
                .duration(transitionDuration*0.17)
                .style( "opacity", 1 )
                .attr('y',  margin.top);
/*----------------------------------------------*/




/* 
-----------------SPIRAL TEXT-----------------*/
      /* -----------------Numbers inside spiral-----------------*/

var start_val = 0;
svgSpiral.selectAll("text.number")
                .data(statistics.slice(section * 9, section * 9 + 9))
                .enter()
                .append("text")
          .text(start_val)
                .attr("y", function(d){return d.centerY})
                 .attr("x", function(d){return d.centerX})
                 .attr("class", "spiral-content spiral-element")
                  .attr( "fill-opacity", 0 )
                  .style( "fill", "cornsilk" )
                  .style("font", "10px Helvetica")
                  .style("text-anchor", "middle")
                  .transition()
                .delay((d, i) => i * 0.1 * transitionDuration)
                  .ease(d3.easeCubicOut)
                  .duration(transitionDuration)
                  .attr( "fill-opacity", 0.8 )
                  .tween("text", function(d) {
                    var node = this;
                    let i = d3.interpolate(node.textContent, d.Number);
                    return function(t) {
                      d3.select(node).text(Math.round(i(t)));
                    };
                  });



      /* -----------------Labels under spiral-----------------*/
  svgSpiral.selectAll("spiral.description")
                  .data(statistics.slice(section * 9, section * 9 + 9))
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


  svgSpiral.selectAll("spiral.description")
                  .data(statistics.slice(section * 9, section * 9 + 9))
                  .enter()
                  .append("text")
                  .attr("x", function(d){return d.centerX})
                  .attr("y", function(d){return d.centerY + 40})
                  .attr("class", "spiral-content spiral-element")
                   .text(function(d){ return d.Singer;})
                  .style( "opacity", 0 )
                  .transition()
                  .delay((d, i) => i *  0.1 *  transitionDuration)
                    .ease(d3.easeBounce)
                  .duration(transitionDuration*0.17)
                  .style( "opacity", 0.9 )
                  .attr('y',  function(d){return d.centerY + 77});

  svgSpiral.selectAll("spiral.description")
                  .data(statistics.slice(section * 9, section * 9 + 9))
                  .enter()
                  .append("text")
                  .attr("x", function(d){return d.centerX})
                  .attr("y", function(d){return d.centerY + 40})
                  .attr("class", "spiral-content spiral-element")
                   .text(function(d){ return d.Date;})
                  .style( "opacity", 0 )
                  .transition()
                  .delay((d, i) => i *  0.1 *  transitionDuration)
                    .ease(d3.easeBounce)
                  .duration(transitionDuration*0.17)
                  .style( "opacity", 0.4 )
                  .attr('y',  function(d){return d.centerY + 94});

/* ---------------------------------------------------*/
}


// Event listener to the radio button
changeGraph();
d3.select("#radio-buttons").on("change", changeGraph )

/* 
---------------------------------------------------*/
}