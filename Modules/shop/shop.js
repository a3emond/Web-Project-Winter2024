import { InitializeCart } from "../cart/cart.js";
import { products, tShirts, colors, users } from "../../globalVariables.js";
export function initializeShop() {
  // Loop through the products array
  for (let item of products) {
    // Append the item to the DOM
    document.getElementById("container").appendChild(item);
    //add event listener to color picker
    document
      .querySelectorAll(".colorPicker")
      .forEach((element) => element.addEventListener("click", openColorPanel));
    document.querySelectorAll(".addToCart").forEach((element) => {
      element.addEventListener("click", addToCart);
    });
  }

  //color Picker elements
  let colorPanel = document.getElementById("colorPanel");
  for (let colorItem of colors) {
    // Append the item to the DOM
    document.getElementById("colorPanel").appendChild(colorItem);
    colorItem.style.cursor = "pointer";
    colorItem.addEventListener("click", (event) =>
      changeTshirtColor(colorItem.hex, event)
    );
  }
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      let query = document.getElementById("searchInput").value;
      searchProducts(query);
    });
  document.getElementById("searchInput").addEventListener("input", function () {
    let query = document.getElementById("searchInput").value;
    if (query === "") {
      searchProducts("");
    }
  });
}
//search function
function searchProducts(query) {
  // Convert the query to lower case
  query = query.toLowerCase();
  console.log(query);

  // Get the container div
  let container = document.getElementById("container");

  // Get all child divs of the container
  let productDivs = container.children;
  console.log(productDivs);

  // Loop through the product divs
  for (let i = 0; i < productDivs.length; i++) {
    // Get the product name
    let productName = productDivs[i]
      .getElementsByTagName("h3")[0]
      .textContent.toLowerCase();

    // Check if the product name includes the query
    if (productName.includes(query)) {
      // If it does, show the product div
      productDivs[i].style.display = "";
    } else {
      // If it doesn't, hide the product div
      productDivs[i].style.display = "none";
    }
  }
}
//add to cart functions

function addToCart(event) {
  // Get main display from index.html
  let mainDisplay = document.getElementById("main");
  // show / hide panel
  let addedPanel = document.querySelector(".addedToCartPanel");
  ShowHidePanel(event);
  // Get the product ID from the button's data attribute
  var productId = event.target.dataset.productId;
  // Find the product in the products array
  var product = tShirts.find((product) => product.id == productId);
  console.log(product);
  //panel controls
  //ok Button
  if (!okButton.hasEventListener) {
    okButton.addEventListener("click", () => {
      addedPanel.style.display = "none";
      // Get the active user from the session storage
      let activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
      // Add the product to the active user's cart
      activeUser.cart.push(product);
      // Update the active user and users array in storage
      sessionStorage.setItem("activeUser", JSON.stringify(activeUser));
      // Update the cart count in the header
      document.getElementById("cartCount").innerHTML = activeUser.cart.length;
    });
    okButton.hasEventListener = true;
  }
  //concel Button
  if (!cancelButton.hasEventListener) {
    cancelButton.addEventListener("click", () => {
      addedPanel.style.display = "none";
    });
    cancelButton.hasEventListener = true;
  }
  //go to cart Button
  if (!goToCartButton.hasEventListener) {
    goToCartButton.addEventListener("click", function () {
      fetch("Modules/cart/cart.html")
        .then((response) => response.text())
        .then((data) => {
          mainDisplay.innerHTML = data;
          InitializeCart();
        });
    });
    goToCartButton.hasEventListener = true;
  }
}
//
//
//utility functions
//
//
//show / hide panel (added to cart)
function ShowHidePanel(event) {
  let addedPanel = document.querySelector(".addedToCartPanel");
  if (addedPanel.style.display === "block") {
    addedPanel.style.display = "none";
  } else {
    addedPanel.style.display = "block";
    addedPanel.style.top = event.pageY + 10 + "px";
    addedPanel.style.left = event.pageX + 10 + "px";
  }
  let okButton = document.getElementById("okButton");
  okButton.dataset.hasEventListener = false;
  let cancelButton = document.getElementById("cancelButton");
  cancelButton.dataset.hasEventListener = false;
  let goToCartButton = document.getElementById("goToCartButton");
  goToCartButton.dataset.hasEventListener = false;
}
//color picker functions
let tshirt;
function changeTshirtColor(colorHex, event) {
  var panel = event.currentTarget.parentElement;
  //get tshirt name
  //probleme icit!!!!
  let itemName = tshirt.parentElement.querySelector("h3").innerHTML;

  console.log(itemName);
  //change tshirt color in the tShirts array
  tShirts.find((product) => product.name == itemName).color = colorHex;

  //visualy change tshirt color
  tshirt.style.backgroundColor = colorHex;
  console.log(tshirt);
  //hide color panel
  panel.style.display = "none";
}
//show / hide color panel
function openColorPanel(event) {
  tshirt = event.currentTarget.parentElement.parentElement.querySelector("img");

  if (colorPanel.style.display === "flex") {
    colorPanel.style.display = "none";
  } else {
    colorPanel.style.display = "flex";
    colorPanel.style.top = event.pageY + 10 + "px";
    colorPanel.style.left = event.pageX + 10 + "px";
  }
}
