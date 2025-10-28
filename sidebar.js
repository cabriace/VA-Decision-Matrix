// sidebar.js

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.getElementById("menu-btn");

  if (!sidebar || !overlay || !menuBtn) return;

  const opening = !sidebar.classList.contains("active");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  menuBtn.classList.toggle("open");

  // accessibility
  sidebar.setAttribute("aria-hidden", opening ? "false" : "true");
  menuBtn.setAttribute("aria-expanded", opening ? "true" : "false");
}

// Load sidebar.html and attach after body content (only once)
document.addEventListener("DOMContentLoaded", () => {
  fetch("sidebar.html")
    .then((r) => r.text())
    .then((html) => {
      // append the sidebar HTML to the end of body
      document.body.insertAdjacentHTML("beforeend", html);

      // small safety: if elements already added (hot reload) ensure event attributes present
      const menuBtn = document.getElementById("menu-btn");
      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("overlay");

      // if elements exist, make sure close button toggles too (in case dynamic binding needed)
      // close button in sidebar uses inline onclick in the HTML so it's fine, but we attach a couple handlers to be safe
      if (menuBtn) {
        // ensure initial state
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
      if (sidebar) sidebar.setAttribute("aria-hidden", "true");
      if (overlay) overlay.classList.remove("active");
    })
    .catch((err) => {
      console.error("Failed to load sidebar.html:", err);
    });
});
