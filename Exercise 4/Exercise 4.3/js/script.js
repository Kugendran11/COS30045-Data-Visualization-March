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
    // Injects the markup block matching the view key
    contentArea.innerHTML = views[viewName] || views.home;
    
    // Clear and restart the appearance transitions
    contentArea.classList.remove("fade-in");
    void contentArea.offsetWidth; 
    contentArea.classList.add("fade-in");

    // Execute Exercise 4.3 D3 actions only when elements exist inside the DOM
    if (viewName === 'televisions') {
      runD3Code();
    }
  }

  // ==========================================
  // EXERCISE 4.3 D3 SET UP ENGINE
  // ==========================================
  function runD3Code() {
    
    // Step 2: Create svg object within the new responsive container using D3
    const svg = d3.select(".responsive-svg-container")
      .append("svg")
        .attr("viewBox", "0 0 1200 1600")
        .style("border", "1px solid black")
        .style("background-color", "#ffffff"); // Kept white to view layout boundaries easily

    // Step 3: Add a test svg rectangle
    svg.append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr("width", 414)
        .attr("height", 16)
        .attr("fill", "blue");
  }

  // Link Event Listeners to handle tab routing
  document.getElementById("nav-home").addEventListener("click", () => switchView("home"));
  document.getElementById("logo").addEventListener("click", () => switchView("home"));
  document.getElementById("nav-televisions").addEventListener("click", () => switchView("televisions"));
  document.getElementById("nav-about").addEventListener("click", () => switchView("about"));

  // Open Home view immediately on landing
  switchView("home");
});