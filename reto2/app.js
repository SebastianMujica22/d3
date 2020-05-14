const data = [];

const render = (data) => {

  var margin = {top: 10, right: 20, bottom: 30, left: 50}
  const width = 700;
  const height = 400;

  var svg = d3
    .select("#canvas")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear().domain([0, 10000]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear().domain([0, d3.max(data, d => d.lifeexpectancy)]).range([ height,0]);
  svg.append("g").call(d3.axisLeft(y));

  var z = d3.scaleLinear().domain([0, d3.max(data, d=> d.population)]).range([0, 40]);

  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.purchasingpower);
    })
    .attr("cy", function (d) {
      return y(d.lifeexpectancy);
    })
    .attr("r", function (d) {
      return z(d.population);
    })
    .style("fill", "#69b3a2")
    .style("opacity", "0.7")
    .attr("stroke", "black");
};

d3.json(
  "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json"
).then((data) => {
  this.data = data;
  render(data);
});
