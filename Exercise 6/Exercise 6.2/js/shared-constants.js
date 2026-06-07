// shared-constants.js
const chartWidth = 720;
const chartHeight = 350;
const margin = { top: 30, right: 30, bottom: 50, left: 60 };
const innerWidth = chartWidth - margin.left - margin.right;
const innerHeight = chartHeight - margin.top - margin.bottom;

const bodyBackgroundColor = "#f8fafc";
const barPrimaryColor = "#3b82f6";

const filters_screen = [
  { id: "all", label: "All Technologies", isActive: true },
  { id: "LED", label: "LED Displays", isActive: false },
  { id: "LCD", label: "LCD Displays", isActive: false },
  { id: "OLED", label: "OLED Displays", isActive: false }
];

const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .thresholds(25);

// SCATTERPLOT GEOMETRY
const chartWidthS = 720;
const chartHeightS = 380;
const marginS = { top: 40, right: 140, bottom: 50, left: 60 };
const innerWidthS = chartWidthS - marginS.left - marginS.right;
const innerHeightS = chartHeightS - marginS.top - marginS.bottom;

let innerChartS, xScaleS, yScaleS, colorScaleS;
const tooltipWidth = 140;
const tooltipHeight = 45;