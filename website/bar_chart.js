// set the dimensions of the cloud
var sentiment = "love";
var margin = {
        top: 30,
        right: 30,
        bottom: 70,
        left: 100
    },
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svgBarChart = d3.select("#bar_chart_d3")
                 .append("svg")
                 .attr("width", width + margin.left + margin.right)
                 .attr("height", height + margin.top + margin.bottom)

var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range ([height, 0]);

var g = svgBarChart.append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function update_bar() {
  file = "files/sentiment/"+sentiment+".csv"
  d3.csv(file, function(error, data) {
      if (error) {
          throw error;
      }

      xScale.domain(data.map(function(d) { return d.decade; }));
      yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

      g.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(xScale));
/*
      g.append("g")
       .call(d3.axisLeft(yScale).tickFormat(function(d){
           return d;
       }).ticks(5));
*/

      g.selectAll(".bar")
       .data(data)
       .enter().append("rect")
       .attr("class", "bar")
       .attr("x", function(d) { return xScale(d.decade); })
       .attr("y", function(d) { return yScale(d.value); })
       .attr("width", xScale.bandwidth())
       .attr("height", function(d) { return height - yScale(d.value); });
  });
}

function update_bar_chart(new_sentiment){
  svgBarChart.selectAll(".bar").remove();
  sentiment = new_sentiment;
  update_bar();
}

update_bar();
