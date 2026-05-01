Exercise 3 – Data Story: TV Energy Consumption
Overview
In this exercise, I have developed a data story focused on the Australian television market. By analyzing the relationship between screen technology and power usage, this project transforms raw technical data into an actionable guide for consumers and regulators.

Data Story
Audience
The target audience for this visualisation is the budget-conscious Australian consumer and environmentally aware homeowners. They care about:

Reducing their quarterly electricity bills.
Understanding if "Newer" technology actually means "More Efficient."
Identifying which TV types are the most common (and therefore easiest to find) versus which are the most efficient.


Story Overview: "The Efficiency vs. Popularity Gap"
This narrative explores the tension between what is popular in the market and what is best for the environment.
The Landscape: We identify that LED technology is the most frequent choice available to Australians.
The Efficiency Shift: We then reveal that while LED is common, OLED technologies are the leaders in energy efficiency.
The Verdict: The story concludes that consumers should look beyond the purchase price, as more frequent technologies may have higher long-term "hidden" energy costs.


About the Data
Data Source
The dataset consists of television energy ratings and specifications registered for the Australian market (sourced from the Energy Rating Australia dataset).

Data Processing
Using KNIME Analytics Platform, the following steps were taken:

Filtering: Filtering out duplicated columns and values.

Cleaning: Handled null values in the "Power Consumption" column to avoid skewing averages.

Aggregation: Used a GroupBy node to count the frequency of each Screen Tech and power usage (kWh/year) for each technology group.

Privacy
The dataset contains only public product specifications. No personal identifying information (PII), consumer purchase history, or location data is included.

Accuracy and Limitations
Lab vs. Reality: Energy ratings are based on standardized manufacturer testing. Real-world usage (e.g., high brightness settings, gaming, or leaving the TV on "Standby") may result in higher consumption.

Sample Size: Some newer technologies (like Micro-LED) have fewer data points compared to standard LED, which may affect the statistical average.

Ethics
This project adheres to ethical visualization by:

Avoiding Brand Bias: Insights are grouped by technology type rather than manufacturer name.

Honest Scaling: All Y-axes on charts start at zero to avoid exaggerating small differences in energy usage.

AI Declaration
Tool Used: Gemini (Flash 3)
Nature of Assistance:

Code Architecture: Assisted in structuring the dynamic MapsTo function in script.js to handle data-heavy content.
Human Validation: I performed all data manipulation in KNIME, selected the specific research questions and created the storyboard.

Website Storytelling
The website has been updated from a simple product gallery to a Data Narrative:

Visualisation 1: A Bar Chart identifying LED as the most frequent technology.
Visualisation 2: A comparative analysis showing that OLED/Mini-LED offers lower average consumption despite being a "premium" technology.
Contextual Text: Each chart is accompanied by an "Insight Box" that explains the "So What?" for the reader, ensuring the data is accessible to non-technical users.