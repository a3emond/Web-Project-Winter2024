import { initializeShop } from "../shop/shop.js";
import { primeInit } from "../../mainScript.js";
import { InitializeCart } from "../cart/cart.js";
import { InitializeContact } from "../contact/contact.js";

export function initializeNavbar() {
  let btnShop = document.getElementById("btnShop");
  let btnAbout = document.getElementById("btnAbout");
  let btnContact = document.getElementById("btnContact");
  let cart = document.getElementById("cart");
  let cartCount = document.getElementById("cartCount");
  let time = document.getElementById("time");
  let mainDisplay = document.getElementById("main");
  document.getElementById("username").textContent =
    "Bonjour, " + sessionStorage.getItem("username");

  //logout
  document.getElementById("logOut").addEventListener("click", function () {
    console.log("logging out");
    // Clear session storage
    sessionStorage.clear();
    sessionStorage.setItem("signedIn", "false");
    // reload index.html
    primeInit();
    location.reload();
    fetch("index.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("main").parentElement.innerHTML = data;
      });
  });
  btnShop.addEventListener("click", function () {
    fetch("Modules/shop/shop.html")
      .then((response) => response.text())
      .then((data) => {
        mainDisplay.innerHTML = data;
        initializeShop();
      });
  });

  btnAbout.addEventListener("click", function () {
    fetch("Modules/about/about.html")
      .then((response) => response.text())
      .then((data) => {
        mainDisplay.innerHTML = data;
      });
  });

  btnContact.addEventListener("click", function () {
    fetch("Modules/contact/contact.html")
      .then((response) => response.text())
      .then((data) => {
        mainDisplay.innerHTML = data;
        InitializeContact();
      });
  });

  cart.addEventListener("click", function () {
    fetch("Modules/cart/cart.html")
      .then((response) => response.text())
      .then((data) => {
        mainDisplay.innerHTML = data;
        InitializeCart();
      });
  });

  //time functionnalities
  function updateTime() {
    time.textContent = new Date().toLocaleTimeString();
  }
  updateTime(); // Call the function once to start the timer
  setInterval(updateTime, 1000); // Call the function every second
  cartCount.textContent = JSON.parse(
    sessionStorage.getItem("activeUser")
  ).cart.length;
}
// greet user
