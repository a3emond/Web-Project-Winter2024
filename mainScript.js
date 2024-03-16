import { products, colors, InitializeData } from "./globalVariables.js";
import { initializeNavbar } from "./Modules/navBar/navbar.js";

document.addEventListener("DOMContentLoaded", function () {
  //initialize data
  InitializeData();
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

  //import footer html
  fetch("Modules/footer/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });
});
