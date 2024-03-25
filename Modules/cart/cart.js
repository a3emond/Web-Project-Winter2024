import { products, tShirts, colors, users } from "../../globalVariables.js";
import { InitializeCheckout } from "../checkout/checkout.js";
import { initializeNavbar } from "../navBar/navbar.js";

export function InitializeCart() {
  let cart, tableItems, activeUser; // Declare variables
  //localStorage.clear();
  //sessionStorage.clear();
  UpdateTotalPrice();
  console.log(sessionStorage);
  // Initialize cart
  //append items to table body
  activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
  cart = activeUser.cart;
  tableItems = document.querySelector("tbody");
  cart.forEach((item) => {
    let colorName = FindColorName(item.color);
    let row = document.createElement("tr");
    row.innerHTML = `
          <td><img style="background-color:${item.color}" src=${item.image}></td>
          <td>${item.name}<br/>(${colorName})</td>
          <td>${item.price}</td>
          <td>
            <button class="button btnDelete">Delete</button>
          </td>
        `;
    let deleteButton = row.querySelector(".btnDelete");
    deleteButton.addEventListener("click", () => {
      deleteItem(item.id);
    });
    tableItems.appendChild(row);
  });
  function deleteItem(id) {
    let index = cart.findIndex((item) => item.id === id);
    cart.splice(index, 1);
    sessionStorage.setItem("activeUser", JSON.stringify(activeUser));
    let row = tableItems.children[index];
    row.remove();
    //update cartCount
    initializeNavbar();
  }
  //checkout button
  let checkoutButton = document.getElementById("checkoutLink");
  checkoutButton.addEventListener("click", () => {
    //load checkout page
    let main = document.getElementById("main");
    fetch("Modules/checkout/checkout.html")
      .then((response) => response.text())
      .then((data) => {
        main.innerHTML = data;
        InitializeCheckout();
      });
  });
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
//price calculation
function UpdateTotalPrice() {
  let activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
  let cart = activeUser.cart;
  let total = document.getElementById("cartTotalPrice");
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price;
  });
  total.textContent = formatPrice(totalPrice);
  //TPS
  let tps = document.getElementById("tps");
  let tpsPrice = totalPrice * 0.05;
  tps.textContent = formatPrice(tpsPrice);
  //TVQ
  let tvq = document.getElementById("tvq");
  let tvqPrice = totalPrice * 0.09975;
  tvq.textContent = formatPrice(tvqPrice);
  //Total
  let grandTotal = document.getElementById("grandTotal");
  let totalFinal = totalPrice + tpsPrice + tvqPrice;
  grandTotal.textContent = formatPrice(totalFinal);
}
//price formatting
function formatPrice(price) {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "$";
}
