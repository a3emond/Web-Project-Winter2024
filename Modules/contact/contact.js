export function InitializeContact() {
  // Select the form
  let form = document.getElementById("contactForm");
  let user = JSON.parse(sessionStorage.getItem("activeUser"));
  console.log(user);
  let user_name = user.firstName + " " + user.lastName;
  let user_email = user.email;

  if (user) {
    // set the name and email fields
    document.getElementById("name").value = user_name;
    document.getElementById("email").value = user_email;
  }
  // Add an event listener for form submission
  form.addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();
    var nameField = document.getElementById("name");
    var emailField = document.getElementById("email");
    var messageField = document.getElementById("message");
    // Extract the form data
    var name = nameField.value;
    var email = emailField.value;
    var message = messageField.value;

    // Display the form data
    alert(
      "Email Sent!\n\nName: " +
        name +
        "\nEmail: " +
        email +
        "\nMessage: " +
        message
    );
  });
}
