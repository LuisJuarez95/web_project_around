export class Card {
  constructor(
    { name, link, _id, isLiked, owner },
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    userId
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._ownerId = typeof owner === "string" ? owner : owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeButtonClick() {
    this._handleLikeClick(this);
  }

  _handleDeleteButtonClick() {
    this._handleDeleteClick(this);
  }

  _handleImageClick() {
    this._handleCardClick();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });

    if (this._ownerId === this._userId) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });
    }

    this._image.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this.setLikeStatus(this._isLiked);

    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();

    return this._element;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  setLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle("card__like-button_active", isLiked);
  }

  remove() {
    this._element.remove();
  }
}
