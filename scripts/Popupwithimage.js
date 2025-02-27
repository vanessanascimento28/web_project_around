class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.imagepopup__image');
    this._caption = this._popup.querySelector('.imagepopup__title');
  }

  open(imageSrc, imageCaption) {
    super.open();

    this._image.src = imageSrc;
    this._image.alt = imageCaption;
    this._caption.textContent = imageCaption;
  }
}
