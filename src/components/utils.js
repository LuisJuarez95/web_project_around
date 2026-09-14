function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");

    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

export function setPopupEventListeners() {
  const popupList = document.querySelectorAll(".popup");

  popupList.forEach((popupElement) => {
    popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popupElement);
      }
    });

    popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => closePopup(popupElement));
  });
}
