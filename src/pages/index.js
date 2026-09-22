import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "01e495f8-537b-4af3-ae25-a42395fc8d4d",
    "Content-Type": "application/json",
  },
});

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-button");
const editFormElement = document.querySelector(".popup_type_edit .popup__form");
const newCardFormElement = document.querySelector(
  ".popup_type_new-card .popup__form"
);
const avatarFormElement = document.querySelector(
  ".popup_type_avatar .popup__form"
);
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const aboutInput = editFormElement.querySelector(".popup__input_type_about");

const editFormValidator = new FormValidator(validationConfig, editFormElement);
const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardFormElement
);
const avatarFormValidator = new FormValidator(
  validationConfig,
  avatarFormElement
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

const popupWithImage = new PopupWithImage(".popup_type_image");
const popupWithConfirmation = new PopupWithConfirmation(
  ".popup_type_confirmation"
);

let userId;
let cardSection;

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    () => {
      popupWithImage.open(cardData);
    },
    (cardElement) => {
      api
        .changeLikeCardStatus(cardElement.getId(), cardElement.isLiked())
        .then((updatedCard) => {
          cardElement.setLikeStatus(updatedCard.isLiked);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (cardElement) => {
      popupWithConfirmation.open(() => {
        popupWithConfirmation.renderLoading(true, "Eliminando...");

        api
          .deleteCard(cardElement.getId())
          .then(() => {
            cardElement.remove();
            popupWithConfirmation.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupWithConfirmation.renderLoading(false);
          });
      });
    },
    userId
  );

  return card.generateCard();
}

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit",
  (inputValues) => {
    popupEditProfile.renderLoading(true, "Guardando...");

    api
      .editUserInfo(inputValues)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  }
);

const popupNewCard = new PopupWithForm(
  ".popup_type_new-card",
  (inputValues) => {
    popupNewCard.renderLoading(true, "Guardando...");

    api
      .addCard(inputValues)
      .then((cardData) => {
        cardSection.addItem(createCard(cardData));
        popupNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupNewCard.renderLoading(false);
      });
  }
);

const popupAvatar = new PopupWithForm(
  ".popup_type_avatar",
  (inputValues) => {
    popupAvatar.renderLoading(true, "Guardando...");

    api
      .updateAvatar(inputValues)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
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

function handleAvatarClick() {
  avatarFormValidator.resetValidation();
  popupAvatar.open();
}

editButton.addEventListener("click", handleEditProfileClick);
addButton.addEventListener("click", handleAddCardClick);
avatarButton.addEventListener("click", handleAvatarClick);

popupEditProfile.setEventListeners();
popupNewCard.setEventListeners();
popupAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

api
  .getAppInfo()
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);

    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          cardSection.addItem(createCard(cardData));
        },
      },
      ".cards__list"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
