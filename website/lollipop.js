var decade_1 = "1950";
var decade_2 = "1950";
var data_pop = "lollipop_pop.csv";
var data_rock = "lollipop_rock.csv";
var data_file = "lollipop_pop.csv";
var genre= "Pop";

var colors = ["#581845", "#900c3f", "#c70039", "#ff5733", "#FF6363", "#ffbd69"];
var pop_color = "#000000";
var rock_color = "#00000";

// set the dimensions and margins of the graph
var margin = {
        top: 30,
        right: 30,
        bottom: 70,
        left: 100
    },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svgLollipop = d3.select("#lollipop_d3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var lollipop_x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, width]);

var lollipop_y = d3.scaleBand()
    .range([height, 0])
    .padding(1);

    var yAxis = svgLollipop.append("g")
    .attr("stroke-width", 1)
    .attr("class", "axis")
svgLollipop.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(lollipop_x))

var yAxis = svgLollipop.append("g")
    .attr("stroke-width", 1)
    .attr("class", "axis")

svgLollipop.append("g").call(d3.axisLeft(lollipop_y))

function update() {
    // Parse the Data
    
    if (genre == "Pop") {
        data_file = data_pop
      } else {
        data_file = data_rock
      }
    d3.csv(data_file, function(data) {
        // Add X axis
        // Lines

        lollipop_y.domain(data.map(function(d) {
            return d.group;
        }))
        yAxis.transition().duration(1000).call(d3.axisLeft(lollipop_y));


        var j = svgLollipop.selectAll(".lineInBetween").data(data)
        j.enter()
            .append("line")
            .attr("class", "lineInBetween")
            .merge(j)
            .transition()
            .duration(1000)
            .attr("x1", function(d) {
                return lollipop_x(d[decade_1]);
            })
            .attr("x2", function(d) {
                return lollipop_x(d[decade_2]);
            })
            .attr("y1", function(d) {
                return lollipop_y(d.group);
            })
            .attr("y2", function(d) {
                return lollipop_y(d.group);
            })
            .attr("stroke-width", 4)
            .attr("opacity", 0.16)
            .attr("stroke", "white")


        // Circles of variable 1
        var k = svgLollipop.selectAll(".lollipopCircleOne").data(data)
        k.enter()
            .append("circle")
            .attr("class", "lollipopCircleOne")
            .merge(k)
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
                return lollipop_x(d[decade_1]);
            })
            .attr("cy", function(d) {
                return lollipop_y(d.group);
            })
            .attr("r", "8")
            .style("fill", "#EEFBFB")
            .attr("opacity", 1)

        // Circles of variable 2
        var l = svgLollipop.selectAll(".lollipopCircleTwo").data(data)
        l.enter()
            .append("circle")
            .attr("class", "lollipopCircleTwo")
            .merge(l)
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
                return lollipop_x(d[decade_2]);
            })
            .attr("cy", function(d) {
                return lollipop_y(d.group);
            })
            .attr("r", "8")
            .style("fill", "#007CC7")
            .attr("opacity", 1)
    });
}


var DISTANCE = 30;



svgLollipop.append("text")
    .attr("class", "genre")
    .attr("x", 200)
    .attr("y", margin.top - DISTANCE + 10)
    .text(genre + "'s Music")
    .style("font-size", "20px")
    .style("fill", "#ffffff");



/* DEFAULT */

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
    update()
}

function update_2(decade) {
    svgLollipop.select(".decade2").remove();

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
        .text(decade)
        .style("font-size", "15px")
        .style("fill", "#007CC7");

    decade_2 = decade
    update()
}

function update_3(new_genre) {
    svgLollipop.select(".genre").remove();


svgLollipop.append("text")
    .attr("class", "genre")
    .attr("x", 200)
    .attr("y", margin.top)
    .text(new_genre + "'s Music")
    .style("font-size", "20px")
    .style("fill", "#ffffff");

    genre = new_genre
    update()
}


update()
