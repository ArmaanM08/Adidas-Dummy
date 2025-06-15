window.onload = function () {
  fetch("/data/categories.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("all-products-container");
      const filterContainer = document.getElementById("product-filters");
      if (!container || !filterContainer) {
        console.error("Missing container elements.");
        return;
      }
        const params = new URLSearchParams(window.location.search);
        const initialFilter = params.get('filter') || "all";
      // Flatten all products with tags
      const allProducts = [];

      Object.keys(data).forEach(category => {
        const { media, price, description } = data[category];

        for (let i = 0; i < media.length; i++) {
          allProducts.push({
            id: `${category}${i}`,
            type: category,
            img: media[i],
            name: description[i],
            price: price[i]
          });
        }
      });

      // Render function
      function renderProducts(filter = "all") {
        container.innerHTML = "";
        currentFilter = filter;

        let filtered = filter === "all"
            ? [...allProducts]
            : allProducts.filter(p => p.type === filter || p.id.startsWith(filter));

        const sortValue = sortSelect?.value;

        if (sortValue === "low-to-high") {
            filtered.sort((a, b) =>
            parseFloat(a.price.replace(/[^\d.]/g, '')) -
            parseFloat(b.price.replace(/[^\d.]/g, ''))
            );
        } else if (sortValue === "high-to-low") {
            filtered.sort((a, b) =>
            parseFloat(b.price.replace(/[^\d.]/g, '')) -
            parseFloat(a.price.replace(/[^\d.]/g, ''))
            );
        }

        filtered.forEach(product => {
            const card = document.createElement("div");
            card.className = "prod-card";
            card.setAttribute("data-id", product.id);
            card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" />
            <p>Product: ${product.name}</p>
            <p>Price: ${product.price}</p>
            `;
            card.addEventListener("click", () => {
            localStorage.setItem("selectedShoe", product.id);
            window.location.href = "productpage.html";
            });
            container.appendChild(card);
        });
    }

      const sortSelect = document.getElementById('sort-select');

        if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            renderProducts(currentFilter);
        });
        }

        let currentFilter = initialFilter;

      // Initial render
      renderProducts(initialFilter);

      // Filter event
      filterContainer.addEventListener("click", e => {
        if (e.target.tagName === "BUTTON") {
          const filter = e.target.getAttribute("data-filter");
          renderProducts(filter);
        }
      });
    })
    .catch(err => {
      console.error("⚠️ Failed to load categories.json:", err);
    });
};