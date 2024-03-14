// Purpose: Shop module for the shop page.

//initialize shop
export function initializeShop() {
  // Product elements and functions
  function createItem(productName, description, price, imgPath) {
    let item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
    
        <img src="${imgPath}" alt="${productName}">
        <div style="font-size:0.5rem; display:flex; align-items: center; margin-left:20px;">
        <img class="colorPicker" style="width:20px; cursor:pointer;" src="../../Assets/products/colorsImage/c2.png" alt="colorPicker">
        Pick a Color
        </div>
        <h3>${productName}</h3>
        <p>${description}</p>
        <p>${price}</p>
        <button class="addToCart" >Add to cart</button>
      `;
    return item;
  }

  // Fetch the JSON file
  fetch("../../Assets/products/productInfo.json")
    .then((response) => response.json()) // Parse the data as JSON
    .then((data) => {
      // Loop through the products array
      for (let product of data.products) {
        // Create an item for each product
        let item = createItem(
          product.name,
          product.description,
          product.price,
          product.image
        );
        // Append the item to the DOM
        document.getElementById("container").appendChild(item);
        //add event listener to color picker
        document
          .querySelectorAll(".colorPicker")
          .forEach((element) =>
            element.addEventListener("click", openColorPanel)
          );
        document.querySelectorAll(".addToCart").forEach((element) => {
          element.addEventListener("click", addToCart);
        });
      }
    });

  //
  //
  //color Picker elements

  let colorPanel = document.getElementById("colorPanel");
  let colorName = [];
  let colorHex = [];

  function createColorItem(colorName, imgPath, colorId) {
    let colorItem = document.createElement("div");
    colorItem.id = colorId;
    colorItem.className = "colorItem";
    colorItem.innerHTML = `
        <img class="colorImg" src="${imgPath}" alt="${colorName}">`;

    return colorItem;
  }

  //fetch colors and fill color panel
  fetch("../../Assets/products/colors.json")
    .then((response) => response.json()) // Parse the data as JSON
    .then((data) => {
      // Loop through the products array
      for (let color of data.colors) {
        //fill arrays
        colorName.push(color.name);
        colorHex.push(color.hex);
        // Create an item for each product
        let colorItem = createColorItem(color.name, color.image);
        // Append the item to the DOM
        document.getElementById("colorPanel").appendChild(colorItem);
        colorItem.style.cursor = "pointer";
        colorItem.addEventListener("click", (event) =>
          changeTshirtColor(color.hex, event)
        );
      }
    });
}
let tshirt;
function changeTshirtColor(colorHex, event) {
  var panel = event.currentTarget.parentElement;
  console.log(panel);
  tshirt.style.backgroundColor = colorHex;
}

function openColorPanel(event) {
  tshirt = event.currentTarget.parentElement.parentElement.querySelector("img");
  console.log(tshirt);
  console.log("color panel opened");
  if (colorPanel.style.display === "flex") {
    colorPanel.style.display = "none";
  } else {
    colorPanel.style.display = "flex";
    colorPanel.style.top = event.pageY + 10 + "px";
    colorPanel.style.left = event.pageX + 10 + "px";
  }
}

function addToCart() {
  document.getElementById("cartCount").innerHTML++;
  //implement saving objects with specs to display in cart
}
