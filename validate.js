function checkInputValidity(input, config) {

  if (!input.validity.valid) {
    showErrorMessage(input, input.validationMessage, config);

  }
  else {
    if (input.id == "link") {
      if (!isValidUrl(input.value)) {
        showErrorMessage(input, "Formato de Url inválido");
        return
      }
    }
    removeErrorMessage(input, config)

  };

}

function showErrorMessage(inputElement, message, config) {
  const existingError = inputElement.nextElementSibling;

  existingError.classList.add(config.errorClass);
  existingError.textContent = message;
}

function removeErrorMessage(inputElement, config) {
  const existingError = inputElement.nextElementSibling;
  existingError.classList.remove(config.errorClass);
  existingError.textContent = "";
}


// URL VÁLIDA
function isValidUrl(url) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}

function enableButtonState(submitButton, config) {
  submitButton.classList.remove(config.inactiveButtonClass);
  submitButton.removeAttribute("disabled");
}

function disabledButtonState(submitButton, config) {
  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.setAttribute("disabled", true);
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => event.preventDefault());

    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, config);

        if (inputs.every(i => i.validity.valid)) {

          enableButtonState(submitButton, config)
          return
        }

        disabledButtonState(submitButton, config)
      });
    });

  });
}

enableValidation({
  formSelector: "form",
  inputSelector: "input",
  submitButtonSelector: "button",
  inactiveButtonClass: "error__button",
  inputErrorClass: "popup__input-error",
  errorClass: "error__message",
});
