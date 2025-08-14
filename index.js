import menuItems from "./data.js";

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
            <button class="menu-itemorder-btn">
                +
            </button>
        </div>
    `;
    })
    .join("");
}
renderMenuItems()

function renderCheckout() {
    
}