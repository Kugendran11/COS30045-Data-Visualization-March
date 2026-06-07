// Step 5 Global Application Constant Framework

// 1. Dufour & Meeks Matrix Margin Positioning Model
const chartWidth = 720;
const chartHeight = 400;

const margin = { top: 30, right: 30, bottom: 50, left: 60 };
const innerWidth = chartWidth - margin.left - margin.right;
const innerHeight = chartHeight - margin.top - margin.bottom;

// 2. Color Theme Variable Mappings
const bodyBackgroundColor = "#f8fafc"; // Matches page background to create crisp separation between histogram bars
const barPrimaryColor = "#3b82f6";

// 3. Step 7.2 Data Structures for Filter Labels and Interaction Toggles
const filters_screen = [
  { id: "all", label: "All Technologies", isActive: true },
  { id: "LED", label: "LED Displays", isActive: false },
  { id: "LCD", label: "LCD Displays", isActive: false },
  { id: "OLED", label: "OLED Displays", isActive: false }
];

// 4. Step 6.2 Global Bin Generator Core Engine Function Configuration
// Setting up our bin generator here lets us reuse it for our data filtering updates
const binGenerator = d3.bin()
  .value(d => d.energyConsumption) // Targets numerical evaluation row metric
  .thresholds(25); // Controls bin resolution and grouping distribution patterns