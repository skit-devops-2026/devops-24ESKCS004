/* Shared top navigation — injected into every page.
   Usage: <script src="../js/nav.js" data-active="dashboard"></script>
*/
(function () {
  const NAV_ITEMS = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "dashboard", label: "Dashboard", href: "dashboard.html" },
    { key: "goals", label: "Goals", href: "goals.html" },
    { key: "planner", label: "Planner", href: "planner.html" },
    { key: "transactions", label: "Transactions", href: "transactions.html" },
    { key: "reports", label: "Reports", href: "reports.html" },
    { key: "profile", label: "Profile", href: "profile.html" },
  ];

  const SELF_SCRIPT = document.currentScript;

  function mount() {
    const script = SELF_SCRIPT;
    const active = (script && script.getAttribute("data-active")) || "home";
    const root = (script && script.getAttribute("data-root")) || "";

    const home = root ? root + "index.html" : "index.html";

    const links = NAV_ITEMS.map((item) => {
      const href = root ? root + item.href : item.href;
      const cls = item.key === active ? ' class="active"' : "";
      return `<a href="${href}"${cls}>${item.label}</a>`;
    }).join("");

    const html = `
      <div class="topbar-inner">
        <a class="brand" href="${home}">
          <span class="brand-mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
          </span>
          Twinfin
        </a>
        <nav class="nav">${links}</nav>
        <button class="avatar" aria-label="Account menu" type="button">AK</button>
      </div>
    `;

    const mountPoint = document.getElementById("twinfin-topbar");
    if (mountPoint) {
      mountPoint.innerHTML = html;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
