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
  form: document.getElementById("inscription-form"),
  modalCloseButton: document.querySelectorAll(".close"),

  //Confirmation message
  confirmationMessage: document.querySelector(".confirmation-message"),

  //Form fields
  firstNameFormField: document.querySelector(".first"),
  lastNameFormField: document.querySelector(".last"),
  emailFormField: document.querySelector(".email"),
  birthdateFormField: document.querySelector(".birthdate"),
  quantityField: document.querySelector(".quantity"),
  locationField: document.querySelector(".location"),
  conditionField: document.querySelector(".user-condition"),

  //Form inputs
  firstNameInput: document.getElementById("first"),
  lastNameInput: document.getElementById("last"),
  emailInput: document.getElementById("email"),
  birthdateInput: document.getElementById("birthdate"),
  quantityInput: document.getElementById("quantity"),
  locationInputs: document.querySelectorAll(".checkbox-location"),
  conditionInput: document.getElementById("checkbox1")
};

// launch modal event
page.modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// cross close modal
page.modalCloseButton.forEach((btn) => btn.addEventListener("click", closeModal));

/**
 * Open form modal
 * @returns
 */
function launchModal() {
  page.modalbg.classList.remove("modal-out");
  page.modalbg.classList.add("modal-in");
}

/**
 * Close modal
 * @returns
 */
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
page.quantityField.addEventListener("focusout", checkQuantityField);

/**
 * Check FirstName
 * @returns 
 */
function checkFirstNameField() {
  let errorState = page.firstNameInput.textLength <= 2 ? "true" : "false";

  formErrorManagement(page.firstNameFormField, errorState);
  return errorState;
}

/**
 * Check LastName
 * @returns 
 */
function checkLastNameField() {
  let errorState = page.lastNameInput.textLength <= 2 ? "true" : "false";

  formErrorManagement(page.lastNameFormField, errorState);
  return errorState;
}

/**
 * Check email
 * @returns 
 */
function checkEmailField() {
  let emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

  let errorState = emailRegex.test(page.emailInput.value) ? "false" : "true";

  formErrorManagement(page.emailFormField, errorState);
  return errorState;
}

/**
 * Check validity of birthdate
 * @returns 
 */
function checkBirthDateField() {
  let birthdateEmail = /^\d{4}-\d{2}-\d{2}$/;

  let errorState = birthdateEmail.test(page.birthdateInput.value) ? false : true;
  if (!errorState) {
    let date = new Date(page.birthdateInput.value + "T00:00:00");

    if (date > new Date()){
      errorState = true;
    }
  }

  formErrorManagement(page.birthdateFormField, errorState ? "true" : "false");
  return errorState ? "true" : "false";
}

/**
 * Check if a positive number is input
 * @returns 
 */
function checkQuantityField(){
  let errorState = page.quantityInput.value && page.quantityInput.value >= 0 ? "false" : "true";

  formErrorManagement(page.quantityField, errorState);
  return errorState;
}

/**
 * check if one location is checked
 * @returns
 */
function checkLocationInput(){

  let isOneChecked = 0;
  for (const location of page.locationInputs) {
    if (location.checked){
      isOneChecked = 1;
    }
  }

  let errorState = isOneChecked ? "false" : "true";

  formErrorManagement(page.locationField, errorState);
  return errorState;
}

/**
 * Check CGU
 * @returns 
 */
function checkCondition(){
  let errorState = page.conditionInput.checked ? "false" : "true";

  formErrorManagement(page.conditionField, errorState);
  return errorState;
}

/**
 * Make error appear or disappear for form
 * @param {*} formElement 
 * @param {string} state 
 */
function formErrorManagement(formElement, state) {
  formElement.setAttribute("data-error-visible", state);
}

/**
 * Inscription validation form
 * @returns bool
 */
function validateForm() {

  let isErrors = 0;

  //Check each field to display each error
  isErrors += checkFirstNameField() == "true" ? 1 : 0;
  isErrors += checkLastNameField() == "true" ? 1 : 0;
  isErrors += checkEmailField() == "true" ? 1 : 0;
  isErrors += checkBirthDateField() == "true" ? 1 : 0;
  isErrors += checkQuantityField() == "true" ? 1 : 0;
  isErrors += checkLocationInput() == "true" ? 1 : 0;
  isErrors += checkCondition() == "true" ? 1 : 0;

  if (isErrors > 0){
    return false;
  }

  closeModal();
  page.confirmationMessage.classList.add("confirmation-message-visible");

  //Send form with AJAX

  page.form.reset();
  return false;
}