function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const page = {

  // DOM Elements
  modalbg: document.querySelector(".bground"),
  modalBtn: document.querySelectorAll(".modal-btn"),
  formData: document.querySelectorAll(".formData"),
  modalCloseButton: document.querySelectorAll(".close"),

  //Form fields
  firstNameFormField: document.querySelector(".first"),
  lastNameFormField: document.querySelector(".last"),
  emailFormField: document.querySelector(".email"),
  birthdateFormField: document.querySelector(".birthdate"),

  //Form inputs
  firstNameInput: document.getElementById("first"),
  lastNameInput: document.getElementById("last"),
  emailInput: document.getElementById("email"),
  birthdateInput: document.getElementById("birthdate")
};


//TODO: Page object

// launch modal event
page.modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// cross close modal
page.modalCloseButton.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  page.modalbg.classList.remove("modal-out");
  page.modalbg.classList.add("modal-in");
}

// close modal function
function closeModal() {
  page.modalbg.classList.add("modal-out");
  setTimeout(function () {
    page.modalbg.classList.remove("modal-in");
  }, 800);
}

page.firstNameFormField.addEventListener("focusout", checkFirstNameField);
page.lastNameFormField.addEventListener("focusout", checkLastNameField);
page.emailFormField.addEventListener("focusout", checkEmailField);
page.birthdateFormField.addEventListener("focusout", checkBirthDateField);


function checkFirstNameField() {
  let errorState = page.firstNameInput.textLength <= 2 ? "true" : "false";

  formErrorManagement(page.firstNameFormField, errorState);
}

function checkLastNameField() {
  let errorState = page.lastNameInput.textLength <= 2 ? "true" : "false";

  formErrorManagement(page.lastNameFormField, errorState);
}

function checkEmailField() {
  let emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

  let errorState = emailRegex.test(page.emailInput) ? "false" : "true";

  formErrorManagement(page.emailFormField, errorState);
}

function checkBirthDateField() {
  let birthdateEmail = /^\d{4}-\d{2}-\d{2}$/;//Verif si pas dans le futur

  let errorState = birthdateEmail.test(page.birthdateInput.value) ? false : true;
  if (!errorState) {
    let date = new Date(page.birthdateInput.value + "T00:00:00");

    if (date > new Date()){
      errorState = true;
    }
  }

  formErrorManagement(page.birthdateFormField, errorState ? "true" : "false");
}

function formErrorManagement(formElement, state) {
  formElement.setAttribute("data-error-visible", state);
}

//validate form
function validateForm() {

  checkFirstNameField();
  checkLastNameField();
  checkEmailField();
  checkBirthDateField();

  console.log('test');
  return false;
}