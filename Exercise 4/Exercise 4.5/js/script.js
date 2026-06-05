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
    
    // Step 2 (Ex 4.3): Create responsive SVG canvas wrapper
    // Set to 1200x500 for a perfect landscape presentation box
    const svg = d3.select(".responsive-svg-container")
      .append("svg")
        .attr("viewBox", "0 0 1200 500") 
        .style("border", "1px solid black")
        .style("background-color", "#ffffff");

    // Step 1 & 2 (Ex 4.4): Parse your unique Screen Tech headers dynamically
    d3.csv("data/data.csv", d => {
      return {
        tech: d.screenTech,                 // Maps categorical text row
        count: +d["Count*(Submit_ID)"]       // Bracket notation handles parentheses; '+' maps to integer
      };
    }).then(data => {
      
      // Sort array data in descending order (LED (3470) -> LCD (354) -> OLED (271))
      data.sort((a, b) => b.count - a.count);

      // Step 3 (Ex 4.4): Debugging log dashboard in developer tools console
      console.log("=== Cleaned & Sorted Screen Tech Dataset ===");
      console.log(data);
      console.log("=== Dataset Statistics ===");
      console.log("Total Categories:", data.length);
      console.log("Max Count:", d3.max(data, d => d.count));
      console.log("Min Count:", d3.min(data, d => d.count));

      // Trigger the graphic renderer module and hand off our data array
      createBarChart(data, svg);
    })
    .catch(error => {
      console.error("Error reading or processing your local CSV data resource:", error);
    });
  }

  // ==========================================
  // EXERCISE 4.5: DATA BINDING & POSITIONING LAYOUT
  // ==========================================
  const createBarChart = (data, svg) => {
    
    // Grid alignment variable controls
    const barHeight = 50;     // Thicker bars since we only have 3 rows
    const barSpacing = 25;    // Balanced vertical spacing
    const startX = 60;        // Margin space from the left frame
    const startY = 60;        // Margin space from the top frame

    // 1. Data Join: Select and bind your screen tech properties to rect nodes
    svg.selectAll("rect")
      .data(data)
      .join("rect")
      
      // Assign custom structural classes (e.g., class="bar bar-LED")
      .attr("class", d => `bar bar-${d.tech}`)
      
      // 2. Set bar geometry attributes based on parsed values
      .attr("width", d => d.count) // Raw metrics (LED will overflow out of bounds right now!)
      .attr("height", barHeight)
      
      // 3. Dynamic positioning layout alignment 
      .attr("x", startX) // Keeps all bars aligned against our left margin
      
      // Compute vertical placement via array index counter (i)
      .attr("y", (d, i) => startY + i * (barHeight + barSpacing));

    console.log("Exercise 4.5 complete: Dynamic screen technology bars loaded.");
  };

  // Link Event Listeners to handle tab routing
  document.getElementById("nav-home").addEventListener("click", () => switchView("home"));
  document.getElementById("logo").addEventListener("click", () => switchView("home"));
  document.getElementById("nav-televisions").addEventListener("click", () => switchView("televisions"));
  document.getElementById("nav-about").addEventListener("click", () => switchView("about"));

  // Open Home view immediately on landing
  switchView("home");
});