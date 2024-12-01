import Card from "./card.js";


const popup = document.querySelector(".popup");
const addcard = document.querySelector(".addcard");
const editButton = document.querySelector(".content__button");
const addButton = document.querySelector(".content__addbutton");
const closeButton = document.querySelector(".popup__close-button");
const closeAddbutton = document.querySelector(".addcard__close-button");
const formPopup = document.querySelector(".popup__form");
const inputName = formPopup.querySelector("#name");
const inputAbout = formPopup.querySelector("#about");
const formAddcard = document.querySelector(".addcard__form");
const inputLocal = formAddcard.querySelector("#local");
const inputLink = formAddcard.querySelector("#link");
const profileName = document.querySelector(".content__text-name");
const profileAbout = document.querySelector(".content__text-description");
const saveButton = formPopup.querySelector(".popup__save-button");
const saveAddCardButton = formAddcard.querySelector(".addcard__save-button");
const template = document.querySelector("template");
const cardList = document.querySelector(".card");

// ------------------------------------ CARD INICIAIS
const initialCards = [
  { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
  { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
  { name: "Parque Nacional da Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
];

// --------------------------------------- POP IMAGEM E FECHA BOTAO

const imagePopup = document.querySelector(".imagepopup");
const imagePopupOverlay = document.querySelector(".imagepopup__overlay");
const imagePopupCloseButton = document.querySelector(".imagepopup__close-button");
const imagePopupTitle = document.querySelector(".imagepopup__title");

// --------------------------------------- ABRE POP IMAGEM
function openImagePopup(imageSrc, title) {
  const imageElement = document.createElement("img");
  imageElement.src = imageSrc;
  imageElement.classList.add("imagepopup__image");

  imagePopupTitle.textContent = title;

  const existingImage = document.querySelector(".imagepopup__image");
  if (existingImage) {
    existingImage.remove();
  }

  imagePopupOverlay.insertBefore(imageElement, imagePopupCloseButton);
  imagePopup.classList.add("imagepopup_opened");
}

// Fecha o popup de imagem ao clicar no botão de fechar
imagePopupCloseButton.addEventListener("click", () => {
  imagePopup.classList.remove("imagepopup_opened");
});

// Função para abrir o popup de edição
editButton.addEventListener("click", function openPopup() {
  // Verifica se o popup está fechado antes de abrir
  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
});

// Função para abrir o popup de adicionar card
addButton.addEventListener("click", function openAddcard() {
  addcard.classList.add("addcard_opened");
  inputLocal.value = ""; // Limpa o campo de título do formulário
  inputLink.value = ""; // Limpa o campo de link do formulário
});

// Função para fechar os popups
closeButton.addEventListener("click", () => popup.classList.remove("popup_opened"));
closeAddbutton.addEventListener("click", () => addcard.classList.remove("addcard_opened"));

// Habilitar/desabilitar botão "Salvar"
//saveButton.disabled = !();
saveButton.classList.toggle("error__button", saveButton.disabled);


// Atualiza informações do usuário no popup de edição
function updateUserInfo(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popup.classList.remove("popup_opened");
}
formPopup.addEventListener("submit", updateUserInfo);

// Adiciona cards iniciais na página
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

// Função para adicionar um novo card personalizado no início da lista
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

// ABRE POP UP ADD CARD
addButton.addEventListener("click", function openAddCardPopup() {
  addcard.classList.add("addcard_opened");
  inputLocal.value = ""; // Limpa o campo de título
  inputLink.value = "";   // Limpa o campo de URL
});

// FECHA O POP UP ADD CARD
closeAddbutton.addEventListener("click", () => addcard.classList.remove("addcard_opened"));

// FECHA O POP UP SE CLICAR NA OVERLAY
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

// FECHA O POP-UP SE CLICAR ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    // Fechar popups se estiverem abertos
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
