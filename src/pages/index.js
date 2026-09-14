import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

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

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editFormElement = document.querySelector(".popup_type_edit .popup__form");
const newCardFormElement = document.querySelector(
  ".popup_type_new-card .popup__form"
);
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const aboutInput = editFormElement.querySelector(".popup__input_type_about");

const editFormValidator = new FormValidator(validationConfig, editFormElement);
const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardFormElement
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

const popupWithImage = new PopupWithImage(".popup_type_image");

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", () => {
        popupWithImage.open(cardData);
      });
      const cardElement = card.generateCard();

      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit",
  (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupEditProfile.close();
  }
);

const popupNewCard = new PopupWithForm(
  ".popup_type_new-card",
  (inputValues) => {
    const card = new Card(inputValues, "#card-template", () => {
      popupWithImage.open(inputValues);
    });
    const cardElement = card.generateCard();

    cardSection.addItem(cardElement);
    popupNewCard.close();
  }
);

function handleEditProfileClick() {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  editFormValidator.resetValidation();
  popupEditProfile.open();
}

function handleAddCardClick() {
  newCardFormValidator.resetValidation();
  popupNewCard.open();
}

editButton.addEventListener("click", handleEditProfileClick);
addButton.addEventListener("click", handleAddCardClick);

cardSection.renderItems();
popupEditProfile.setEventListeners();
popupNewCard.setEventListeners();
popupWithImage.setEventListeners();
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();
