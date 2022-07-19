export default class Card {
  constructor({ card, user, template, handleCardClick, handleDeleteClick, handleLikeClick }) {
    this._card = card;
    this._userId = user._id;
    this._templateSelector = template;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _likedByUser() {
    return this._card.likes.some(like => like._id === this._userId);
  }

  _createdByUser() {
    return this._card.owner._id === this._userId;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });

    if (this._createdByUser()) {
      this._element.querySelector('.element__delete-button').addEventListener('click', () => {
        this._handleDeleteClick();
      });
    } else {
      this._element.querySelector('.element__delete-button').remove();
    }

    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._handleLikeClick(this._card._id, evt.target);
    });
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._card.name;
    this._element.querySelector('.element__image').alt = this._card.name;
    this._element.querySelector('.element__image').src = this._card.link;
    if (this._likedByUser()) {
      this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
    }

    this._element.querySelector('.element__likes').textContent = this._card.likes.length;

    return this._element;
  }
}