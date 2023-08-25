export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._name = data.name;
    this._link = data.link;
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.card__like');
    this._buttonDelete = this._element.querySelector('.card__delete');
    this._cardDescription = this._element.querySelector('.card__description');
    this._cardImage = this._element.querySelector('.card__image');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners();
    this._cardDescription.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    return this._element;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeIcon() {
    this._buttonLike.classList.toggle('card_active');
  }

  _handleDeleteCard() {
    this._element.remove();
  }
}
