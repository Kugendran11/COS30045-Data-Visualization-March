// Step 4 Async Initialization Controller Runtime Core Engine Pipeline
(function() {
  // Global Application Cache Memory Reference Object
  let masterInventoryDataset = [];

  d3.csv("data/Ex6_TVdata.csv", d => {
    // Explicit row parsing and casting conversion layer
    return {
      brand: d.brand,
      model: d.model,
      starRating: +d.starRating,
      screenTech: d.screenTech,
      energyConsumption: +d.energyConsumption
    };
  }).then(cleanedRows => {
    // Save to our application dataset state
    masterInventoryDataset = cleanedRows;
    
    // Console log check verifying successful execution
    console.log("🚀 Data Pipeline Verification: Rows Imported Successfully", masterInventoryDataset.length);

    // Initial load: Draw components using all loaded records
    drawHistogram(masterInventoryDataset);
    populateFilters(masterInventoryDataset);

  }).catch(err => {
    console.error("🛑 App Bootstrapping Exception: Data Import Failure", err);
  });
})();