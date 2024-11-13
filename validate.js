
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => event.preventDefault());

    const inputs = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(form, input, config);
        toggleButtonState(inputs, submitButton, config);
      });
    });

    toggleButtonState(inputs, submitButton, config);
  });
}

enableValidation({
  formSelector: ".popup__form, .addcard__form",
  inputSelector: ".popup__input, .addcard__input",
  submitButtonSelector: ".popup__button, .popup__save-button",
  inactiveButtonClass: "popup__button_disabled, .error__button",
  inputErrorClass: ".popup__input-error, .addcard__input-error",
  errorClass: ".error__message"
});
