import Popup from "./Popup.js";

export default class Popupwithconfirmation extends Popup {
  constructor(popupSelector, deleteBtn) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._deleteBtn = deteleBtn;
  }
}