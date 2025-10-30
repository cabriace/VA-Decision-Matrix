// unspsc-lookup.js
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('unspscInput');
  const button = document.getElementById('lookupBtn');
  const resultBox = document.getElementById('lookupResult');

  let unspscData = [];

  // Fetch JSON data
  fetch('data/seg42-unspsc.json')
    .then(response => response.json())
    .then(data => {
      unspscData = data;
      console.log("✅ UNSPSC data loaded:", unspscData.length, "records");
    })
    .catch(err => console.error("❌ Failed to load UNSPSC data:", err));

  button.addEventListener('click', () => {
    const code = input.value.trim();
    if (!code) {
      resultBox.innerHTML = "<p>Please enter a UNSPSC code.</p>";
      resultBox.classList.add('visible');
      return;
    }

    const match = unspscData.find(item => 
      item.Code?.toString() === code || item.UNSPSC?.toString() === code
    );

    if (match) {
      resultBox.innerHTML = `
        <h3>UNSPSC Match Found</h3>
        <p><strong>Code:</strong> ${match.Code || match.UNSPSC}</p>
        <p><strong>Title:</strong> ${match.Title || match.Description}</p>
        <p><strong>Category:</strong> ${match.Category || match.Family || "N/A"}</p>
      `;
    } else {
      resultBox.innerHTML = `<p>No match found for code: ${code}</p>`;
    }

    resultBox.classList.add('visible');
  });
});
