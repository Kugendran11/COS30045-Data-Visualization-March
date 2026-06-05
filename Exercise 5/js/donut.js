(function() {
  const containerId = "#donut-chart";
  
  const renderChart = () => {
    d3.select(containerId).selectAll("*").remove();

    const width = 600;
    const height = 380;
    const radius = Math.min(width, height) / 2 - 30;

    const svg = d3.select(containerId)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const data = [
      { tech: "LCD", value: 354 },
      { tech: "LED", value: 3470 },
      { tech: "OLED", value: 271 }
    ];

    const total = d3.sum(data, d => d.value);
    const color = d3.scaleOrdinal().domain(data.map(d=>d.tech)).range(["#3498db", "#2ecc71", "#e67e22"]);
    const pie = d3.pie().value(d => d.value).sort(null);
    const arc = d3.arc().innerRadius(radius * 0.55).outerRadius(radius);
    const labelArc = d3.arc().innerRadius(radius * 0.75).outerRadius(radius * 0.75);

    svg.selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.tech))
      .attr("stroke", "#ffffff")
      .style("stroke-width", "3px");

    svg.selectAll("text")
      .data(pie(data))
      .join("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .style("font-family", "sans-serif")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#1e293b")
      .text(d => `${d.data.tech} (${((d.data.value/total)*100).toFixed(1)}%)`);
  };

  renderChart();
})();