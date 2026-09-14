export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._validationConfig.submitButtonSelector
    );
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);

    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);

    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._validationConfig.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    const hasInvalidInput = this._hasInvalidInput();

    this._buttonElement.disabled = hasInvalidInput;
    this._buttonElement.classList.toggle(
      this._validationConfig.inactiveButtonClass,
      hasInvalidInput
    );
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
