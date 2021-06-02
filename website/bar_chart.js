// set the dimensions of the cloud
var sentiment = "love";
var margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var svgBarChart = d3.select("#bar_chart_d3")
                 .classed("svg-container", true)
                 .append("svg")
                 .attr("preserveAspectRatio", "xMinYMin meet")
                 .attr("viewBox", "0 0 "+width+" "+height+"");

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range([height, 0]);

var g = svgBarChart.classed("svg-content-responsive", true)
                   .append("g")
                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                   .attr("width", width)
                   .attr("height", height);

function update() {
  file = "files/sentiment/"+sentiment+".csv"
  d3.csv(file, function(error, data) {
      if (error) {
          throw error;
      }

      xScale.domain(data.map(function(d) { return d.decade; }));
      yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

      g.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom().scale(xScale));

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
  update();
}

update();
