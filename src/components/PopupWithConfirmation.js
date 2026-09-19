import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._formElement.querySelector(".popup__button");
    this._buttonText = this._submitButton.textContent;
  }

  open(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  renderLoading(isLoading, loadingText) {
    this._submitButton.textContent = isLoading ? loadingText : this._buttonText;
  }
}
