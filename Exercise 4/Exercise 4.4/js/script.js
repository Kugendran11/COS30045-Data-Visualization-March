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
  // EXERCISE 4.4: LOADING & PARSING CSV DATA
  // ==========================================
  function runD3Code() {
    
    // Base canvas setup from Ex 4.3
    const svg = d3.select(".responsive-svg-container")
      .append("svg")
        .attr("viewBox", "0 0 1200 1600")
        .style("border", "1px solid black")
        .style("background-color", "#ffffff");

    // Blueprint test rect from Ex 4.3
    svg.append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr("width", 414)
        .attr("height", 16)
        .attr("fill", "blue");

    // --- STEP 1 & 2: Load and Clean CSV Data ---
    // Note: Path points to "data/tvBrandCount.csv" relative to index.html
    d3.csv("data/data.csv", d => {
      return {
        brand: d.brand,        // Keeps categorical brand name as text string
        count: +d.count        // The "+" converts the string numbers into actual numbers
      };
    }).then(data => {
      
      // JavaScript Array Sorting (Descending order: Highest value to Lowest value)
      // Sorting makes our eventual bar chart significantly easier to read and analyze
      data.sort((a, b) => b.count - a.count);

      // --- STEP 3: Dataset Analytics Summary in Browser Console ---
      console.log("=== Cleaned & Sorted Dataset ===");
      console.log(data);
      
      console.log("=== Dataset Statistics ===");
      console.log("Total Records (Length):", data.length);
      console.log("Maximum Value:", d3.max(data, d => d.count));
      console.log("Minimum Value:", d3.min(data, d => d.count));
      console.log("Value Range extent ([min, max]):", d3.extent(data, d => d.count));

      // Pass the fully loaded, clean data forward to our visualization function
      createBarChart(data, svg);
    })
    .catch(error => {
      console.error("Error parsing or locating your CSV file:", error);
    });
  }

  // ==========================================
  // MODULE FOR CHART GENERATION (PREVIEW FOR EX 4.5)
  // ==========================================
  const createBarChart = (data, svg) => {
    console.log("createBarChart function successfully triggered with data ready to bind!");
    // Your subsequent data mapping and dynamic bar charts will live inside here for Exercise 4.5!
  };

  // Link Event Listeners to handle tab routing
  document.getElementById("nav-home").addEventListener("click", () => switchView("home"));
  document.getElementById("logo").addEventListener("click", () => switchView("home"));
  document.getElementById("nav-televisions").addEventListener("click", () => switchView("televisions"));
  document.getElementById("nav-about").addEventListener("click", () => switchView("about"));

  // Open Home view immediately on landing
  switchView("home");
});