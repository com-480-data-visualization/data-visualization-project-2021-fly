// https://observablehq.com/@d3/word-cloud@217
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["dream.txt",new URL("./files/lyrics_1950",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Word Cloud

A demonstration of [d3-cloud](https://github.com/jasondavies/d3-cloud/). Paste into or edit the text below to update the chart. Note: word clouds [may be harmful](https://www.niemanlab.org/2011/10/word-clouds-considered-harmful/).`
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","fontFamily","data","padding","rotate","fontScale","invalidation"], function(d3,width,height,fontFamily,data,padding,rotate,fontScale,invalidation)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("font-family", fontFamily)
      .attr("text-anchor", "middle");

  const cloud = d3.cloud()
      .size([width, height])
      .words(data.map(d => Object.create(d)))
      .padding(padding)
      .rotate(rotate)
      .font(fontFamily)
      .fontSize(d => Math.sqrt(d.value) * fontScale)
      .on("word", ({size, x, y, rotate, text}) => {
        svg.append("text")
            .attr("font-size", size)
            .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
            .text(text);
      });

  cloud.start();
  invalidation.then(() => cloud.stop());
  return svg.node();
}
);
  main.variable(observer("viewof source")).define("viewof source", ["html","FileAttachment"], async function(html,FileAttachment)
{
  const textarea = html`<textarea rows=10>`;
  textarea.value = (await FileAttachment("dream.txt").text()).trim();
  textarea.style = `
  display: block;
  boxSizing: border-box;
  width: calc(100% + 28px);
  font: var(--mono_fonts);
  border: none;
  border-radius: 0;
  padding: 6px 10px;
  margin: 0 -14px;
  background: #f5f5f5;
  tabSize: 2;
  outline: none;
  resize: none;
`;
  return textarea;
}
);
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Appendix`
)});
  main.variable(observer("fontFamily")).define("fontFamily", function(){return(
"sans-serif"
)});
  main.variable(observer("fontScale")).define("fontScale", function(){return(
15
)});
  main.variable(observer("rotate")).define("rotate", function(){return(
() => 0
)});
  main.variable(observer("padding")).define("padding", function(){return(
0
)});
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("words")).define("words", ["source","stopwords"], function(source,stopwords){return(
source.split(/[\s.]+/g)
  .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
  .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
  .map(w => w.replace(/['’]s$/g, ""))
  .map(w => w.substring(0, 30))
  .map(w => w.toLowerCase())
  .filter(w => w && !stopwords.has(w))
)});
  main.variable(observer()).define(["words"], function(words){return(
words.filter(w => /\W/.test(w))
)});
  main.variable(observer("data")).define("data", ["d3","words"], function(d3,words){return(
d3.rollups(words, group => group.length, w => w)
  .sort(([, a], [, b]) => d3.descending(a, b))
  .slice(0, 250)
  .map(([text, value]) => ({text, value}))
)});
  main.variable(observer("d3")).define("d3", ["require"], async function(require){return(
Object.assign(await require("d3@6"), {cloud: await require("d3-cloud@1")})
)});
  return main;
}
