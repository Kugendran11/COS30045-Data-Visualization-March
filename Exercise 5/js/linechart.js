(function() {
  const containerId = "#line-chart";
  
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
      { inch: 16, count: 3 }, { inch: 19, count: 19 }, { inch: 24, count: 160 },
      { inch: 31, count: 65 }, { inch: 32, count: 189 }, { inch: 40, count: 80 },
      { inch: 42, count: 135 }, { inch: 43, count: 215 }, { inch: 49, count: 262 },
      { inch: 50, count: 112 }, { inch: 55, count: 659 }, { inch: 64, count: 140 },
      { inch: 65, count: 618 }, { inch: 70, count: 80 }, { inch: 75, count: 531 },
      { inch: 77, count: 63 }, { inch: 83, count: 33 }, { inch: 85, count: 296 },
      { inch: 86, count: 75 }, { inch: 98, count: 52 }, { inch: 100, count: 42 }
    ].sort((a,b) => a.inch - b.inch);

    const xScale = d3.scaleLinear().domain([10, 105]).range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.count) + 50]).range([height - margin.bottom, margin.top]);

    svg.append("g").attr("transform", `translate(0, ${height - margin.bottom})`).call(d3.axisBottom(xScale).tickFormat(d => `${d}"`));
    svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(yScale));

    const line = d3.line().x(d => xScale(d.inch)).y(d => yScale(d.count)).curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#9b59b6")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Highlight key popular purchase spikes (24", 32", 55", 65", 75")
    svg.selectAll("circle")
      .data(data.filter(d => d.count > 150))
      .join("circle")
      .attr("cx", d => xScale(d.inch))
      .attr("cy", d => yScale(d.count))
      .attr("r", 5)
      .style("fill", "#8e44ad")
      .style("stroke", "#fff");
  };

  renderChart();
})();