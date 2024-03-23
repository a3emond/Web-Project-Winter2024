//import global variables
import { products, colors, users } from "../../globalVariables.js";
//initialize shop
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
}

//color picker functions
let tshirt;
function changeTshirtColor(colorHex, event) {
  var panel = event.currentTarget.parentElement;
  console.log(panel);
  tshirt.style.backgroundColor = colorHex;
  panel.style.display = "none";
}

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

//add to cart functions

function addToCart(event) {
  // show / hide panel
  let addedPanel = document.querySelector(".addedToCartPanel");
  ShowHidePanel(event);
  // Get the product ID from the button's data attribute
  var productId = event.target.dataset.productId;
  // Find the product in the products array
  var product = products.find((product) => product.id == productId);
  //panel controls
  if (!okButton.hasEventListener) {
    okButton.addEventListener("click", () => {
      addedPanel.style.display = "none";
      // Get the active user from the session storage
      let activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
      // Add the product to the active user's cart
      activeUser.cart.push(product);
      // Update the active user and users array in storage
      localStorage.setItem("users", JSON.stringify(users));
      sessionStorage.setItem("activeUser", JSON.stringify(activeUser));
      // Update the cart count in the header
      document.getElementById("cartCount").innerHTML = activeUser.cart.length;
    });
    okButton.hasEventListener = true;
  }
  if (!cancelButton.hasEventListener) {
    cancelButton.addEventListener("click", () => {
      addedPanel.style.display = "none";
    });
    cancelButton.hasEventListener = true;
  }
  if (!goToCartButton.hasEventListener) {
    goToCartButton.addEventListener("click", () => {});
    goToCartButton.hasEventListener = true;
  }
}
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
