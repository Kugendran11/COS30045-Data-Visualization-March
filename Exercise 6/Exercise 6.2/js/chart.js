// chart.js

// HISTOGRAM
function drawHistogram(dataset) {
  const container = d3.select("#chart-area");
  container.selectAll("*").remove(); 

  const svg = container.append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

  const bounds = svg.append("g")
    .attr("id", "histogram-bounds")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const currentBins = binGenerator(dataset);
  const xScale = d3.scaleLinear()
    .domain([currentBins[0].x0, currentBins[currentBins.length - 1].x1])
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(currentBins, d => d.length)])
    .range([innerHeight, 0])
    .nice();

  bounds.selectAll(".hist-bar")
    .data(currentBins)
    .join("rect")
      .attr("class", "hist-bar")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
      .attr("height", d => innerHeight - yScale(d.length))
      .style("fill", barPrimaryColor)
      .style("stroke", bodyBackgroundColor)
      .style("stroke-width", "1.5px");

  bounds.append("g")
    .attr("class", "axis-line x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale).ticks(8));

  bounds.append("g")
    .attr("class", "axis-line y-axis")
    .call(d3.axisLeft(yScale).ticks(6));
}

// Keep your drawHistogram function at the top intact, just replace drawScatterplot:

function drawScatterplot(dataset) {
  const container = d3.select("#scatterplot-area");
  container.selectAll("*").remove();

  const svg = container.append("svg")
    .attr("width", chartWidthS)
    .attr("height", chartHeightS);

  innerChartS = svg.append("g")
    .attr("id", "scatterplot-bounds")
    .attr("transform", `translate(${marginS.left}, ${marginS.top})`);

  // Explicitly scale x-axis across the standard 0-6 star rating domain
  xScaleS = d3.scaleLinear()
    .domain([0, 6])
    .range([0, innerWidthS]);

  yScaleS = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.energyConsumption) || 2500])
    .range([innerHeightS, 0])
    .nice();

  colorScaleS = d3.scaleOrdinal()
    .domain(["LED", "LCD", "OLED"])
    .range(["#2ecc71", "#3498db", "#e67e22"]);

  // Render nodes
  innerChartS.selectAll(".dot")
    .data(dataset)
    .join("circle")
      .attr("class", "dot")
      .attr("cx", d => xScaleS(d.starRating)) 
      .attr("cy", d => yScaleS(d.energyConsumption))
      .attr("r", 5)
      .attr("data-tech", d => d.screenTech)
      .attr("data-size", d => d.screenSize)
      .attr("data-brand", d => d.brand)
      .style("fill", d => colorScaleS(d.screenTech))
      .style("opacity", 0.5);

  // Build Axes
  innerChartS.append("g")
    .attr("class", "axis-line")
    .attr("transform", `translate(0, ${innerHeightS})`)
    .call(d3.axisBottom(xScaleS).ticks(6));

  innerChartS.append("g")
    .attr("class", "axis-line")
    .call(d3.axisLeft(yScaleS).ticks(6));

  // Build Legend
  const legend = svg.append("g")
    .attr("transform", `translate(${chartWidthS - marginS.right + 25}, ${marginS.top + 20})`);

  colorScaleS.domain().forEach((tech, idx) => {
    const legendRow = legend.append("g")
      .attr("transform", `translate(0, ${idx * 25})`);

    legendRow.append("rect")
      .attr("width", 14)
      .attr("height", 14)
      .attr("rx", 3)
      .style("fill", colorScaleS(tech));

    legendRow.append("text")
      .attr("x", 22)
      .attr("y", 12)
      .style("font-family", "sans-serif")
      .style("font-size", "12px")
      .style("font-weight", "600")
      .style("fill", "#475569")
      .text(tech);
  });
}