export class Card {
    constructor({ cardData, template, handleCardClick, handleCardDelete, handleCardLike }) {
        this._template = template;
        this._cardData = cardData;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._template)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', () => { this._handleCardClick(this._cardData.name) })
        this._element.querySelector('.element__delete-button').addEventListener('click', () => { this._handleCardDelete(this._cardData.name) })
        this._element.querySelector('.element__like-button').addEventListener('click', () => { this._handleCardLike(this._cardData.likes.length) })
    }

    generate() {
        this._element = this._getElement();
        this._setEventListeners()
        this._element.querySelector('.element__image').src = this._cardData.link;
        this._element.querySelector('.element__image').alt = this._cardData.link;
        this._element.querySelector('.element__title').textContent = this._cardData.name;
        this._element.querySelector('.element__likes').textContent = this._cardData.likes.length;
        return this._element
    }
}