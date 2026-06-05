(function() {
  const containerId = "#bar-chart-55";
  
  const renderChart = () => {
    d3.select(containerId).selectAll("*").remove();

    const width = 600;
    const height = 380;
    const margin = { top: 40, right: 40, bottom: 50, left: 60 };

    const svg = d3.select(containerId)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%");

    const data = [
      { tech: "LCD", count: 354 },
      { tech: "LED", count: 3470 },
      { tech: "OLED", count: 271 }
    ];

    const xScale = d3.scaleBand().domain(data.map(d => d.tech)).range([margin.left, width - margin.right]).padding(0.4);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.count) + 300]).range([height - margin.bottom, margin.top]);

    svg.append("g").attr("transform", `translate(0, ${height - margin.bottom})`).call(d3.axisBottom(xScale));
    svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(yScale));

    svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => xScale(d.tech))
      .attr("y", d => yScale(d.count))
      .attr("width", xScale.bandwidth())
      .attr("height", d => (height - margin.bottom) - yScale(d.count))
      .style("fill", "#2ecc71");

    svg.selectAll(".val")
      .data(data)
      .join("text")
      .attr("x", d => xScale(d.tech) + xScale.bandwidth()/2)
      .attr("y", d => yScale(d.count) - 8)
      .attr("text-anchor", "middle")
      .style("font-family", "sans-serif")
      .style("font-weight", "bold")
      .style("font-size", "12px")
      .text(d => d.count.toLocaleString());
  };

  renderChart();
})();