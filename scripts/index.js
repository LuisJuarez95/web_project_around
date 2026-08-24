const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "./images/yosemite-valley.jpg",
  },
  {
    name: "Lago Louise",
    link: "./images/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "./images/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "./images/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "./images/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago-di-braies.jpg",
  },
];

const popupEditProfile = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = popupEditProfile.querySelector(".popup__close");
const editFormElement = popupEditProfile.querySelector(".popup__form");
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const aboutInput = editFormElement.querySelector(".popup__input_type_about");

const saveButton = editFormElement.querySelector(".popup__save-button");

const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");

const cardTemplate = document.querySelector(".card-template").content;
const cardsList = document.querySelector(".cards__list");

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function updateSaveButtonState() {
  const hasData = nameInput.value.trim() !== "" && aboutInput.value.trim() !== "";
  saveButton.classList.toggle("popup__save-button_active", hasData);
}

function handleEditProfileClick() {
  nameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
  updateSaveButtonState();
  openPopup(popupEditProfile);
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = aboutInput.value;

  closePopup(popupEditProfile);
}

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  cardLikeButton.addEventListener("click", handleLikeButtonClick);

  return cardElement;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.append(cardElement);
}

editButton.addEventListener("click", handleEditProfileClick);
closeButton.addEventListener("click", () => closePopup(popupEditProfile));
editFormElement.addEventListener("submit", handleProfileFormSubmit);
nameInput.addEventListener("input", updateSaveButtonState);
aboutInput.addEventListener("input", updateSaveButtonState);

initialCards.forEach(renderCard);
