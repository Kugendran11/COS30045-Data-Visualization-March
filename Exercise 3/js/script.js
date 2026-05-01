function navigateTo(page) {
  const content = document.getElementById("content");

  // Fade out
  content.style.opacity = 0;

  setTimeout(() => {
    // Reset active nav links
    document.querySelectorAll("nav ul li a").forEach(link => link.classList.remove("active"));

    if (page === "home") {
      document.getElementById("nav-home").classList.add("active");
      content.innerHTML = `
        <div class="container">
          <h1>Welcome to Power Appliances</h1>
          <p>Learn about energy-efficient appliances in the Australian market. 
          Energy efficiency helps reduce electricity bills and environmental impact.</p>
        </div>
      `;
    } 

    else if (page === "televisions") {
      document.getElementById("nav-televisions").classList.add("active");
      content.innerHTML = `
        <div class="data-story">
          <h1>The Australian TV Landscape: A Power Struggle</h1>
          <p class="intro-text">
            As energy prices rise in 2026, choosing a TV is no longer just about screen size, it's about the technology and the sustainability of the TV. 
            We analyzed market data to find the sweet spot between popularity and efficiency.
          </p>

          <hr>

          <div class="story-block">
            <h2>1. What's currently available?</h2>
            <p>First, we looked at the variety of screen technologies available in Australia to identify the most frequent types.</p>
            
            <div class="viz-container">
              <img src="images/ScreenTech and Count.png" alt="Bar chart showing frequency of TV technologies">
            </div>

            <div class="insight-box">
              <strong>The Insight:</strong> LED technology remains the dominant force in the Australian market due to its affordability. 
              <strong>LCD</strong> has been going down the market as well but is still more dominant than the more premium OLED. 
              However, premium technologies like <strong>OLED</strong> are rapidly gaining a foothold as consumers seek better picture quality.
            </div>
          </div>

          <div class="story-block">
            <h2>2. Which technology saves you more?</h2>
            <p>Does the most popular technology also happen to be the most efficient? We compared the average power consumption across all 3 types.</p>
            
            <div class="viz-container">
              <img src="images/ScreenTech and Power Usage.png" alt="Chart comparing energy consumption by tech">
            </div>

            <div class="insight-box">
              <strong>The Insight:</strong> Despite being "premium," <strong>OLED</strong> models often demonstrate superior efficiency 
              ratios compared to older, large-format LED and LCD panels. Choosing these can lead to significant savings on annual electricity bills.
            </div>
          </div>

          <div class="conclusion-block">
            <h3>The Verdict</h3>
            <p>If you're shopping in 2026, don't just look at the price tag. While LED is the most <em>frequent</em> choice, 
            an OLED might be the most <em>financially responsible</em> choice over the lifespan of the appliance.</p>
          </div>
        </div>
      `;
    } 

    else if (page === "about") {
      document.getElementById("nav-about").classList.add("active");
      content.innerHTML = `
        <div class="container">
          <h1>About Us</h1>
          <p>We provide information on appliance energy consumption in the Australian market.</p>
          <p>Our goal is to help households choose efficient products that save money and protect the environment.</p>
        </div>
      `;
    }

    // Fade in
    content.style.opacity = 1;

  }, 200);
}

// Setup event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nav-home").addEventListener("click", () => navigateTo("home"));
  document.getElementById("nav-televisions").addEventListener("click", () => navigateTo("televisions"));
  document.getElementById("nav-about").addEventListener("click", () => navigateTo("about"));
  document.getElementById("logo").addEventListener("click", () => navigateTo("home"));

  // Default page
  navigateTo("home");

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
});