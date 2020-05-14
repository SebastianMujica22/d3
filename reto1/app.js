const data = [];

const canvas = d3.select("#canvas");

const width = 700;
const height = 400;
const margin = { top: 20, right: 20, bottom: 20, left: 100 };
const inWidth = width - margin.left - margin.right;
const inHeight = height - margin.top - margin.bottom;

const svg = canvas.append("svg");
svg.attr("width", width);
svg.attr("height", height);

const render = (data) => {
  const xValue = (d) => d.value;
  const yValue = (d) => d.name;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, inWidth]);

  const yScale = d3.scaleBand().domain(data.map(yValue)).range([0, inHeight]).padding(0.1)


  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append('g').call(d3.axisLeft(yScale))
  g.append('g').call(d3.axisBottom(xScale))
    .attr("transform",`translate(0,${inHeight})`)

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(d.name))
    .attr("width", (d) => xScale(xValue(d)))
    .attr("height", (d) => yScale.bandwidth());
};

d3.json(
  "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json"
).then((data) => {
  this.data = data;
  render(data);
});
