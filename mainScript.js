import { products, colors, InitializeData } from "./globalVariables.js";
import { initializeNavbar } from "./Modules/navBar/navbar.js";
import { initializeSignUp } from "./Modules/signUp/signUp.js";
import { InitializeCheckout } from "./Modules/checkout/checkout.js";

document.addEventListener("DOMContentLoaded", function () {
  //
  //sessionStorage.clear();
  //localStorage.clear();
  //temp workingOn page load
  //
  // insert un fetch ici pour travailler dessus
  //
  //
  //
  //initialize data
  InitializeData();
  primeInit();
});

export function primeInit() {
  if (sessionStorage.getItem("signedIn") !== "true") {
    fetch("Modules/signUp/signUp.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("main").innerHTML = data;
        initializeSignUp();
      });
  } else {
    initializeUi();
  }

  //import footer html
  fetch("Modules/footer/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });
}

export function initializeUi() {
  //import header html
  fetch("Modules/header/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    });
  //import navBar html
  fetch("Modules/navBar/navBar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navBar").innerHTML = data;
      initializeNavbar(); //function to call the navbar with functionalities in navbar.js
    });
}
