function initializeSignUp() {
  // Add event listener to form
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
      if (password !== confirmPassword) {
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
      };
      // Send form data to server
      fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => console.log("Success:", data))
        .catch((error) => console.error("Error:", error));
    });
}
export { initializeSignUp };
