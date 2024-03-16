export const products = [];
export const colors = [];
export const users = [];
export function InitializeData() {
  //fetch t-shirts data
  fetch("../../DataStorage/productInfo.json")
    .then((response) => response.json())
    .then((data) => {
      for (let product of data.products) {
        let item = createItem(
          product.id,
          product.name,
          product.description,
          product.price,
          product.image
        );
        products.push(item);
      }
    });
  //fetch skateboards data
  //
  //to implement..
  //
  //fetch colors data
  fetch("../../DataStorage/colors.json")
    .then((response) => response.json())
    .then((data) => {
      for (let color of data.colors) {
        let colorItem = createColorItem(
          color.name,
          color.image,
          color.id,
          color.hex
        );
        colors.push(colorItem);
      }
    });

  //fetch users data
  fetch("../../DataStorage/usersInfo.json")
    .then((response) => response.json())
    .then((data) => {
      for (let user of data.users) {
        let userItem = createUserItem(
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.username,
          user.password,
          user.role
        );
        users.push(userItem);
      }
    });
}

//
//t-shirts items
function createItem(productId, productName, description, price, imgPath) {
  let item = document.createElement("div");
  item.id = productId;
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
// stkateBoards items
//
//to implement..
//
//create color item
function createColorItem(colorName, imgPath, colorId, colorHex) {
  let colorItem = document.createElement("div");
  colorItem.hex = colorHex;
  colorItem.id = colorId;
  colorItem.className = "colorItem";
  colorItem.innerHTML = `
        <img class="colorImg" src="${imgPath}" alt="${colorName}">`;

  return colorItem;
}
//users items
function createUserItem(
  userId,
  firstName,
  lastName,
  email,
  username,
  password,
  role
) {
  let userItem = {
    id: userId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: password,
    role: role,
  };
  return userItem;
}
