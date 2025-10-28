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
  let impact, decision, communication, audience, templates = "";

  if (score >= 8 && score <= 12) {
    impact = "Low (8–12 pts)";
    decision = "VA decides unilaterally";
    communication = `
      • FYI Only<br>
      • Email Notice<br>
      • Safety Huddle
    `;
    templates = `
      <a href="templates/TEMPLATE - MBO Flyer.pptx" download>📄 MBO Flyer Template</a>
    `;
    audience = "Unit Managers, SC Ops, Educators";
  } else if (score >= 13 && score <= 18) {
    impact = "Moderate (13–18 pts)";
    decision = "VA + SME Input";
    communication = `
      • FYI Notice<br>
      • Email Notice<br>
      • Safety Huddle<br>
      • Product Flyer<br>
      • Targeted SME Engagement<br>
      • Regional Updates<br>
      • Education Rollout
    `;
    templates = `
      <a href="templates/TEMPLATE - MBO Flyer.pptx" download>📄 MBO Flyer Template</a><br>
      <a href="templates/TEMPLATE - Product Conversion Flyer.pptx" download>📄 Product Conversion Flyer</a>
    `;
    audience = "Regional CNOs, Quality, SMEs";
  } else if (score >= 19 && score <= 24) {
    impact = "High (19–24 pts)";
    decision = "Clinical Expert Review";
    communication = `
      • FYI Notice<br>
      • Email Notice<br>
      • Safety Huddle<br>
      • Product Flyer<br>
      • Targeted SME Engagement<br>
      • Regional Updates<br>
      • Education Rollout<br>
      • Governance Approval<br>
      • Formal Rollout<br>
      • System-wide Training
    `;
    templates = `
      <a href="templates/TEMPLATE - MBO Flyer.pptx" download>📄 MBO Flyer Template</a><br>
      <a href="templates/TEMPLATE - Product Conversion Flyer.pptx" download>📄 Product Conversion Flyer</a>
    `;
    audience = "CNO/COO Council, Physicians, Execs, Quality";
  }

  resultBox.innerHTML = `
    <h3>Decision Output</h3>
    <p><strong>Impact Level:</strong> ${impact}</p>
    <p><strong>Decision Level:</strong> ${decision}</p>
    <p><strong>Communication:</strong><br>${communication}</p>
    <p><strong>Templates:</strong><br>${templates}</p>
    <p><strong>Audience:</strong> ${audience}</p>
  `;
  resultBox.style.display = 'block';
}
