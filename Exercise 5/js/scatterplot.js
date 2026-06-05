(function() {
  const containerId = "#scatter-chart";
  
  const renderChart = () => {
    d3.select(containerId).selectAll("*").remove();

    const width = 600;
    const height = 380;
    const margin = { top: 20, right: 50, bottom: 40, left: 140 };

    const svg = d3.select(containerId)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%");

    // Top 10 data parsed and consolidated cleanly from your list
    const data = [
      { brand: "SAMSUNG", count: 1119 }, // Grouped Samsung variants
      { brand: "KOGAN", count: 677 },
      { brand: "LG", count: 669 },
      { brand: "HISENSE", count: 255 },
      { brand: "PHILIPS", count: 130 },
      { brand: "JVC", count: 111 },
      { brand: "EKO", count: 97 },
      { brand: "TCL", count: 93 },
      { brand: "SONY", count: 97 }, // Grouped Sony variants
      { brand: "BAUHN", count: 77 }
    ].sort((a,b) => b.count - a.count);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.brand))
      .range([margin.top, height - margin.bottom])
      .padding(0.25);

    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5));

    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", margin.left)
      .attr("y", d => yScale(d.brand))
      .attr("width", d => xScale(d.count) - margin.left)
      .attr("height", yScale.bandwidth())
      .style("fill", "#e74c3c");

    svg.selectAll(".lbl")
      .data(data)
      .join("text")
      .attr("x", d => xScale(d.count) + 5)
      .attr("y", d => yScale(d.brand) + yScale.bandwidth()/2 + 4)
      .style("font-family", "sans-serif")
      .style("font-size", "11px")
      .text(d => d.count.toLocaleString());
  };

  renderChart();
})();