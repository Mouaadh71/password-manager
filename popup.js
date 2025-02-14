const form = document.getElementById("form");
const password = document.getElementById("password");
const length = document.getElementById("length");
const password_lists = document.getElementById("passwords");
document.addEventListener("DOMContentLoaded", () => {
  function loadPasswords() {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      const passwordsArray = JSON.parse(storedPasswords);
      password_lists.innerHTML = "";
      passwordsArray.forEach((savedPassword) => {
        addPasswordToDOM(savedPassword);
      });
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const upper =
      "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz1234567890@#$%^&*()_+[]-=|!";

    const lengthValue = parseInt(length.value, 10);
    if (isNaN(lengthValue) || lengthValue <= 0) {
      alert("Please enter a valid password length.");
      return;
    }

    let pass = "";
    for (let i = 0; i < lengthValue; i++) {
      let random = Math.floor(Math.random() * upper.length);
      pass += upper[random];
    }

    const newPassword = password.value + " : " + pass;

    let passwordsArray = JSON.parse(localStorage.getItem("passwords")) || [];
    passwordsArray.push(newPassword);

    localStorage.setItem("passwords", JSON.stringify(passwordsArray));

    addPasswordToDOM(newPassword);
  });

  function addPasswordToDOM(passwordText, index) {
    const passwordItem = document.createElement("div");
    passwordItem.innerHTML = `
      <p>${passwordText}</p>
      <button class="delete" data-index="${index}">❌</button>
    `;
    password_lists.appendChild(passwordItem);
    passwordItem.querySelector(".delete").addEventListener("click", () => {
      deletePassword(index);
    });
  }

  function deletePassword(index) {
    let passwordsArray = JSON.parse(localStorage.getItem("passwords")) || [];
    passwordsArray.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(passwordsArray));
    loadPasswords();
  }
  loadPasswords();
});
document.getElementById("clear").addEventListener("click", () => {
  localStorage.removeItem("passwords");
  document.getElementById("passwords").innerHTML = "";
});
