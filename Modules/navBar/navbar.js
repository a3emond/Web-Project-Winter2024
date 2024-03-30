import { initializeShop } from "../shop/shop.js";
import { primeInit } from "../../mainScript.js";
import { InitializeCart } from "../cart/cart.js";
import { InitializeContact } from "../contact/contact.js";
import { InitializeAbout } from "../about/about.js";

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
        InitializeAbout();
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
  sessionStorage.setItem("time", 0);
  //time functionnalities
  var timeSpent = sessionStorage.getItem("time");
  function updateTime() {
    time.textContent =
      new Date().toLocaleTimeString() +
      "  --  " +
      " Temps connecté: " +
      secondsToTimeString(timeSpent++);
    sessionStorage.setItem("time", timeSpent);
  }
  updateTime(); // Call the function once to start the timer
  setInterval(updateTime, 1000); // Call the function every second
  //update cart count
  updateCartCount();
}

function secondsToTimeString(seconds) {
  var hours = Math.floor(seconds / 3600); //math.floor rounds down to the nearest whole number
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60; //% is the modulo operator, it returns the remainder of the division of the two operands

  var timeString =
    pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(remainingSeconds, 2);
  return timeString;
}

function pad(num, size) {
  var s = "00" + num; //add 0s to the left of the number
  return s.substr(s.length - size); //return the last size characters
}

export function updateCartCount() {
  cartCount.textContent = JSON.parse(
    sessionStorage.getItem("activeUser")
  ).cart.length;
}
