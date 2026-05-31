document.addEventListener("DOMContentLoaded", () => {
    // 1. Automatically update the footer year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Reference the main content area where data/views will be injected
    const contentArea = document.getElementById("content");

    // 3. Define your views (Home, Televisions, About)
    const views = {
        home: `
            <section class="hero">
                <h1>Welcome to Power Appliances</h1>
                <p>Discover the energy data story behind the appliances you use every day.</p>
            </section>
        `,
        televisions: `
            <section class="data-story">
                <h2>Television Energy Data Analysis</h2>
                <p>Loading dataset for COS30045 Exercise 3...</p>
                </section>
        `,
        about: `
            <section class="about-us">
                <h2>About This Project</h2>
                <p>This data story analyzes appliance energy consumption, created by Kugendran with GenAI assistance.</p>
            </section>
        `
    };

    // 4. Function to switch views with a simple fade-in effect
    function switchView(viewName) {
        contentArea.classList.remove("fade-in-target"); // Reset animation
        
        // Trigger a tiny reflow to restart CSS animation
        void contentArea.offsetWidth; 
        
        contentArea.innerHTML = views[viewName] || views.home;
        contentArea.classList.add("fade-in-target");
    }

    // 5. Event Listeners for Navigation
    document.getElementById("nav-home").addEventListener("click", () => switchView("home"));
    document.getElementById("logo").addEventListener("click", () => switchView("home"));
    document.getElementById("nav-televisions").addEventListener("click", () => switchView("televisions"));
    document.getElementById("nav-about").addEventListener("click", () => switchView("about"));

    // Load the initial home view on page load
    switchView("home");
});