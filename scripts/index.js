import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import {
  popup,
  addcard,
  editButton,
  addButton,
  closeButton,
  closeAddbutton,
  formPopup,
  inputName,
  inputAbout,
  formAddcard,
  inputLocal,
  inputLink,
  profileName,
  profileAbout,
  saveButton,
  cardList,
  initialCards,
  imagePopup,
  imagePopupCloseButton,
  openImagePopup
} from "./utils.js"

imagePopupCloseButton.addEventListener("click", () => {
  imagePopup.classList.remove("imagepopup_opened");
});

editButton.addEventListener("click", function openPopup() {
  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
});

addButton.addEventListener("click", function openAddcard() {
  addcard.classList.add("addcard_opened");
  inputLocal.value = "";
  inputLink.value = "";
});

closeButton.addEventListener("click", () => popup.classList.remove("popup_opened"));
closeAddbutton.addEventListener("click", () => addcard.classList.remove("addcard_opened"));

saveButton.classList.toggle("error__button", saveButton.disabled);

function updateUserInfo(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popup.classList.remove("popup_opened");
}
formPopup.addEventListener("submit", updateUserInfo);


function adicionarCardsIniciais() {
  initialCards.forEach(cardData => {

    const newC = new Card({
      card: cardData, templateCard: "#card-template",
      openImagePopup,
    })

    cardList.appendChild(newC.createCard());
  });
}
document.addEventListener("DOMContentLoaded", adicionarCardsIniciais);


function adicionarNovoCard(event) {
  event.preventDefault();

  const title = inputLocal.value;
  const link = inputLink.value;

  if (title && link) {
    const newCard = new Card({
      card: { name: title, link }, templateCard: "#card-template",
      openImagePopup,
    })

    cardList.prepend(newCard.createCard()); // Adiciona o novo card no início da lista
    addcard.classList.remove("addcard_opened"); // Fecha o popup
  }
}
formAddcard.addEventListener("submit", adicionarNovoCard);


addButton.addEventListener("click", function openAddCardPopup() {
  addcard.classList.add("addcard_opened");
  inputLocal.value = "";
  inputLink.value = "";
});


closeAddbutton.addEventListener("click", () => addcard.classList.remove("addcard_opened"));


addcard.addEventListener("click", (event) => {
  if (event.target === addcard) {
    addcard.classList.remove("addcard_opened");
  }
});

imagePopup.addEventListener("click", (event) => {
  if (event.target === imagePopup) {
    imagePopup.classList.remove("imagepopup_opened");
  }
});

popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.classList.remove("popup_opened");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {

    if (popup.classList.contains("popup_opened")) {
      popup.classList.remove("popup_opened");
    }
    if (addcard.classList.contains("addcard_opened")) {
      addcard.classList.remove("addcard_opened");
    }
    if (imagePopup.classList.contains("imagepopup_opened")) {
      imagePopup.classList.remove("imagepopup_opened");
    }
  }
});

new FormValidator({
  config: {
    inputSelector: "input",
    submitButtonSelector: "button",
    inactiveButtonClass: "error__button",
    inputErrorClass: "popup__input-error",
    errorClass: "error__message",
  },
  formSelector: "#user-form"
}).enableValidation()

new FormValidator({
  config: {
    inputSelector: "input",
    submitButtonSelector: "button",
    inactiveButtonClass: "error__button",
    inputErrorClass: "popup__input-error",
    errorClass: "error__message",
  },
  formSelector: "#card-form"
}).enableValidation()