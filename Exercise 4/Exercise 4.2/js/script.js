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
        <p>Explore our insights into appliance energy consumption. Click on the <strong>Televisions</strong> tab to see D3 data manipulation in action!</p>
      </section>
    `,
    televisions: `
      <section>
        <h1 id="tv-heading">Television Energy Data Analysis</h1>
        <p>This section explores how screen technologies scale up your electric bill.</p>
        
        <div id="info-box" class="info-box"></div>
        
        <div class="chart-container">
          <h3>D3 Generated Geometric Element</h3>
          <svg id="d3-canvas" width="500" height="150" style="background-color: #fcfcfc; border: 1px dashed #eee;"></svg>
        </div>
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
    // Injects the markup block matching the view key
    contentArea.innerHTML = views[viewName] || views.home;
    
    // Clear and restart the appearance transitions
    contentArea.classList.remove("fade-in");
    void contentArea.offsetWidth; 
    contentArea.classList.add("fade-in");

    // Execute Exercise 4.2 D3 actions only when elements exist inside the DOM
    if (viewName === 'televisions') {
      runD3Code();
    }
  }

  // ==========================================
  // EXERCISE 4.2 D3 MANIPULATION WORKFLOW
  // ==========================================
  function runD3Code() {
    
    // Step 2: Select an HTML element using D3 and modify styles
    d3.select("#tv-heading")
      .style("color", "#27ae60"); // Sets the header color to an emerald green

    // Step 3: Select an element, append a child, and apply text content
    d3.select("#info-box")
      .append("p")
      .text("Purchasing a low energy consumption TV will help with your energy bills!");

    // Step 4: Targets your canvas element, appends an SVG rect element, and applies shape attributes
    d3.select("#d3-canvas")
      .append("rect")
      .attr("x", 40)
      .attr("y", 45)
      .attr("width", 220)
      .attr("height", 60)
      .style("fill", "#2ecc71")
      .style("stroke", "#27ae60")
      .style("stroke-width", "3px");
  }

  // Link Event Listeners to handle tab routing
  document.getElementById("nav-home").addEventListener("click", () => switchView("home"));
  document.getElementById("logo").addEventListener("click", () => switchView("home"));
  document.getElementById("nav-televisions").addEventListener("click", () => switchView("televisions"));
  document.getElementById("nav-about").addEventListener("click", () => switchView("about"));

  // Open Home view immediately on landing
  switchView("home");
});