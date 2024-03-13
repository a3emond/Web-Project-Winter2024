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

// Fetch the JSON file
fetch("productInfo.json")
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
  })
  .catch((error) => console.error("Error:", error));
