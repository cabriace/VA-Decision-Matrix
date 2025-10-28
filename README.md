# 📝 VA Decision Matrix

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) [![Python Version](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)

VA Decision Matrix is a simple tool to help evaluate and compare VA (Veterans Affairs) options using a structured decision matrix. This project allows you to assign weights to criteria, score multiple VA options, calculate weighted totals, and see ranked results to make informed decisions. Ideal for veterans, advisors, or analysts who want a systematic and transparent way to compare options.  

## ✨ Features
- ✅ Assign and customize weights for decision criteria  
- ✅ Score multiple VA options  
- ✅ Automatically calculate weighted totals  
- ✅ Clear ranking of options for easy decision-making  
- ✅ Lightweight, easy to use, no dependencies  

## 🚀 Installation
1. Clone the repository:  
```bash
git clone https://github.com/yourusername/va-decision-matrix.git
```
2. Navigate to the project folder:  
```bash
cd va-decision-matrix
```
3. Run the main script (Python example):  
```bash
python main.py
```
*No extra dependencies required.*  

## 🖥️ Usage
1. Open the script or application.  
2. Enter your VA options and decision criteria.  
3. Assign weights to each criterion.  
4. Score each option.  
5. Run the calculation to get weighted totals and rankings.  

Example (Python pseudo-code):  
```python
matrix = DecisionMatrix(criteria=["Benefit", "Accessibility", "Cost"])
matrix.add_option("Option A", scores=[8, 7, 6])
matrix.add_option("Option B", scores=[9, 5, 7])
matrix.calculate()
matrix.show_results()
```

## 🤝 Contributing
Contributions are welcome! Fork the repo, make your changes, and submit a pull request. Bug reports and feature suggestions are appreciated.  

## ⚖️ License
This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.

## 👤 Author
Cesar Cabriales
