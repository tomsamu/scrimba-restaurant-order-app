import menuItems from "./data.js";
const checkoutSectionHtml = document.querySelector("#checkout");
const paymentModal = document.getElementById('payment-modal');

// Keep a running tally on the selected orders in this array
let currentOrder = [];


// Render menu items
/* Menu items are dynamically rendered from a data object (data.js) as soon as the page loads. */
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
renderMenuItems();

// Add order
/* When user clicks the "add" button on a menu item,
it pushes the corresponding menu item object into the currentOrder-array */
let addBtns = document.querySelectorAll(".menu-itemorder-btn");
addBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    currentOrder.push(
      menuItems.find((item) => item.name === e.target.dataset.order)
    );
    renderCheckout();
  });
});

// Complete order
/* When a user clicks the "complete order", a payment modal gets displayed. */
const completeOrderBtn = document.querySelector('.checkout-submit-btn');
completeOrderBtn.addEventListener('click', function(){
  paymentModal.style.display = 'flex';
})

//// Payment and confirmation

const data = {};

const paymentForm = document.querySelector('#payment-modal-form');
paymentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  //capture form data
  const formData = new FormData(paymentForm);
  formData.forEach((value, key) => {
    data[key] = value;
  })
  console.log(data);
  // lägg in här
  renderConfirmation()
})

// Render confirmation

function renderConfirmation(){
  const confirmationSection = document.querySelector('#confirmation');
  const confirmationMessage = document.querySelector('#confirmation-message');
  
  checkoutSectionHtml.style.display = 'none';
  paymentModal.style.display = 'none';
  confirmationSection.style.display = 'flex';
  confirmationMessage.innerText = `Thanks ${data.fullName}. Your order is on it's way!`
}


// Render checkout
function renderCheckout() {
  
  checkoutSectionHtml.style.display = "block";
  const checkoutListFieldHtml = document.querySelector(".checkout-list");

  checkoutListFieldHtml.innerHTML = currentOrder
    .map((item, idx) => {
      return `
      <li class="checkout-list-item">
        <h2>${item.name}</h2>
        <button class="remove-btn" data-index="${idx}">remove</button>
        <p class="checkout-item-price">€${item.price}</p>
      </li>`;
    })
    .join("");

  // Print out total sum of order
  const checkoutTotalSum = currentOrder.reduce(
    (init, acc) => init + acc.price,
    0
  );
  const checkoutTotalPriceHtml = document.querySelector(
    ".checkout-total-price"
  );
  checkoutTotalPriceHtml.textContent = `$${checkoutTotalSum}`;

  // REMOVE ORDER BUTTONS
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const idx = e.target.dataset.index;
      currentOrder.splice(idx, 1);
      renderCheckout();
    });
  });
}

if (currentOrder > 0) {
  renderCheckout();
}
