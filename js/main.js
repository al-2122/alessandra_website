document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const backToTop = document.getElementById("backToTop");
  const searchInput = document.getElementById("siteSearch");
  const searchItems = document.querySelectorAll("[data-search-item]");
  const searchEmptyState = document.getElementById("searchEmptyState");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      const expanded = nav.classList.contains("open");
      navToggle.setAttribute("aria-expanded", String(expanded));
    });
  }

  window.addEventListener("scroll", () => {
    if (!backToTop) return;

    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  if (searchInput && searchItems.length > 0) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      searchItems.forEach((item) => {
        const itemText = item.textContent.toLowerCase();
        const matches = itemText.includes(query);

        item.style.display = matches ? "" : "none";

        if (matches) {
          visibleCount += 1;
        }
      });

      if (searchEmptyState) {
        searchEmptyState.hidden = visibleCount !== 0;
      }
    });
  }
});
