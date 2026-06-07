##  Generative AI Declaration

In compliance with academic integrity guidelines, Generative AI tools (Gemini) were used transparently as an interactive debugging and development assistant for Exercise 6.

###  Scope of AI Assistance
* **Dynamic Type Cleaning & Auto-Detection:** Assisted in diagnosing text-to-number type-casting bugs (`NaN` parsing errors) by writing a runtime column auto-detector to map inconsistent dataset variables.
* **Lifecycle & Order Optimization:** Guided the modular script load sequence optimizations across decoupled code files (`shared-constants.js` ➡️ `chart.js` ➡️ `interactions.js` ➡️ `app.js`) to handle asynchronous D3 data-loading correctly.
* **Layout Mathematics:** Helped implement the loops index offset ($idx \times 25$) to fix overlapping labels inside the interactive scatterplot legend.

###  Original Work Affirmation
The interactive event-handling workflows, color scheme choices for data classifications (LED, LCD, OLED), layout arrangements, tooltips implementation, and final functional testing steps were conceptualized and driven entirely by myself.