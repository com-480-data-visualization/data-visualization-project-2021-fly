const fontFamily = "Open Sans",
    fontScale = d3.scaleLinear().range([20, 60]), // Construction d'une échelle linéaire continue qui va d'une font de 20px à 120px
    fillScale = d3.scaleOrdinal(d3.schemeCategory10); // Construction d'une échelle discrète composée de 10 couleurs différentes

var file = "files/word_count/1950_lyrics.csv"

function draw(words) {
d3.select("#word-cloud").append("svg") // Ajout d'un élément SVG sur un DIV existant de la page
    .attr("class", "svg")
    .attr("width", width)
    .attr("height", height)
    .append("g") // Ajout du groupe qui contiendra tout les mots
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

function update(file){
//Read the data
d3.csv(file, function(csv) {
    var words = [];
    csv.forEach(function(e,i) {
        words.push({"text": e.word, "size": +e.count});
    });
    words.length = 100; // Nous ne voulons que les 100 premiers mots

    // Calcul du domain d'entrée de notre fontScale
    // L'objectif est que la plus petite occurence d'un mot soit associée à une font de 20px
    // La plus grande occurence d'un mot est associée à une font de 120px
    let minSize = d3.min(words, d => d.size);
    let maxSize = d3.max(words, d => d.size);

    // Nous projettons le domaine [plus_petite_occurence, plus_grande_occurence] vers le range [20, 120]
    // Ainsi les mots les moins fréquents seront plus petits et les plus fréquents plus grands
    fontScale.domain([minSize, maxSize]);

    d3.layout.cloud()
        .size([width, height])
        .words(words)
        .padding(1)
        .rotate(function() {
            return ~~(Math.random() * 2) * 45;
        })
        .spiral("rectangular")
        .font(fontFamily)
        .fontSize(d => fontScale(d.size))
        .on("end", draw)
        .start();

    // La méthode draw
    draw(words);
})}

function update_cloud(new_decade) {
  d3.select(".svg").remove();
  file = "files/word_count/"+new_decade+"_lyrics.csv";
  update(file);
}
