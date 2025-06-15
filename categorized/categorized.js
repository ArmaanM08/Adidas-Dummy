function loadProducts(category, productData) {
  const container = document.getElementById('product-container');
  if (!container) {
    console.error("🚨 'product-container' element not found in the DOM!");
    return;
  }

  const categoryData = productData[category];
  if (!categoryData) {
    container.innerHTML = `<p>No products found for '${category}'</p>`;
    console.error(`Category '${category}' not found in productData`);
    return;
  }

  const { media, price, description } = categoryData;
  container.innerHTML = '';

  for (let i = 0; i < media.length; i++) {
    const card = document.createElement('div');
    card.className = 'prod-card';
    card.setAttribute('data-id', `${category}${i}`);
    card.innerHTML = `
      <img src="${media[i]}" alt="Product ${i + 1}" />
      <p>Product: ${description[i]}</p>
      <p>Price: ${price[i]}</p>
    `;
    container.appendChild(card);
  }
}

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');

  if (!category) {
    console.warn("No category provided in URL.");
    return;
  }

  fetch('/data/categories.json')
    .then(res => res.json())
    .then(data => {
      loadProducts(category, data);
    })
    .catch(err => {
      console.error("Failed to load categorizedproducts.json:", err);
    });
};
document.addEventListener('click', function (e) {
  if (e.target.closest('.prod-card')) {
    const card = e.target.closest('.prod-card');
    const prodId = card.getAttribute('data-id');
    localStorage.setItem('selectedShoe', prodId);
    window.location.href = '/productpage/productpage.html';
  }
});
