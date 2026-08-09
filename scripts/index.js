const popupEditProfile = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = popupEditProfile.querySelector(".popup__close");
const editFormElement = popupEditProfile.querySelector(".popup__form");
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const aboutInput = editFormElement.querySelector(".popup__input_type_about");

const saveButton = editFormElement.querySelector(".popup__save-button");

const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");

const likeButtons = document.querySelectorAll(".card__like-button");

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

editButton.addEventListener("click", handleEditProfileClick);
closeButton.addEventListener("click", () => closePopup(popupEditProfile));
editFormElement.addEventListener("submit", handleProfileFormSubmit);
nameInput.addEventListener("input", updateSaveButtonState);
aboutInput.addEventListener("input", updateSaveButtonState);

likeButtons.forEach((button) => button.addEventListener("click", handleLikeButtonClick));
