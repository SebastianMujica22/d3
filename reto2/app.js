const data = [];

const render = (data) => {
  var margin = { top: 100, right: 200, bottom: 30, left: 50 };
  const width = 700;
  const height = 400;
  const inWidth = width - margin.left - margin.right;
  const inHeight = height - margin.top - margin.bottom;

  var svg = d3
    .select("#canvas")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  console.log(data);
  console.log(d3.max(data, (d) => d.lifeexpectancy));
  var x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.purchasingpower)*1.3])
    .range([0, inWidth]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.lifeexpectancy)])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  var z = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.population)])
    .range([0, 60]);

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
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
  data.forEach((d) => {
    d.population = +d.population;
    d.lifeexpectancy = +d.lifeexpectancy;
    d.purchasingpower = +d.purchasingpower;
  });
  render(data);
});
