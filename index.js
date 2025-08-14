import menuItems from "./data.js";

// Keep a running tally on the added orders in this array
let currentOrder = [];

// Render menu items
function renderMenuItems() {
  const menuHtml = document.querySelector("#menu");

  menuHtml.innerHTML = menuItems
    .map((menuItem) => {
      return `
        <div class="menu-item">
            <span class="menu-item-symbol">${menuItem.emoji}</span>
            <div class="menu-item-description">
                <h2>${menuItem.name}</h2>
                <p class="menu-item-ingredients">${menuItem.ingredients.join(
                  ", "
                )}</p>
                <h3 class="menu-item-price">$${menuItem.price}</h3>
            </div>
            <button class="menu-itemorder-btn" data-order="${menuItem.name}">
                +
            </button>
        </div>
    `;
    })
    .join("");
}
renderMenuItems()

//Add order
let addBtns = document.querySelectorAll('.menu-itemorder-btn');
addBtns.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    currentOrder.push(menuItems.find(item => item.name === e.target.dataset.order));
    console.log(currentOrder);
  });
});

if (currentOrder > 0) {
  renderCheckout();
}

// Render checkout
function renderCheckout() {
  const checkoutHtml = document.querySelector('#checkout');
}


