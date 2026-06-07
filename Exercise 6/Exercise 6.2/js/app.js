// js/app.js
(function() {
  let masterInventoryDataset = [];

  d3.csv("data/Ex6_TVdata.csv").then(function(rawRows) {
    if (!rawRows || rawRows.length === 0) {
      console.error("🛑 CSV file loaded but contains no rows.");
      return;
    }

    // Dynamic key auto-detector
    const firstRowKeys = Object.keys(rawRows[0]);
    
    // Find the closest matching column headers in your specific CSV
    const starKey = firstRowKeys.find(k => /star/i.test(k)) || "star2";
    const energyKey = firstRowKeys.find(k => /energy/i.test(k)) || "energyConsumption";
    const sizeKey = firstRowKeys.find(k => /size|inch/i.test(k)) || "screenSize";
    const techKey = firstRowKeys.find(k => /tech|type/i.test(k)) || "screenTech";
    const brandKey = firstRowKeys.find(k => /brand/i.test(k)) || "brand";
    const modelKey = firstRowKeys.find(k => /model/i.test(k)) || "model";

    console.log("📊 Auto-Detected CSV Column Mapping:");
    console.log(` -> Stars mapped from column: "${starKey}"`);
    console.log(` -> Energy mapped from column: "${energyKey}"`);
    console.log(` -> Size mapped from column: "${sizeKey}"`);
    console.log(` -> Tech mapped from column: "${techKey}"`);

    // Clean and transform the dataset using the auto-detected columns
    masterInventoryDataset = rawRows.map(function(d) {
      return {
        brand: d[brandKey] ? String(d[brandKey]).trim() : "Unknown",
        model: d[modelKey] ? String(d[modelKey]).trim() : "Unknown",
        screenTech: d[techKey] ? String(d[techKey]).trim() : "LED",
        starRating: d[starKey] ? parseFloat(String(d[starKey]).replace(/[^0-9.]/g, '')) || 0 : 0,
        energyConsumption: d[energyKey] ? parseFloat(String(d[energyKey]).replace(/[^0-9.]/g, '')) || 0 : 0,
        screenSize: d[sizeKey] ? parseFloat(String(d[sizeKey]).replace(/[^0-9.]/g, '')) || 0 : 0
      };
    });

    console.log("🚀 Rows Processed Successfully =", masterInventoryDataset.length);
    console.log("📝 Processed Row 1 Sample Data:", masterInventoryDataset[0]);

    // Execute drawing updates sequentially
    drawHistogram(masterInventoryDataset);
    populateFilters(masterInventoryDataset);
    
    drawScatterplot(masterInventoryDataset);
    createTooltip();
    handleMouseEvents();

  }).catch(function(err) {
    console.error("🛑 App Bootstrapping Exception: Data Import Failure", err);
  });
})();