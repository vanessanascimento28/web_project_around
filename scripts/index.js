import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import Userinfo from "./Userinfo.js";
import PopupWithForm from "./Popupwithform.js";
import PopupWithImage from "./Popupwithimage.js";
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
} from "./utils.js"

const handleCardClick = (link, name) => {
};


imagePopupCloseButton.addEventListener("click", () => {
  imagePopup.classList.remove("imagepopup_opened");
});


closeButton.addEventListener("click", () => popup.classList.remove("popup_opened"));

saveButton.classList.toggle("error__button", saveButton.disabled);

const userInfo = new Userinfo({
  name: ".content__text-name",
  about: ".content__text-description"
})

function showItens(card) {
  console.log(card)
  const newCard = new Card({
    card: card,
    templateCard: "#card-template",
    handleCardClick: handleCardClick,
    handleImageClick: clickImage,
  });
  cardList.appendChild(newCard.createCard());
}

const popupWithImage = new PopupWithImage(".imagepopup");

function clickImage(card) {
  popupWithImage.open(card);
}

const section = new Section({
  items: initialCards,
  renderer: showItens
}, ".card");

section.renderItems();


function addNewCard(event) {
  event.preventDefault();

  const title = inputLocal.value;
  const link = inputLink.value;

  if (title && link) {
    const newCard = new Card({
      card: { name: title, link },
      templateCard: "#card-template",
      handleCardClick,
      handleImageClick: clickImage,
    });

    cardList.prepend(newCard.createCard());
    addcard.classList.remove("addcard_opened");
  }
}
formAddcard.addEventListener("submit", addNewCard);

popupWithImage.setEventListeners();

const popupWithFormUser = new PopupWithForm({
  popupSelector: ".popup",
  handleFormSubmit: (formData) => {
    console.log("Dados do formulário:", formData);
    userInfo.setUserInfo(formData);
  },
});

popupWithFormUser.setEventListeners();

editButton.addEventListener("click", () => {
  popupWithFormUser.open()
})

const popupWithFormImage = new PopupWithForm({
  popupSelector: ".addcard",
  handleFormSubmit: (formData) => {
    console.log("Dados do formulário:", formData);
    //form data pro new card
  },
});

popupWithFormImage.setEventListeners();

addButton.addEventListener("click", () => {
  popupWithFormImage.open()
})


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