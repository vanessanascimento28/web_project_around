// Seleciona elementos do DOM
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
const saveButton = formPopup.querySelector(".popup__save-button"); // Botão "Salvar" de perfil
const saveAddCardButton = formAddcard.querySelector(".addcard__save-button"); // Botão "Salvar" de adicionar card
const template = document.querySelector("template");
const cardList = document.querySelector(".card");

// Array de cards iniciais
const initialCards = [
  { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
  { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
  { name: "Parque Nacional da Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
];

// Seleciona o popup de imagem e o botão de fechar do popup
const imagePopup = document.querySelector(".imagepopup");
const imagePopupOverlay = document.querySelector(".imagepopup__overlay");
const imagePopupCloseButton = document.querySelector(".imagepopup__close-button");
const imagePopupTitle = document.querySelector(".imagepopup__title");

// Função para abrir o popup de imagem
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
    validateForm(); // Valida o formulário ao abrir o popup
  }
});

// Função para abrir o popup de adicionar card
addButton.addEventListener("click", function openAddcard() {
  addcard.classList.add("addcard_opened");
  inputLocal.value = ""; // Limpa o campo de título do formulário
  inputLink.value = ""; // Limpa o campo de link do formulário
  validateAddCardForm();  // Valida o formulário ao abrir o pop-up
});

// Função para fechar os popups
closeButton.addEventListener("click", () => popup.classList.remove("popup_opened"));
closeAddbutton.addEventListener("click", () => addcard.classList.remove("addcard_opened"));

// Função de validação do formulário de edição
function validateForm() {
  const isNameValid = inputName.value.length >= 2 && inputName.value.length <= 40;
  const isAboutValid = inputAbout.value.length >= 2 && inputAbout.value.length <= 200;

  // Validar nome
  if (!isNameValid) {
    showErrorMessage(inputName, "Preencha este campo.");
  } else {
    removeErrorMessage(inputName);
  }

  // Validar sobre
  if (!isAboutValid) {
    showErrorMessage(inputAbout, "Preencha este campo.");
  } else {
    removeErrorMessage(inputAbout);
  }

  // Habilitar/desabilitar botão "Salvar"
  saveButton.disabled = !(isNameValid && isAboutValid);
  saveButton.classList.toggle("error__button", saveButton.disabled);
}

// Função para mostrar a mensagem de erro
function showErrorMessage(inputElement, message) {
  const existingError = inputElement.nextElementSibling;
  if (existingError && existingError.classList.contains("error__message")) {
    return;
  }

  const errorElement = document.createElement("span");
  errorElement.classList.add("error__message");
  errorElement.textContent = message;
  inputElement.insertAdjacentElement("afterend", errorElement);
}

// Função para remover mensagens de erro
function removeErrorMessage(inputElement) {
  const existingError = inputElement.nextElementSibling;
  if (existingError && existingError.classList.contains("error__message")) {
    existingError.remove();
  }
}

// Evento para ativar validação ao digitar
inputName.addEventListener("input", validateForm);
inputAbout.addEventListener("input", validateForm);

// Atualiza informações do usuário no popup de edição
function updateUserInfo(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popup.classList.remove("popup_opened");
}
formPopup.addEventListener("submit", updateUserInfo);

// Função para criar um card
function createCard(name, link) {
  const cardClone = template.content.cloneNode(true);

  const cardImage = cardClone.querySelector(".card__image");
  const cardTitle = cardClone.querySelector(".card__info-title");
  const heart = cardClone.querySelector(".card__info-icon");
  const trashIcon = cardClone.querySelector(".card__trash-icon");

  cardImage.addEventListener("click", () => openImagePopup(link, name));

  cardImage.src = link;
  cardImage.alt = `Imagem de ${name}`;
  cardTitle.textContent = name;

  let heartFull = false;
  heart.addEventListener("click", function () {
    heart.src = heartFull ? "./images/VectorCoracao.svg" : "./images/BlackHeart.svg";
    heartFull = !heartFull;
  });

  trashIcon.addEventListener("click", (event) => {
    event.target.closest(".card__content").remove();
  });

  return cardClone;
}

// Adiciona cards iniciais na página
function adicionarCardsIniciais() {
  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData.name, cardData.link);
    cardList.appendChild(cardElement);
  });
}
document.addEventListener("DOMContentLoaded", adicionarCardsIniciais);

// Função para adicionar um novo card personalizado no início da lista
function adicionarNovoCard(event) {
  event.preventDefault();

  const title = inputLocal.value;
  const link = inputLink.value;

  if (title && link) {
    const newCard = createCard(title, link);
    cardList.prepend(newCard); // Adiciona o novo card no início da lista
    addcard.classList.remove("addcard_opened"); // Fecha o popup
  }
}
formAddcard.addEventListener("submit", adicionarNovoCard);

// Função para validar o formulário de adicionar card
function validateAddCardForm() {
  const isTitleValid = inputLocal.value.length >= 2 && inputLocal.value.length <= 30;
  const isUrlValid = isValidUrl(inputLink.value);

  // Remover mensagens de erro anteriores
  removeAddCardErrorMessages();

  // Exibir mensagens de erro para os campos inválidos
  if (inputLocal.value && !isTitleValid) {
    showAddCardErrorMessage(inputLocal, "Preencha este campo.");
  }
  if (inputLink.value && !isUrlValid) {
    showAddCardErrorMessage(inputLink, "Por favor, insira um endereço web.");
  }

  // Habilitar ou desabilitar o botão de salvar com base na validade dos campos
  saveAddCardButton.disabled = !(isTitleValid && isUrlValid);
  saveAddCardButton.classList.toggle("error__button", saveAddCardButton.disabled);
}

// URL VÁLIDA
function isValidUrl(url) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}

// MENSAGENS DE ERRO
function showAddCardErrorMessage(inputElement, message) {
  const existingError = inputElement.nextElementSibling;
  if (existingError && existingError.classList.contains("error__message")) {
    return;
  }

  const errorElement = document.createElement("span");
  errorElement.classList.add("error__message");
  errorElement.textContent = message;
  inputElement.insertAdjacentElement("afterend", errorElement);
}

// REMOVER MENSAGEM DE ERRO
function removeAddCardErrorMessages() {
  const errorMessages = document.querySelectorAll(".error__message");
  errorMessages.forEach((error) => error.remove());
}

// VALIDAÇÃO USUÁRIO DIGITA
inputLocal.addEventListener("input", validateAddCardForm);
inputLink.addEventListener("input", validateAddCardForm);

// ABRE POP UP ADD CARD
addButton.addEventListener("click", function openAddCardPopup() {
  addcard.classList.add("addcard_opened");
  inputLocal.value = ""; // Limpa o campo de título
  inputLink.value = "";   // Limpa o campo de URL
  validateAddCardForm();  // Valida o formulário ao abrir o pop-up
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
