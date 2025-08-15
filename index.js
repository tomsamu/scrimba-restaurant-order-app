import menuItems from "./data.js";

// Keep a running tally on the selected orders in this array
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
// MAKE INTO SEPARATE FUNCTION (EVENT LISTENER)
let addBtns = document.querySelectorAll('.menu-itemorder-btn');
addBtns.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    currentOrder.push(menuItems.find(item => item.name === e.target.dataset.order));
    console.log(currentOrder);
    renderCheckout()
  });
});


// Render checkout
function renderCheckout() {
  const checkoutSectionHtml = document.querySelector('#checkout');
  checkoutSectionHtml.style.display = 'block';
  const checkoutListFieldHtml = document.querySelector('.checkout-list');
  

  checkoutListFieldHtml.innerHTML = currentOrder.map(item => {
    return `
      <li class="checkout-list-item">
        <h2>${item.name}</h2>
        <button>remove</button>
        <p class="checkout-item-price">€${item.price}</p>
      </li>`
  }).join("");

  // Print out total sum of order
  const checkoutTotalSum = currentOrder.reduce((init, acc) => init + acc.price, 0)
  const checkoutTotalPriceHtml = document.querySelector(".checkout-total-price");
  checkoutTotalPriceHtml.textContent = `$${checkoutTotalSum}`;

}


if (currentOrder > 0) {
  renderCheckout();
}