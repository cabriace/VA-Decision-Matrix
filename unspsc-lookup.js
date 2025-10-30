// unspsc-lookup.js
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("unspscInput");
  const button = document.getElementById("lookupBtn");
  const resultBox = document.getElementById("lookupResult");

  let data = [];

  // Load JSON data
  fetch("data/seg42-unspsc.json")
    .then(res => res.json())
    .then(json => (data = json))
    .catch(err => console.error("Error loading UNSPSC data:", err));

  // Lookup function
  button.addEventListener("click", () => {
    const code = input.value.trim();

    if (!code) {
      resultBox.innerHTML = `<p>Please enter a UNSPSC code.</p>`;
      resultBox.classList.add("visible");
      return;
    }

    const match = data.find(item => item.UNSPSC_Code === code);

    if (match) {
      resultBox.innerHTML = `
        <h3>Result Found</h3>
        <p><strong>UNSPSC Code:</strong> ${match.UNSPSC_Code}</p>
        <p><strong>Phase/Level:</strong> ${match["VA Phase/Level"]}</p>
        <p><strong>Description:</strong> ${match["UNSPSC LongDescription"]}</p>
      `;
    } else {
      resultBox.innerHTML = `<p>No match found for code <strong>${code}</strong>.</p>`;
    }

    resultBox.classList.add("visible");
  });
});
