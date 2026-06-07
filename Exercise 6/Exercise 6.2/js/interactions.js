// ========================================================
// EXERCISE 6.1: HISTOGRAM INTERACTION METHODS
// ========================================================
function populateFilters(dataset) {
  const filterSection = d3.select("#filter-panel");
  filterSection.selectAll("*").remove();
  
  filterSection.selectAll(".filter-btn")
    .data(filters_screen)
    .join("button")
      .attr("class", d => d.isActive ? "filter-btn active" : "filter-btn")
      .text(d => d.label)
      .on("click", function(event, activeRecord) {
        
        filters_screen.forEach(item => {
          item.isActive = (item.id === activeRecord.id);
        });

        filterSection.selectAll(".filter-btn")
          .attr("class", d => d.isActive ? "filter-btn active" : "filter-btn");

        updateHistogram(activeRecord.id, dataset);
      });
}

function updateHistogram(selectedTechId, dataset) {
  const updatedData = (selectedTechId === "all") 
    ? dataset 
    : dataset.filter(row => row.screenTech === selectedTechId);

  const updatedBins = binGenerator(updatedData);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(updatedBins, d => d.length)])
    .range([innerHeight, 0])
    .nice();

  const bounds = d3.select("#histogram-bounds");

  // Dynamic bar height transition update loop
  bounds.selectAll(".hist-bar")
    .data(updatedBins)
    .join("rect")
      .transition()
      .duration(500)
      .ease(d3.easeCubicOut)
      .attr("y", d => yScale(d.length))
      .attr("height", d => innerHeight - yScale(d.length));

  // Re-adjust only the left axis line labels smoothly to match updated bounds
  bounds.select(".y-axis")
    .transition()
    .duration(400)
    .call(d3.axisLeft(yScale).ticks(6));
}


// ========================================================
// EXERCISE 6.2: SCATTERPLOT TOOLTIP INTERACTION METHODS
// ========================================================
let tooltipGroup, tooltipRect, tooltipTextLine1, tooltipTextLine2;

function createTooltip() {
  tooltipGroup = d3.select("#scatterplot-bounds")
    .append("g")
    .attr("id", "chart-tooltip")
    .style("opacity", 0)
    .style("pointer-events", "none");

  tooltipRect = tooltipGroup.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 6)
    .style("fill", "#0f172a")
    .style("opacity", 0.95);

  tooltipTextLine1 = tooltipGroup.append("text")
    .attr("x", 12)
    .attr("y", 18)
    .style("font-family", "sans-serif")
    .style("font-size", "11px")
    .style("font-weight", "bold")
    .style("fill", "#ffffff");

  tooltipTextLine2 = tooltipGroup.append("text")
    .attr("x", 12)
    .attr("y", 32)
    .style("font-family", "sans-serif")
    .style("font-size", "10px")
    .style("fill", "#94a3b8");
}

function handleMouseEvents() {
  d3.select("#scatterplot-bounds").selectAll(".dot")
    .on("mouseenter", function(event, d) {
      const currentCircle = d3.select(this);
      const cx = parseFloat(currentCircle.attr("cx"));
      const cy = parseFloat(currentCircle.attr("cy"));
      
      const techType = currentCircle.attr("data-tech");
      const screenSize = currentCircle.attr("data-size");
      const brandName = currentCircle.attr("data-brand");

      currentCircle.transition()
        .duration(80)
        .attr("r", 8)
        .style("opacity", 1);

      tooltipTextLine1.text(brandName.toUpperCase());
      tooltipTextLine2.text(`Size: ${screenSize}" | Tech: ${techType}`);

      // Offset position above dot node marker element safely
      const tooltipX = cx - (tooltipWidth / 2);
      const tooltipY = cy - tooltipHeight - 10;

      tooltipGroup
        .attr("transform", `translate(${tooltipX}, ${tooltipY})`)
        .transition()
        .duration(100)
        .style("opacity", 1);
    })
    .on("mouseleave", function(event, d) {
      d3.select(this).transition()
        .duration(100)
        .attr("r", 5)
        .style("opacity", 0.5);

      tooltipGroup.transition()
        .duration(100)
        .style("opacity", 0);
    });
}