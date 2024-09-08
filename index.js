// Variables
let cart = [];
const maxCapacity = 5;
let totalPrice = 0;
let freeShipping = false;

// DOM Elements
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");
const addItemButton = document.getElementById("add-item");
const removeItemButton = document.getElementById("remove-item");
const totalItemsElement = document.getElementById("total-items");
const totalPriceElement = document.getElementById("total-price");
const freeShippingElement = document.getElementById("free-shipping");
const messagesElement = document.getElementById("messages");
const cartItemsContainer = document.getElementById("cart-items");

// Event Listeners
addItemButton.addEventListener("click", addItemToCart);
removeItemButton.addEventListener("click", removeItemFromCart);

// Functions
function addItemToCart() {
  const itemName = itemNameInput.value;
  const itemPrice = parseFloat(itemPriceInput.value);

  if (itemName === "" || isNaN(itemPrice)) {
    displayMessage("Please enter valid item name and price.", "error");
    return;
  }

  if (cart.length >= maxCapacity) {
    displayMessage("Cart is at maximum capacity.", "error");
    return;
  }

  cart.push({ name: itemName, price: itemPrice });
  totalPrice += itemPrice;
  updateCart();
  displayMessage(`Added "${itemName}" to the cart.`, "success");
}

function removeItemFromCart() {
  if (cart.length === 0) {
    displayMessage("Cart is empty.", "error");
    return;
  }

  const removedItem = cart.pop();
  totalPrice -= removedItem.price;
  updateCart();
  displayMessage(`Removed "${removedItem.name}" from the cart.`, "success");
}

function updateCart() {
  const totalItems = cart.length;
  totalItemsElement.textContent = `Total Items: ${totalItems}`;
  totalPriceElement.textContent = `Total Price: ₦${totalPrice.toFixed(2)}`;

  if (totalPrice > 50) {
    freeShipping = true;
    freeShippingElement.textContent = "Free Shipping: Eligible";
  } else {
    freeShipping = false;
    freeShippingElement.textContent = "Free Shipping: Not Eligible";
  }

  renderCartItems();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = ""; // Clear existing items

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <p>${item.name}</p>
      <p>₦${item.price.toFixed(2)}</p>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
}

function displayMessage(message, type) {
  messagesElement.textContent = message;
  messagesElement.style.color = type === "error" ? "white" : "white";
  messagesElement.style.fontWeight = "bold";
  messagesElement.style.backgroundColor = type === "error" ? "red" : "green";
  messagesElement.style.padding = "10px";
  messagesElement.style.borderRadius = "5px";

  setTimeout(() => {
    messagesElement.textContent = "";
  }, 3000);
}
