// sidebar.js
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Load sidebar HTML into every page dynamically
document.addEventListener("DOMContentLoaded", () => {
  fetch("sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("beforeend", data);
    });
});
