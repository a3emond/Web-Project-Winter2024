import { users } from "../../globalVariables.js";

export function InitializeDeliveryInfo() {
  var countrySelect = document.getElementById("country");
  var stateSelect = document.getElementById("state");

  // Load saved addresses
  let activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
  if (activeUser && !activeUser.deliveryAddress) {
    activeUser.deliveryAddress = [];
  }
  if (activeUser.deliveryAddress) {
    for (let address of activeUser.deliveryAddress) {
      CreateSavedAddress(address);
    }
  }

  // Listen for changes on the country select element
  countrySelect.addEventListener("change", function () {
    // Get the selected country
    var selectedCountry = countrySelect.value;

    // Clear the state select element
    while (stateSelect.firstChild) {
      stateSelect.removeChild(stateSelect.firstChild);
    }

    // Insert the states for the selected country
    if (states[selectedCountry]) {
      states[selectedCountry].forEach(function (state) {
        var option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
      });
    }
  });

  // Save information
  var form = document.getElementById("checkoutForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });
    form.reset();

    // Save the data to local storage
    activeUser.deliveryAddress.push(data);
    sessionStorage.setItem("activeUser", JSON.stringify(activeUser));

    // Update users array
    let index = users.findIndex((user) => user.id === activeUser.id);
    users[index] = activeUser;

    // Save to local storage
    localStorage.setItem("users", JSON.stringify(users));

    // Create a new radio button with the address as the label
    CreateSavedAddress(data);
  });
}

function CreateSavedAddress(data) {
  // Create a new radio button with the address as the label
  var radioButton = document.createElement("input");
  radioButton.type = "radio";
  radioButton.name = "deliveryAddress";
  radioButton.value = JSON.stringify(data); // Stringify the data object

  var label = document.createElement("label");
  label.appendChild(radioButton);
  label.appendChild(
    document.createTextNode(
      data.address +
        ", " +
        data.city +
        ", " +
        data.state +
        ", " +
        data.country +
        ", " +
        data.postalCode +
        ", " +
        data.phone
    )
  );

  // Append the radio button to the deliverySavedInfo element
  var deliverySavedInfo = document.getElementById("deliverySavedInfo");
  deliverySavedInfo.appendChild(label);

  // Add event listener to the new radio button
  radioButton.addEventListener("change", function () {
    console.log("Radio button selected:", this.value);
    // Fill the form with the selected address
    let data = JSON.parse(this.value);
    // Save the selected address to session storage for later use
    sessionStorage.setItem("selectedAddress", JSON.stringify(data));
    document.getElementById("address").value = data.address;
    document.getElementById("city").value = data.city;
    document.getElementById("state").value = data.state;
    document.getElementById("country").value = data.country;
    document.getElementById("postalCode").value = data.postalCode;
    document.getElementById("phone").value = data.phoneNumber;
  });
}

// Define the states for each country
let states = {
  CAN: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
  ],
  USA: [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
  GBR: ["England", "Scotland", "Wales", "Northern Ireland"],
  AUS: [
    "New South Wales",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia",
  ],
  JPN: [
    "Hokkaido",
    "Tohoku",
    "Kanto",
    "Chubu",
    "Kinki",
    "Chugoku",
    "Shikoku",
    "Kyushu",
  ],
  GER: [
    "Baden-Württemberg",
    "Bavaria",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hesse",
    "Lower Saxony",
    "Mecklenburg-Vorpommern",
    "North Rhine-Westphalia",
    "Rhineland-Palatinate",
    "Saarland",
    "Saxony",
    "Saxony-Anhalt",
    "Schleswig-Holstein",
    "Thuringia",
  ],
};
