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
        <h1>Welcome to Power Appliances</h1>
        <p>Learn about energy-efficient appliances in the Australian market.
        Energy efficiency helps reduce electricity bills and environmental impact.</p>
      `;
    }

    else if (page === "televisions") {
      document.getElementById("nav-televisions").classList.add("active");
      content.innerHTML = `
        <h1>Energy Consumption in Televisions</h1>
        <p>Modern televisions in Australia now come with star ratings 
        to indicate their energy efficiency.</p>

        <ul>
          <li>LED TVs use less energy</li>
          <li>Larger screens consume more power</li>
          <li>Energy ratings help compare models</li>
        </ul>

        <img src="images/Television.jpg" alt="Television">
      `;
    }

    else if (page === "about") {
      document.getElementById("nav-about").classList.add("active");
      content.innerHTML = `
        <h1>About Us</h1>
        <p>We provide information on appliance energy consumption in the Australian market.</p>
        <p>Our goal is to help households choose efficient products that save money and protect the environment.</p>
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