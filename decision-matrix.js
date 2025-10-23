// decision-matrix.js

document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[type="radio"]');
  const scoreDisplay = document.getElementById('score');
  const resultBox = document.getElementById('result');

  if (!radios.length) return; // Exit if not on matrix page

  radios.forEach(radio => {
    radio.addEventListener('change', calculateScore);
  });

  function calculateScore() {
    let total = 0;
    const selectedGroups = new Set();

    radios.forEach(radio => {
      if (radio.checked) {
        total += parseInt(radio.dataset.points);
        selectedGroups.add(radio.name);
      }
    });

    const allGroups = new Set([...document.querySelectorAll('input[type="radio"]')].map(r => r.name));
    const complete = selectedGroups.size === allGroups.size;

    scoreDisplay.textContent = `Current Score: ${total} points`;
    if (complete) showResult(total);
    else resultBox.style.display = 'none';
  }

function showResult(score) {
  let impact, decision, communication, audience, templateLink;

  if (score >= 8 && score <= 12) {
    impact = "Low (8–12 pts)";
    decision = "VA decides unilaterally";
    communication = `
      • FYI Only<br>
      • Email Notice<br>
      • Safety Huddle
    `;
    audience = "Unit Managers, SC Ops, Educators";
    templateLink = "templates/low-impact-template.docx";
  } else if (score >= 13 && score <= 18) {
    impact = "Moderate (13–18 pts)";
    decision = "VA + SME Input";
    communication = `
      • FYI Only<br>
      • Email Notice<br>
      • Safety Huddle<br>
      • Product Flyer<br>
      • Targeted SME engagement<br>
      • Regional updates<br>
      • Education rollout
    `;
    audience = "Regional CNOs, Quality, SMEs";
    templateLink = "templates/moderate-impact-template.docx";
  } else if (score >= 19 && score <= 24) {
    impact = "High (19–24 pts)";
    decision = "Clinical Expert Review";
    communication = `
      • FYI Only<br>
      • Email Notice<br>
      • Safety Huddle<br>
      • Product Flyer<br>
      • Targeted SME engagement<br>
      • Regional updates<br>
      • Education rollout<br>
      • Governance approval<br>
      • Formal rollout<br>
      • System-wide training
    `;
    audience = "CNO/COO Council, Physicians, Execs, Quality";
    templateLink = "templates/high-impact-template.docx";
  }

  resultBox.innerHTML = `
    <h3>Decision Output</h3>
    <p><strong>Impact Level:</strong> ${impact}</p>
    <p><strong>Decision Level:</strong> ${decision}</p>
    <p><strong>Communication:</strong><br>${communication}</p>
    <p><strong>Audience:</strong> ${audience}</p>
    <p><strong>Templates:</strong> 
      <a href="${templateLink}" download style="color:#9d47ff; text-decoration:none; font-weight:bold;">
        Download Template
      </a>
    </p>
  `;
  resultBox.style.display = 'block';
}

  window.resetMatrix = function() {
    radios.forEach(r => (r.checked = false));
    scoreDisplay.textContent = "Current Score: 0 points";
    resultBox.style.display = 'none';
  };
});
