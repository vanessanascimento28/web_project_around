import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    console.log(handleFormSubmit)
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(`${this._popupSelector}__form`);
    this._inputList = Array.from(this._form.querySelectorAll(`${this._popupSelector}__input`));
    this._submitButton = this._form.querySelector(`${this._popupSelector}__save-button`);
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    console.log("inputlist", this._inputList)
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._toggleLoading(true);
      this._handleFormSubmit(this._getInputValues())
    });
  }

  _toggleLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Salvando...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}