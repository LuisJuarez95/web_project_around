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
const editFormElement = popupEditProfile.querySelector(".popup__form");
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const aboutInput = editFormElement.querySelector(".popup__input_type_about");

const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");

const popupNewCard = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const newCardFormElement = popupNewCard.querySelector(".popup__form");
const cardNameInput = newCardFormElement.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardFormElement.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaptionElement = popupImage.querySelector(".popup__caption");

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function handleEditProfileClick() {
  nameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
  resetValidation(editFormElement, validationConfig);
  openPopup(popupEditProfile);
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

function handleDeleteButtonClick(evt) {
  evt.target.parentElement.remove();
}

function handleCardImageClick(evt) {
  popupImageElement.src = evt.target.src;
  popupImageElement.alt = evt.target.alt;
  popupCaptionElement.textContent = evt.target.alt;
  openPopup(popupImage);
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
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  cardLikeButton.addEventListener("click", handleLikeButtonClick);
  cardDeleteButton.addEventListener("click", handleDeleteButtonClick);
  cardImageElement.addEventListener("click", handleCardImageClick);

  return cardElement;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.append(cardElement);
}

function handleAddCardClick() {
  newCardFormElement.reset();
  resetValidation(newCardFormElement, validationConfig);
  openPopup(popupNewCard);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const cardElement = createCard(cardData);
  cardsList.prepend(cardElement);

  closePopup(popupNewCard);
}

editButton.addEventListener("click", handleEditProfileClick);
editFormElement.addEventListener("submit", handleProfileFormSubmit);

addButton.addEventListener("click", handleAddCardClick);
newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);

document.querySelectorAll(".popup").forEach((popupElement) => {
  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popupElement);
    }
  });

  popupElement.querySelector(".popup__close").addEventListener("click", () => closePopup(popupElement));
});

initialCards.forEach(renderCard);

enableValidation(validationConfig);
