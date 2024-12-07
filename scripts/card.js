export default class Card {
  constructor({ card, templateCard, openImagePopup }) {
    this._card = card;
    this._templateCard = templateCard;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateCard).content.querySelector(".card__content").cloneNode(true)
    return cardTemplate
  }

  _setEventListeners() {

    this._element.querySelector(".card__info-icon").addEventListener("click", () => {

      if (this._element.querySelector(".card__info-icon").getAttribute("src") == "./images/Vectorheart.svg") {
        this._element.querySelector(".card__info-icon").setAttribute("src", "./images/BlackHeart.svg");
      } else {
        this._element.querySelector(".card__info-icon").setAttribute("src", "./images/Vectorheart.svg");
      }
    })

    this._element.querySelector(".card__trash-icon").addEventListener("click", (e) => {
      e.target.closest(".card__content").remove()
    })

    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._openImagePopup(this._card.link, this._card.name)
    })
  }

  createCard() {
    this._element = this._getTemplate()

    this._element.querySelector(".card__image").setAttribute("src", this._card.link)
    this._element.querySelector(".card__image").setAttribute("alt", this._card.name)
    this._element.querySelector(".card__info-title").textContent = this._card.name

    this._setEventListeners()
    return this._element
  }
}