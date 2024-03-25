import { colors } from "../../globalVariables.js";

export function InitializeReciep() {
  let subTotal = 0;
  let tps = 0;
  let tvq = 0;
  let total = 0;
  let itemTable = document.getElementById("itemTable");
  let activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
  let cart = activeUser.cart;
  cart.forEach((item) => {
    console.log(item.name);
    itemTable.innerHTML += `<tr><td>${item.name}</td><td>${FindColorName(
      item.color
    )}</td><td>${item.price}</td></tr>`;
    subTotal += item.price;
  });
  tps = subTotal * 0.05;
  tvq = subTotal * 0.09975;
  total = subTotal + tps + tvq;
  let subTotalElement = document.getElementById("subTotal");
  let tpsElement = document.getElementById("tps");
  let tvqElement = document.getElementById("tvq");
  let totalElement = document.getElementById("total");
  subTotalElement.textContent = formatPrice(subTotal);
  tpsElement.textContent = formatPrice(tps);
  tvqElement.textContent = formatPrice(tvq);
  totalElement.textContent = formatPrice(total);
  //add conditions to checkout button (delivery info and payment method must be filled out)
  let checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.addEventListener("click", () => {
    alert("Thank you for your purchase!");
    activeUser.cart = [];
    sessionStorage.setItem("activeUser", JSON.stringify(activeUser));
    location.reload();
  });
}
//price formatting
function formatPrice(price) {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$";
}
function FindColorName(colorHex) {
  let color = colors.find((color) => color.hex === colorHex);
  if (color) {
    let image = color.querySelector("img");
    if (image) {
      let alt = image.alt;
      return alt;
    }
  }
}
