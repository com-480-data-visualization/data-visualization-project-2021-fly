const fontFamily = "Open Sans",
    fontScale = d3.scaleLinear().range([20, 150]), // Construction d'une échelle linéaire continue qui va d'une font de 20px à 60px
    fillScale = d3.scaleOrdinal(d3.schemeCategory10); // Construction d'une échelle discrète composée de 10 couleurs différentes

var decade = "1950";

// set the dimensions of the cloud
var margin = {
        top: 30,
        right: 30,
        bottom: 70,
        left: 100
    },
    width = 1400 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var svgCloud = d3.select("#cloud_d3")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

function update_word_cloud() {
  file = "files/word_count/"+decade+"_lyrics.csv";
  d3.csv(file, function(csv) {
      var words = [];
      csv.forEach(function(e,i) {
          words.push({"text": e.word, "size": +e.count});
      });
      words.length = 100;
      // associate least occurent world to the smallest font.
      let minSize = d3.min(words, d => d.size);
      let maxSize = d3.max(words, d => d.size);
      fontScale.domain([minSize, maxSize]);

      d3.layout.cloud()
          .size([width, height])
          .words(words)
          .padding(2)
          .rotate(function() {
              return ~~(Math.random() * 2) * 45;
          })
          .spiral("rectangular")
          .font(fontFamily)
          .fontSize(d => fontScale(d.size))
          .on("end", draw)
          .start();

      function draw() {
          svgCloud.append("g") // Ajout du groupe qui contiendra tout les mots
                  .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")") // Centrage du groupe
                  .selectAll("text")
                  .data(words)
                  .enter().append("text") // Ajout de chaque mot avec ses propriétés
                      .style("font-size", d => d.size + "px")
                      .style("font-family", fontFamily)
                      .style("fill", d => fillScale(d.size))
                      .attr("text-anchor", "middle")
                      .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
                      .text(d => d.text);
        }
})}

function update_cloud(new_decade){
  svgCloud.selectAll("text").remove();
  decade = new_decade;
  update_word_cloud();
}

update_word_cloud();
