import { initializeShop } from "../shop/shop.js";
export function initializeNavbar() {
  let btnShop = document.getElementById("btnShop");
  let btnAbout = document.getElementById("btnAbout");
  let btnContact = document.getElementById("btnContact");
  let cart = document.getElementById("cart");
  let cartCount = document.getElementById("cartCount");
  let time = document.getElementById("time");
  let mainDisplay = document.getElementById("main");

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
      });
  });

  cart.addEventListener("click", function () {
    fetch("Modules/cart/cart.html")
      .then((response) => response.text())
      .then((data) => {
        mainDisplay.innerHTML = data;
      });
  });

  //time functionnalities
  function updateTime() {
    time.textContent = new Date().toLocaleTimeString();
  }
  updateTime(); // Call the function once to start the timer
  setInterval(updateTime, 1000); // Call the function every second
}
