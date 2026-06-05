document.addEventListener("DOMContentLoaded", () => {
  
  // Setup dynamic footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const contentArea = document.getElementById("content");

  // SPA View Layout Templates
  const views = {
    home: `
      <section>
        <h1>Welcome to Power Appliances</h1>
        <p>Explore our insights into appliance energy consumption. Click on the <strong>Televisions</strong> tab to see our responsive D3 chart setup!</p>
      </section>
    `,
    televisions: `
      <section>
        <h1>Television Energy Data Analysis</h1>
        <p>This section explores how screen technologies scale up your electric bill.</p>
        
        <div class="responsive-svg-container"></div>
      </section>
    `,
    about: `
      <section>
        <h2>About This Project</h2>
        <p>This data story is designed for COS30045, created by Kugendran with generative AI support.</p>
      </section>
    `
  };

  // View Switcher Function
  function switchView(viewName) {
    contentArea.innerHTML = views[viewName] || views.home;
    
    contentArea.classList.remove("fade-in");
    void contentArea.offsetWidth; 
    contentArea.classList.add("fade-in");

    if (viewName === 'televisions') {
      runD3Code();
    }
  }

  // ==========================================
  // EXERCISE 4.3 & 4.4: CORE CANVAS AND DATA INITIALIZATION
  // ==========================================
  function runD3Code() {
    
    // Create responsive SVG canvas wrapper
    const svg = d3.select(".responsive-svg-container")
      .append("svg")
        .attr("viewBox", "0 0 1200 500") 
        .style("border", "1px solid #ccc")
        .style("background-color", "#ffffff");

    // Parse your unique Screen Tech headers dynamically
    d3.csv("data/data.csv", d => {
      return {
        tech: d.screenTech,                 // Categorical string header mapping
        count: +d["Count*(Submit_ID)"]       // Special characters handled via brackets; '+' converts text numbers to digits
      };
    }).then(data => {
      
      // Sort array data in descending order (LED -> LCD -> OLED)
      data.sort((a, b) => b.count - a.count);

      // Trigger the graphic renderer module and hand off our data array
      createBarChart(data, svg);
    })
    .catch(error => {
      console.error("Error reading or processing your local CSV data resource:", error);
    });
  }

  // ==========================================
  // EXERCISE 4.6 & 4.7: SCALED GROUP DATA BINDING WITH LABELS
  // ==========================================
  const createBarChart = (data, svg) => {
    
    // Set up layout boundaries and padding margins
    const margin = { top: 60, right: 100, bottom: 40, left: 140 };
    const chartWidth = 1200 - margin.left - margin.right;  // Proportional drawing zone width (1020px)
    const chartHeight = 500 - margin.top - margin.bottom;  // Proportional drawing zone height (400px)

    // --- EXERCISE 4.6 STEP 1: Linear Scale for X-Axis (Values) ---
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)]) // Data domain limits: [0, 3470]
      .range([0, chartWidth]);                 // Pixel range footprint: [0, 1020]

    // --- EXERCISE 4.6 STEP 2: Band Scale for Y-Axis (Categories) ---
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.tech))           // Categories array keys: ["LED", "LCD", "OLED"]
      .range([0, chartHeight])                 // Evenly maps rows across our 400px space
      .padding(0.3);                           // 30% spacing padding gaps between rows

    // --- EXERCISE 4.7 STEP 2: Create Group Elements (`<g>`) to Link Elements Together ---
    const barAndLabel = svg.selectAll("g.bar-group")
      .data(data)
      .join("g")
      .attr("class", "bar-group")
      // Shift each group folder vertically down the page layout based on its categorical row placement
      .attr("transform", d => `translate(0, ${margin.top + yScale(d.tech)})`);

    // --- EXERCISE 4.7 STEP 3: Append the Data Rectangles into the Groups ---
    barAndLabel.append("rect")
      .attr("class", d => `bar bar-${d.tech}`)
      .attr("x", margin.left)                 // Standard alignment against left chart margin
      .attr("y", 0)                           // 0 because vertical position layout is managed by group translation!
      .attr("width", d => xScale(d.count))    // Compresses 3470 safely to look beautifully scaled inside our boundaries
      .attr("height", yScale.bandwidth());    // Automatically captures proportional band thickness allocation

    // --- EXERCISE 4.7 STEP 4: Append Category Text Labels (Left Hand Side) ---
    barAndLabel.append("text")
      .attr("class", "category-label")
      .text(d => d.tech)
      .attr("x", margin.left - 15)            // Places labels 15px to the left of the bar starting blocks
      .attr("y", yScale.bandwidth() / 2)      // Centers labels vertically relative to row heights
      .attr("dy", "0.35em")                   // Typographic offset calibration for balancing baseline axes
      .attr("text-anchor", "end")             // Right-aligns strings cleanly against the bar chart line
      .style("font-family", "sans-serif")
      .style("font-size", "16px");

    // --- EXERCISE 4.7 STEP 5: Append Data Numeric Value Markers (Right Hand Side) ---
    barAndLabel.append("text")
      .attr("class", "value-label")
      .text(d => d.count.toLocaleString())    // Applies commas to numbers (e.g., 3,470)
      .attr("x", d => margin.left + xScale(d.count) + 12) // Places values 12px past the end tip of each bar
      .attr("y", yScale.bandwidth() / 2)      // Centers values vertically relative to row heights
      .attr("dy", "0.35em")                   
      .attr("text-anchor", "start")           // Left-aligns values so numbers build out to the right
      .style("font-family", "sans-serif")
      .style("font-size", "14px");

    console.log("Lab 4 complete: Labeled and Scaled data visualizations fully configured.");
  };

  // Link Event Listeners to handle tab routing
  document.getElementById("nav-home").addEventListener("click", () => switchView("home"));
  document.getElementById("logo").addEventListener("click", () => switchView("home"));
  document.getElementById("nav-televisions").addEventListener("click", () => switchView("televisions"));
  document.getElementById("nav-about").addEventListener("click", () => switchView("about"));

  // Open Home view immediately on landing
  switchView("home");
});