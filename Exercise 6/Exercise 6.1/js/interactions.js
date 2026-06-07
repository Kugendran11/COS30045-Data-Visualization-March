// Step 7 Interactive Events & Dom Transformation Controllers Engine
function populateFilters(dataset) {
  const filterSection = d3.select("#filter-panel");
  
  // 7.3 Data Join: Bind our state arrays to interactive control elements
  filterSection.selectAll(".filter-btn")
    .data(filters_screen)
    .join("button")
      .attr("class", d => d.isActive ? "filter-btn active" : "filter-btn")
      .text(d => d.label)
      .on("click", function(event, activeRecord) {
        
        // Loop through all records to set toggle flags
        filters_screen.forEach(item => {
          item.isActive = (item.id === activeRecord.id);
        });

        // Toggle CSS class presentation on active controls immediately
        filterSection.selectAll(".filter-btn")
          .attr("class", d => d.isActive ? "filter-btn active" : "filter-btn");

        // Execute step 7.4 runtime calculation handler engine
        updateHistogram(activeRecord.id, dataset);
      });
}

// 7.4 Runtime Data Slicing & Visual Transition Updates
function updateHistogram(selectedTechId, dataset) {
  // Filter data based on selected category state logic rules
  const updatedData = (selectedTechId === "all") 
    ? dataset 
    : dataset.filter(row => row.screenTech === selectedTechId);

  // Recalculate values into new bins using our bin mapping utility
  const updatedBins = binGenerator(updatedData);

  // Regenerate dynamic coordinate domain bounds
  const xScale = d3.scaleLinear()
    .domain([updatedBins[0].x0, updatedBins[updatedBins.length - 1].x1])
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(updatedBins, d => d.length)])
    .range([innerHeight, 0])
    .nice();

  // Reference the existing inner canvas geometry container
  const bounds = d3.select("#chart-bounds");

  // Re-bind calculations to our visible bars using a smooth transitional ease animation
  bounds.selectAll(".hist-bar")
    .data(updatedBins)
    .join("rect")
      .transition() // Instantiates animation loop interpolation transitions
      .duration(650) // Duration measured in milliseconds
      .ease(d3.easeCubicOut) // Smooth entry animation speed curve configuration
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
      .attr("height", d => innerHeight - yScale(d.length));

  // Re-render and smoothly transition your axes scales to update the layout values automatically
  bounds.selectAll(".axis-line").remove();
  
  bounds.append("g")
    .attr("class", "axis-line")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale).ticks(8));

  bounds.append("g")
    .attr("class", "axis-line")
    .call(d3.axisLeft(yScale).ticks(6));
}