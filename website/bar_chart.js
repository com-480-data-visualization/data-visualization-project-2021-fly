var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range ([height, 0]);

var g = svg.append("g")
           .attr("transform", "translate(" + 100 + "," + 100 + ")");

//load data
d3.csv("files/sentiment/love.csv", function(error, data) {
       if (error) {
           throw error;
       }

       xScale.domain(data.map(function(d) { return d.decade; }));
       yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

       g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

       g.append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value");

//add axes
g.append("g")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(xScale))
 .call(d3.axisLeft(yScale));

//add bars
g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.decade); })
        .attr("y", function(d) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.value); });
});
