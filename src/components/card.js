export class Card {
    constructor({ userInfo, cardData, template, handleCardClick, handleCardDelete, handleCardLike }) {
        this._template = template;
        this._cardData = cardData;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._userInfo = userInfo;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._template)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    addLike(data) {
        this._element.querySelector('.element__like-button').classList.add('element__like-button_liked_true')
        this._element.querySelector('.element__likes').textContent = data.likes.length;
    }

    removeLike(data) {
        this._element.querySelector('.element__like-button').classList.remove('element__like-button_liked_true')
        this._element.querySelector('.element__likes').textContent = data.likes.length;
    }

    isLiked(userID) {
        return this._cardData.likes.some(item =>
            item._id === userID
        )
    }

    _createdByUser() {
        return this._userInfo._id === this._cardData.owner._id
    }

    _setEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', () => { this._handleCardClick(this._cardData) })
        this._element.querySelector('.element__delete-button').addEventListener('click', () => { this._handleCardDelete(this._cardData.owner._id, this._cardData._id) })
        this._element.querySelector('.element__like-button').addEventListener('click', (event) => { this._handleCardLike(this._cardData.likes, this._userInfo._id, this._cardData._id, event.target) })
    }

    generate() {
        this._element = this._getElement();
        this._setEventListeners()
        this._element.querySelector('.element__image').src = this._cardData.link;
        this._element.querySelector('.element__image').alt = this._cardData.link;
        this._element.querySelector('.element__title').textContent = this._cardData.name;
        this._element.querySelector('.element__likes').textContent = this._cardData.likes.length;
        if (this._userInfo._id !== this._cardData.owner._id) {
            this._element.querySelector('.element__delete-button').remove();
        }
        if (this.isLiked(this._userInfo._id)) {
            this.addLike(this._cardData)
        }

        return this._element
    }
}