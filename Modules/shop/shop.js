function createItem(productName, description, price, imgPath) {
  let item = document.createElement("div");
  item.className = "item";
  item.innerHTML = `
        <img src="${imgPath}" alt="${productName}">
        <h3>${productName}</h3>
        <p>${description}</p>
        <p>${price}</p>
        <button class="addToCart" >Add to cart</button>
      `;
  return item;
}
function createColorItem(colorName, imgPath) {
  let colorItem = document.createElement("div");
  colorItem.className = "colorItem";
  colorItem.innerHTML = `
        <img class="colorImg" src="${imgPath}" alt="${colorName}">`;

  return colorItem;
}

export function initializeShop() {
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
      }
    });
  //fetch colors
  fetch("../../Assets/products/colors.json")
    .then((response) => response.json()) // Parse the data as JSON
    .then((data) => {
      // Loop through the products array
      for (let color of data.colors) {
        // Create an item for each product
        let colorItem = createColorItem(color.name, color.image);
        // Append the item to the DOM
        document.getElementById("controls").appendChild(colorItem);
      }
    });
}
