import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { closePopup, openPopup, setPopupEventListeners } from "./utils.js";

const initialCards = [
  { name: "Valle de Yosemite", link: "./images/yosemite-valley.jpg" },
  { name: "Lago Louise", link: "./images/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "./images/bald-mountains.jpg" },
  { name: "Latemar", link: "./images/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "./images/vanoise.jpg" },
  { name: "Lago di Braies", link: "./images/lago-di-braies.jpg" },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");
const cardsList = document.querySelector(".cards__list");

const editFormElement = popupEditProfile.querySelector(".popup__form");
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const aboutInput = editFormElement.querySelector(".popup__input_type_about");
const newCardFormElement = popupNewCard.querySelector(".popup__form");
const cardNameInput = newCardFormElement.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = newCardFormElement.querySelector(
  ".popup__input_type_url"
);
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaptionElement = popupImage.querySelector(".popup__caption");

const editFormValidator = new FormValidator(validationConfig, editFormElement);
const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardFormElement
);

function handleCardImageClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;
  openPopup(popupImage);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);

  return card.generateCard();
}

function renderCard(cardData) {
  cardsList.append(createCard(cardData));
}

function handleEditProfileClick() {
  nameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
  editFormValidator.resetValidation();
  openPopup(popupEditProfile);
}

function handleAddCardClick() {
  newCardFormElement.reset();
  newCardFormValidator.resetValidation();
  openPopup(popupNewCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  cardsList.prepend(createCard(cardData));
  closePopup(popupNewCard);
}

editButton.addEventListener("click", handleEditProfileClick);
addButton.addEventListener("click", handleAddCardClick);
editFormElement.addEventListener("submit", handleProfileFormSubmit);
newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);

initialCards.forEach(renderCard);
setPopupEventListeners();
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();
