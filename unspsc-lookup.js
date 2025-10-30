// unspsc-lookup.js

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("unspscInput");
  const button = document.getElementById("lookupBtn");
  const resultBox = document.getElementById("lookupResult");

  let unspscData = [];

  // Load JSON data
  fetch("data/seg42-unspsc.json")
    .then(res => res.json())
    .then(data => {
      unspscData = data;
      console.log("✅ UNSPSC data loaded:", unspscData.length, "entries");
    })
    .catch(err => {
      console.error("❌ Failed to load UNSPSC data:", err);
    });

  // Handle search
  button.addEventListener("click", () => {
    const code = input.value.trim();
    if (!code) {
      resultBox.innerHTML = `<p>Please enter a UNSPSC code.</p>`;
      resultBox.classList.add("visible");
      return;
    }

    const match = unspscData.find(
      item =>
        item["UNSPSC Code"]?.toString() === code ||
        item["Code"]?.toString() === code
    );

    if (match) {
      resultBox.innerHTML = `
        <h3>Result Found</h3>
        <p><strong>Code:</strong> ${match["UNSPSC Code"] || match["Code"]}</p>
        <p><strong>Title:</strong> ${match["Title"] || match["Name"]}</p>
        <p><strong>Description:</strong> ${match["Description"] || "N/A"}</p>
      `;
    } else {
      resultBox.innerHTML = `<p>No match found for code <strong>${code}</strong>.</p>`;
    }

    resultBox.classList.add("visible");
  });
});
