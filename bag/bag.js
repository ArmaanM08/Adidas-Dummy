window.onload = function () {
  const bag = JSON.parse(localStorage.getItem('bag')) || [];
  const container = document.getElementById('bag-items');

  const countEl = document.getElementById('summary-count');
  const costEl = document.getElementById('summary-cost');
  const totalEl = document.getElementById('summary-total');
  const deliveryCharge = 100;

  if (bag.length === 0) {
    container.innerHTML = "<p>Your bag is empty 🛍️</p>";
    if (countEl) countEl.textContent = "0";
    if (costEl) costEl.textContent = "₹0";
    if (totalEl) totalEl.textContent = "₹0";
    const deliveryEl = document.getElementById('summary-delivery');
    if (deliveryEl) deliveryEl.textContent = "₹0";
    return;
  }

  let productCost = 0;

  bag.forEach((item, index) => {
  const card = document.createElement('div');
  card.className = 'bag-card';
  card.innerHTML = `
    <img src="${item.image}" alt="Product" />
    <div>
      <p>Product: ${item.name}</p>
      <p>Price: ${item.price}</p>
    </div>
    <button class="remove-btn" title="Remove">❌</button>
  `;

  // Remove product on click
  card.querySelector('.remove-btn').addEventListener('click', () => {
    bag.splice(index, 1); // remove item
    localStorage.setItem('bag', JSON.stringify(bag)); // save updated bag
    location.reload(); // refresh to re-render
  });

  container.appendChild(card);

  const priceNumber = parseFloat(item.price.replace(/[^\d.]/g, ""));
  productCost += isNaN(priceNumber) ? 0 : priceNumber;
});

  const totalCost = productCost + deliveryCharge;

  if (countEl) countEl.textContent = `${bag.length}`;
  if (costEl) costEl.textContent = `₹${productCost}`;
  if (totalEl) totalEl.textContent = `₹${totalCost}`;

  const orderNowBtn = document.querySelector('.order-now');

  if (orderNowBtn) {
    orderNowBtn.addEventListener('click', () => {
      alert("Order placed!");
    });
  }
};