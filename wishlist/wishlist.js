window.onload = function () {
  console.log("✅ wishlist.js loaded");

  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  console.log("🛒 Wishlist contents:", wishlist);

  const container = document.getElementById('wishlistcards');
  const count = document.getElementById('count');

  if (!container || !count) {
    console.error("Required elements not found in the DOM.");
    return;
  }

  if (wishlist.length === 0) {
    container.innerHTML = "<p>Your wishlist is empty 😔</p>";
    count.textContent = "0 items";
    return;
  }

  count.textContent = `${wishlist.length} item${wishlist.length > 1 ? 's' : ''}`;

  wishlist.forEach(item => {
  const card = document.createElement('div');
  card.className = 'prod-card';

  const removeBtn = document.createElement('button');
    removeBtn.textContent = '🗑 Remove';
    removeBtn.type = 'button'; // ✅ Prevent form submit behavior
    removeBtn.onclick = function (event) {
  event.preventDefault(); // ✅ Also prevent any default actions
  const updatedWishlist = wishlist.filter(w => w.name !== item.name || w.image !== item.image);
  localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//   location.reload(); // or 
    container.removeChild(card);
  };

  card.innerHTML = `
    <img src="${item.image}" alt="Wishlist product" />
    <p>Product: ${item.name}</p>
    <p>Price: ${item.price}</p>
  `;
  card.appendChild(removeBtn);
  container.appendChild(card);
});
};