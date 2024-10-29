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

  // Atualiza o título
  imagePopupTitle.textContent = title;

  // Remove a imagem anterior, mas mantém o título e o botão de fechar
  const existingImage = document.querySelector(".imagepopup__image");
  if (existingImage) {
    existingImage.remove();
  }

  // Adiciona a nova imagem e o botão de fechar ao overlay
  imagePopupOverlay.insertBefore(imageElement, imagePopupCloseButton);
  imagePopup.classList.add("imagepopup_opened");
}

//Fecha o popup de imagem ao clicar no botão de fechar
imagePopupCloseButton.addEventListener("click", () => {
imagePopup.classList.remove("imagepopup_opened");
});


//------------------------------------------------- ENCERRA AQUI


// Função para abrir o popup de edição
editButton.addEventListener("click", function openPopup() {
  popup.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
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

  // Adiciona evento de clique para abrir o popup de imagem
cardImage.addEventListener("click", () => openImagePopup(link, name));


  cardImage.src = link;
  cardImage.alt = `Imagem de ${name}`;
  cardTitle.textContent = name;

  // Função de curtir/descurtir o card
  let heartFull = false;
  heart.addEventListener("click", function () {
    if (!heartFull) {
    heart.src ="./images/BlackHeart.svg";
    } else {
      heart.src = "./images/VectorCoracao.svg";
    }
    heartFull = !heartFull;
  });

  // Função de remover o card
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
