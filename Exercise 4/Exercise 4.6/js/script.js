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
  // EXERCISE 4.3 & 4.4: CANVAS AND DATA FETCHING
  // ==========================================
  function runD3Code() {
    
    // Step 2 (Ex 4.3): Create responsive SVG canvas wrapper
    // Standardizing dimensions to a clean 1200x500 box layout
    const svg = d3.select(".responsive-svg-container")
      .append("svg")
        .attr("viewBox", "0 0 1200 500") 
        .style("border", "1px solid black")
        .style("background-color", "#ffffff");

    // Step 1 & 2 (Ex 4.4): Parse Screen Tech data rows
    d3.csv("data/data.csv", d => {
      return {
        tech: d.screenTech,                 
        count: +d["Count*(Submit_ID)"]       
      };
    }).then(data => {
      
      // Sort array data in descending order (LED -> LCD -> OLED)
      data.sort((a, b) => b.count - a.count);

      // Trigger the graphics renderer and hand off data and canvas references
      createBarChart(data, svg);
    })
    .catch(error => {
      console.error("Error reading or processing your local CSV data resource:", error);
    });
  }

  // ==========================================
  // EXERCISE 4.6: D3 TRANSLATION SCALES APPLICATION
  // ==========================================
  const createBarChart = (data, svg) => {
    
    // Set up standard chart padding margins
    // Left and bottom padding blocks leave space for future text labels and ticks (Ex 4.7)
    const margin = { top: 40, right: 60, bottom: 60, left: 120 };
    const chartWidth = 1200 - margin.left - margin.right;  // Width available for drawing bars (1020px)
    const chartHeight = 500 - margin.top - margin.bottom;  // Height available for drawing bars (400px)

    // --- STEP 1: Linear Scale for X-Axis (Quantitative Values) ---
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)]) // Data domain limits: [0, 3470]
      .range([0, chartWidth]);                 // Pixel range map: [0, 1020]

    // --- STEP 2: Band Scale for Y-Axis (Categorical Data labels) ---
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.tech))           // Categories: ["LED", "LCD", "OLED"]
      .range([0, chartHeight])                 // Distributes across our 400px chart space
      .padding(0.25);                          // Adds a crisp 25% spacing gap between rows

    // Data Join: Bind data rows and draw the scaled rectangles
    svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("class", d => `bar bar-${d.tech}`)
      
      // Coordinate Mapping (Shifting elements right and down into the safe margin grid)
      .attr("x", margin.left) 
      .attr("y", d => margin.top + yScale(d.tech)) 
      
      // Dimension Assignments using translation scale math engines
      .attr("width", d => xScale(d.count))     // Compresses 3470 safely down to fit within the box border
      .attr("height", yScale.bandwidth());     // Grabs automated row height from scaleBand

    console.log("Exercise 4.6 complete: Proportional layout scaling factors applied!");
  };

  // Link Event Listeners to handle tab routing
  document.getElementById("nav-home").addEventListener("click", () => switchView("home"));
  document.getElementById("logo").addEventListener("click", () => switchView("home"));
  document.getElementById("nav-televisions").addEventListener("click", () => switchView("televisions"));
  document.getElementById("nav-about").addEventListener("click", () => switchView("about"));

  // Open Home view immediately on landing
  switchView("home");
});