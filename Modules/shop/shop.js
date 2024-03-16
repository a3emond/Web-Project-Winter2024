//import global variables
import { products, colors } from "../../globalVariables.js";
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

//add to cart section
//take care of the add to cart button and the added to cart panel
//to confirm the addition
function addToCart(event) {
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

  if (!okButton.hasEventListener) {
    okButton.addEventListener("click", (event) => {
      document.getElementById("cartCount").innerHTML++;
      addedPanel.style.display = "none";
      //update cart and user data
      //here
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
