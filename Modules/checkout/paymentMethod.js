import { users } from "../../globalVariables.js";
export function InitializePaymentMethod() {
  var activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
  var form = document.getElementById("paymentMethodForm"); //form
  var sumbitButton = document.getElementById("savePaymentMethod");

  //add event listner to the submit button
  sumbitButton.addEventListener("click", function (event) {
    if (!formIsFilled()) {
      return;
    }
    event.preventDefault();
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });
    // save data to active user
    activeUser.paymentMethod = [];
    activeUser.paymentMethod.push(data);
    sessionStorage.setItem("activeUser", JSON.stringify(activeUser));
    //update users array
    let index = users.findIndex((user) => user.id === activeUser.id);
    users[index] = activeUser;
    //save to local storage
    localStorage.setItem("users", JSON.stringify(users));
    form.reset();
  });
}
//check if form is filled
function formIsFilled() {
  var visa = document.getElementById("visa"); //radio button
  var mastercard = document.getElementById("mastercard"); //radio button
  var cardNumber = document.getElementById("cardNumber"); //input
  var cardHolder = document.getElementById("cardHolder"); //input
  var expirationDate = document.getElementById("expirationDate"); //input
  var cvv = document.getElementById("cvv"); //input

  if (visa.checked || mastercard.checked) {
    if (
      cardNumber.value &&
      cardHolder.value &&
      expirationDate.value &&
      cvv.value
    ) {
      return true;
    } else {
      alert("Please fill out all fields");
      return false;
    }
  } else {
    alert("Please select a card type");
    return false;
  }
}
