import { users } from "../../globalVariables.js";
import { initializeUi } from "../../mainScript.js";
export function initializeSignUp() {
  // signInForm

  document
    .getElementById("signInForm")
    .addEventListener("submit", function (event) {
      // Prevent the form from submitting normally
      event.preventDefault();
      // Get form values
      let username = document.getElementById("usernameSignIn").value;
      let password = document.getElementById("passwordSignIn").value;
      // Check if username and password are valid
      let user = users.find((user) => user.username === username);
      if (user === undefined) {
        alert("Username not found");
        document.getElementById("usernameSignIn").style.borderColor = "red";
        return;
      }
      if (user.password !== password) {
        alert("Incorrect password");
        document.getElementById("passwordSignIn").style.borderColor = "red";
        return;
      }
      // Set signedIn to true in sessionStorage to be earased
      //when the user closes the browser
      sessionStorage.setItem("signedIn", "true");
      sessionStorage.setItem("username", user.firstName + " " + user.lastName);
      //keep active user in session storage for information update
      sessionStorage.setItem("activeUser", JSON.stringify(user));

      //load UI
      initializeUi();
      document.getElementById("mainContainer").innerHTML =
        "<h1 style='color:white; font-size: 50px;' >Welcome " +
        user.username +
        "</h1>";
    });
  //
  //
  //new user sign up
  document
    .getElementById("cancelButton")
    .addEventListener("click", function (event) {
      // Prevent the form from submitting normally
      event.preventDefault();
      //hide signUp form
      document.getElementById("signUpContainer").style.display = "none";
      // Show sign in form
      document.getElementById("signInContainer").style.display = "block";
    });

  document
    .getElementById("signUpButton")
    .addEventListener("click", function () {
      //hide signIn form
      document.getElementById("signInContainer").style.display = "none";
      // Show sign up form
      document.getElementById("signUpContainer").style.display = "block";
    });
  // Add event listener to signUp form
  document
    .getElementById("signUpForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting normally
      console.log("submitting form");
      // Get form values
      let firstName = document.getElementById("firstName").value;
      let lastName = document.getElementById("lastName").value;
      let email = document.getElementById("email").value;
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let confirmPassword = document.getElementById("confirmPassword").value;

      //check for empty fields
      if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        username === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        alert("Please fill in all fields");
        return;
      }
      // Check if email is valid
      if (!email.includes("@")) {
        document.getElementById("email").style.borderColor = "red";
        alert("Invalid email");
        return;
      }
      // Check if passwords match
      if (password != confirmPassword) {
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("confirmPassword").style.borderColor = "red";
        alert("Passwords do not match");
        return;
      }
      // Create user object
      let user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        role: "user",
        cart: [],
      };
      // Add user to users array (update global variable)
      users.push(user);
      // Save user to local storage
      localStorage.setItem("users", JSON.stringify(users));
      //bring user back to sign in form
      document.getElementById("signUpContainer").style.display = "none";
      document.getElementById("signInContainer").style.display = "block";
    });
}
