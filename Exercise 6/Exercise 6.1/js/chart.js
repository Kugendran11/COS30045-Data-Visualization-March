// Step 6 Master Geometric Histogram Rendering Engine
function drawHistogram(dataset) {
  const container = d3.select("#chart-area");
  container.selectAll("*").remove(); // Wipe canvas clean before painting updates

  // 6.1 Set up chart bounding box layout properties
  const svg = container.append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

  // Group element translation shifts everything inside our inner canvas margins
  const bounds = svg.append("g")
    .attr("id", "chart-bounds")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // 6.2 Process raw array components into bin buckets using our layout generator
  const currentBins = binGenerator(dataset);

  // 6.3 Set up mathematical calculation scale factors
  const xScale = d3.scaleLinear()
    .domain([currentBins[0].x0, currentBins[currentBins.length - 1].x1])
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(currentBins, d => d.length)])
    .range([innerHeight, 0])
    .nice();

  // 6.4 Data Join: Bind array counts into physical chart rect objects
  bounds.selectAll(".hist-bar")
    .data(currentBins)
    .join("rect")
      .attr("class", "hist-bar")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
      .attr("height", d => innerHeight - yScale(d.length))
      .style("fill", barPrimaryColor)
      .style("stroke", bodyBackgroundColor) // Uses baseline body background color as a crisp dividing line border separator
      .style("stroke-width", "1.5px");

  // 6.5 Render Bottom Horizontal Baseline Axis
  bounds.append("g")
    .attr("class", "axis-line")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale).ticks(8));

  // 6.6 Render Left Vertical Frequencies Frequency Volume Axis
  bounds.append("g")
    .attr("class", "axis-line")
    .call(d3.axisLeft(yScale).ticks(6));
}