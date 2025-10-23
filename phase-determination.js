// phase-determination.js

document.addEventListener('DOMContentLoaded', () => {
  const mockData = {
    "42293500": { 
      phase: "Phase 1–2 (Low Impact)", 
      description: "Basic supplies with minimal patient outcome impact.",
      color: "#36d1dc"
    },
    "42172001": { 
      phase: "Phase 3 (Moderate Risk)", 
      description: "Moderate clinical impact devices used in patient care.",
      color: "#f7b733"
    },
    "42242002": { 
      phase: "Phase 4 (High Risk / Outcome-Sensitive)", 
      description: "Critical-use products requiring expert validation and oversight.",
      color: "#ff512f"
    }
  };

  const input = document.getElementById("unspcInput");
  const btn = document.getElementById("lookupBtn");
  const resultBox = document.getElementById("lookupResult");

  if (!btn) return; // Exit if not on this page
  
  btn.addEventListener("click", () => {
    const code = input.value.trim();
    const data = mockData[code];
    
    if (data) {
      resultBox.innerHTML = `
        <h3 style="color:${data.color}">Lookup Result</h3>
        <p><strong>UNSPC Code:</strong> ${code}</p>
        <p><strong>Clinical Phase:</strong> <span style="color:${data.color}">${data.phase}</span></p>
        <p><strong>Description:</strong> ${data.description}</p>
      `;
    } else {
      resultBox.innerHTML = `<p style="color:#ff7373;">No match found for UNSPC Code: ${code}</p>`;
    }
    resultBox.classList.add("visible");
  });
});
