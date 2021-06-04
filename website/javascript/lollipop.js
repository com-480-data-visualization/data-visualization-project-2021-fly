var decade_1 = "2010";
var decade_2 = "1950";
var data_pop = "files/lollipop/lollipop_pop.csv";
var data_rock = "files/lollipop/lollipop_rock.csv";
var data_file = "files/lollipop/lollipop_pop.csv";
var genre= "Pop";

var colors = ["#581845", "#900c3f", "#c70039", "#ff5733", "#FF6363", "#ffbd69"];

// Choose params for margin and size of the chart
var margin = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 100
    },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Create svg object and give value for different params
var svgLollipop = d3.select("#lollipop_d3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Scale of values for x axis 
var x_scale = d3.scaleLinear().domain([0, 1]).range([0, width]);

// Scale of values for y axis 
var y_scale = d3.scaleBand().range([height, 0]).padding(1);

// Creation of y axis and set parameters
var y_axis = svgLollipop.append("g").attr("stroke-width", 1).attr("class", "axis")
y_axis.selectAll("text").style("font-size", "15px") 

// Add the axis to the svg created just before
svgLollipop.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x_scale))
svgLollipop.append("g").call(d3.axisLeft(y_scale)).selectAll("text").style("font-size", "15px") 



function update_lollipop() {
    // Get chosen genre
    if (genre == "Pop") {
        data_file = data_pop
      } else {
        data_file = data_rock
      }
    
    // Read the data
    d3.csv(data_file, function(error, data) {
        if (error) {
            throw error;
        }
        // Get the different values of index
        y_scale.domain(data.map(function(d) {
            return d.group;
        }))
        // Add transition to make cahnges for smooth 
        y_axis.transition().duration(1000).call(d3.axisLeft(y_scale));

        // Select line when redrawing and update parameters
        var lines = svgLollipop.selectAll(".lineInBetween").data(data)
        lines.enter()
            .append("line")
            .attr("class", "lineInBetween")
            .style("stroke", "black")
            .merge(lines)
            .transition()
            .duration(1000)
            .attr("x1", function(d) {
                return x_scale(d[decade_1]);
            })
            .attr("x2", function(d) {
                return x_scale(d[decade_2]);
            })
            .attr("y1", function(d) {
                return y_scale(d.group);
            })
            .attr("y2", function(d) {
                return y_scale(d.group);
            })
            .attr("stroke-width", 4)
            .attr("opacity", 0.16)
            .attr("stroke", "white")

        // Select dots for decade 1 when redrawing and update parameters
        var circle_1 = svgLollipop.selectAll(".lollipopCircleOne").data(data)
        circle_1.enter()
            .append("circle")
            .attr("class", "lollipopCircleOne")
            .merge(circle_1)
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
                return x_scale(d[decade_1]);
            })
            .attr("cy", function(d) {
                return y_scale(d.group);
            })
            .attr("r", "8")
            .style("fill", "rgb(171 207 129)")
            .attr("opacity", 1)

        // Select dots for decade 2 when redrawing and update parameters
        var circle_2 = svgLollipop.selectAll(".lollipopCircleTwo").data(data)
        circle_2.enter()
            .append("circle")
            .attr("class", "lollipopCircleTwo")
            .merge(circle_2)
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
                return x_scale(d[decade_2]);
            })
            .attr("cy", function(d) {
                return y_scale(d.group);
            })
            .attr("r", "8")
            .style("fill", "#007CC7")
            .attr("opacity", 1)
    });
}


var DISTANCE = 30;

// Add graphic element when drawing the first time the graph
svgLollipop.append("text")
    .attr("class", "genre")
    .attr("x", 200)
    .attr("y", margin.top - DISTANCE + 10)
    .text(genre + " Music")
    .style("font-size", "20px")
    .style("fill", "#339fa6");

svgLollipop.append("rect")
        .attr("x", 520)
        .attr("y", margin.top - 20 + DISTANCE)
        .style("fill", "rgb(171 207 129)")
        .style("height", 10)
        .style("width", 20);

svgLollipop.append("text")
        .attr("class", "decade1")
        .attr("x", 550)
        .attr("y", margin.top -10 + DISTANCE)
        .text(decade_1)
        .style("font-size", "15px")
        .style("fill", "rgb(171 207 129)");

svgLollipop.append("rect")
        .attr("x", 520)
        .attr("y", margin.top - 10)
        .style("fill", "#007CC7")
        .style("height", 10)
        .style("width", 20);

svgLollipop.append("text")
        .attr("class", "decade2")
        .attr("x", 550)
        .attr("y", margin.top)
        .text(decade_2)
        .style("font-size", "15px")
        .style("fill", "#007CC7");


// Update functions to change either decade1, decade 2 or the genre label

// Function to remove past values, modify class variables and call update_lollipop to redraw
function update_1(decade) {
    svgLollipop.select(".decade1").remove();

    svgLollipop.append("rect")
        .attr("x", 520)
        .attr("y", margin.top - 20 + DISTANCE)
        .style("fill", "#EEFBFB")
        .style("height", 10)
        .style("width", 20);

    svgLollipop.append("text")
        .attr("class", "decade1")
        .attr("x", 550)
        .attr("y", margin.top -10 + DISTANCE)
        .text(decade)
        .style("font-size", "15px")
        .style("fill", "#EEFBFB");

    decade_1 = decade
    update_lollipop()
}

function update_2(decade) {
    svgLollipop.select(".decade2").remove();

    svgLollipop.append("rect")
        .attr("x", 520)
        .attr("y", margin.top - 10)
        .style("fill", "rgb(171 207 129)")
        .style("height", 10)
        .style("width", 20);

    svgLollipop.append("text")
        .attr("class", "decade2")
        .attr("x", 550)
        .attr("y", margin.top)
        .text(decade)
        .style("font-size", "15px")
        .style("fill", "rgb(171 207 129)");

    decade_2 = decade
    update_lollipop()
}

function update_3(new_genre) {
    svgLollipop.select(".genre").remove();


svgLollipop.append("text")
    .attr("class", "genre")
    .attr("x", 200)
    .attr("y", margin.top - DISTANCE + 10)
    .text(new_genre + " Music")
    .style("font-size", "20px")
    .style("fill", "#339fa6");

    genre = new_genre
    update_lollipop()
}


update_lollipop()
