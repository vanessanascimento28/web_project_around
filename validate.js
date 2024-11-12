function enableValidation(settings) {

  const forms = document.querySelectorAll(settings.formSelector);

  forms.forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
    });


    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const submitButton = form.querySelector(settings.submitButtonSelector);

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        validateInput(form, input, settings);
        toggleButtonState(inputs, submitButton, settings);
      });
    });

    toggleButtonState(inputs, submitButton, settings);
  });
}

function validateInput(form, input, settings) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
  } else {
    hideInputError(form, input, settings);
  }
}


function showInputError(form, input, errorMessage, settings) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}


function hideInputError(form, input, settings) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
}


function toggleButtonState(inputs, button, settings) {
  const hasInvalidInput = inputs.some(input => !input.validity.valid);

  if (hasInvalidInput) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
}


enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});
