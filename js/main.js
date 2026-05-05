document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const backToTop = document.getElementById("backToTop");

  const searchInput = document.getElementById("siteSearch");
  const searchItems = document.querySelectorAll("[data-search-item]");
  const searchEmptyState = document.getElementById("searchEmptyState");

  const globalSearch = document.getElementById("globalSearch");
  const globalSearchResults = document.getElementById("searchResults");
  const globalSearchEmpty = document.getElementById("globalSearchEmpty");

  const siteIndex = [
    {
      title: "About",
      url: "index.html",
      category: "Page",
      text: "About homepage plant microbial sciences PhD roots microbiome resilient agriculture crop science Cambridge research profile"
    },
    {
      title: "Research",
      url: "research.html",
      category: "Page",
      text: "Research root system architecture rhizosphere microbiomes orphan crops resilient agriculture methods quantitative biology sequencing image analysis"
    },
    {
      title: "Publications",
      url: "publications.html",
      category: "Page",
      text: "Publications papers preprints posters talks root phenotyping microbiome sequencing tef metagenomics"
    },
    {
      title: "CV",
      url: "cv.html",
      category: "Page",
      text: "CV education research experience teaching leadership awards funding academic profile"
    },
    {
      title: "Notes",
      url: "blog.html",
      category: "Page",
      text: "Notes blog methods coding conferences plant science microbiome bioinformatics reflections"
    },
    {
      title: "Beyond Academia",
      url: "beyond-academia.html",
      category: "Page",
      text: "Entrepreneurship politics economics sustainability travel languages industry consulting biotech broader interests"
    }
  ];

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

  if (globalSearch && globalSearchResults && globalSearchEmpty) {
    const renderResults = (results) => {
      globalSearchResults.innerHTML = "";

      if (results.length === 0) {
        globalSearchEmpty.hidden = false;
        globalSearchEmpty.textContent = "No results found.";
        return;
      }

      globalSearchEmpty.hidden = true;

      results.forEach((result) => {
        const article = document.createElement("article");
        article.className = "list-item";

        article.innerHTML = `
          <h2><a href="${result.url}">${result.title}</a></h2>
          <p class="meta">${result.category}</p>
          <p>${result.text}</p>
        `;

        globalSearchResults.appendChild(article);
      });
    };

    globalSearch.addEventListener("input", () => {
      const query = globalSearch.value.toLowerCase().trim();

      if (!query) {
        globalSearchResults.innerHTML = "";
        globalSearchEmpty.hidden = false;
        globalSearchEmpty.textContent = "Start typing to search the site.";
        return;
      }

      const results = siteIndex.filter((item) =>
        item.title.toLowerCase().includes(query) ||
        item.text.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );

      renderResults(results);
    });
  }
});