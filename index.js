  //acha o meu popup na tela
const popup = document.querySelector(".popup")
//pega o botão de editar
const editButton = document.querySelector (".content__button-icon")
//adiciona um evento de click no botão
editButton.addEventListener("click", function openPopup () {
//muda a classe do popup
popup.classList.add ("popup_opened")
inputName.value = profileName.textContent
inputAbout.value = profileAbout.textContent
})

//acha o botão de fechar
const closeButton = document.querySelector(".popup__close-button")
closeButton.addEventListener("click", function closePopup () {
  //remove o meu pop up mudando a classe
  popup.classList.remove ("popup_opened")
  })

//vai buscar no formulário o meu id name e about
  const formPopup = document.querySelector (".popup__form")
  const inputName = formPopup.querySelector ("#name")
  const inputAbout = formPopup.querySelector ("#about")

// vai buscar o nome do usuário e sobre
const profileName = document.querySelector(".content__text-name")
const profileAbout = document.querySelector(".content__text-description")


//vai buscar o botão de salvar
const saveButton = formPopup.querySelector(".popup__save-button")
//parei de atualizar a página
  function updateUserInfo (stopsave) {
    stopsave.preventDefault()
    //trocando o nome do input no perfil
    profileName.textContent = inputName.value
    profileAbout.textContent = inputAbout.value
  }

  saveButton.addEventListener("click", updateUserInfo)
