export { cardsContainer, createCard, deleteCard, hideDeleteButton, handleDeleteCard };
import { selectImage, popupConfirm } from './utils.js';
import { config, removeCard, getCardLikes, removeLikeCard, likeCard } from './api.js';
import { profileID } from '../pages/index.js';
import { openPopup, closePopup } from './modal.js';

const cardsContainer = document.querySelector('#cards');
const template = cardsContainer.querySelector('#card');
let cardToDelete;
let cardIdToDelete;

function createCard(attr, handleDelete) {
    const card = template.content.cloneNode(true).querySelector('.element');
    card.id = attr._id;
    card.querySelector('.element__title').textContent = attr.name;
    const deleteButton = card.querySelector('.element__delete-button');
    const cardImage = card.querySelector('.element__image');
    const cardLikes = card.querySelector('.element__likes');
    cardImage.setAttribute('src', `${attr.link}`);
    cardImage.setAttribute('alt', `${attr.name}`);

    if (attr.likes.length) {
        cardLikes.textContent = attr.likes.length;
    }
    if (attr.owner._id !== profileID.id) {
        hideDeleteButton(deleteButton)
    }
    Array.from(attr.likes).forEach((profileHasLike) => {
        if (profileHasLike._id === profileID.id) {
            card.querySelector('.element__like-button').classList.add('element__like-button_liked_true');
        }
    })
    deleteButton.addEventListener('click', (cardElement) => {
        handleDelete(cardElement, card.id)
    });
    card.querySelector('.element__like-button').addEventListener('click', (event) => {
        likeHandler(event, profileID.id, cardLikes);
    });
    cardImage.addEventListener('click', () => selectImage(attr));
    return card;
}

const handleDeleteCard = (cardElement, cardID) => {
    cardToDelete = cardElement;
    cardIdToDelete = cardID;
    openPopup(popupConfirm)
}

const confirmRemoveCardSubmit = (evt) => {
    evt.preventDefault();
    removeCard(config, cardIdToDelete)
        .then(cardID => {
            return cardID
        })
        .then(() => {
            handleRemoveCard(cardToDelete)
        })
        .then(() => {
            closePopup(popupConfirm);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
};

function handleRemoveCard(element) {
    element.target.closest('.element').remove();
}

function likeHandler(event, profileID, cardLikes) {
    getCardLikes(config, event, cardLikes, profileID)
        .then(data => {
            return data.find((card) => {
                if (card._id === event.target.closest('.element').id) {
                    return card.likes
                }
            })
        })
        .then(data => {
            const profileLiked = data.likes.some((likedCard) => {
                if (likedCard._id === profileID) {
                    return true
                }
            })
            profileLiked ? removeLikeCard(config, event, cardLikes)
                .then(data => {
                    if (data.likes.length) {
                        cardLikes.textContent = data.likes.length;
                    } else {
                        cardLikes.textContent = '';
                    }
                    event.target.classList.remove('element__like-button_liked_true');
                    return data
                }) : likeCard(config, event, cardLikes)
                    .then(data => {
                        cardLikes.textContent = data.likes.length;
                        event.target.classList.add('element__like-button_liked_true');
                        return data
                    });
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
}

function deleteCard(event) {
    removeCard(config, event.target.closest('.element').id)
        .then(() => {
            event.target.closest('.element').remove();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
}

function hideDeleteButton(element) {
    element.classList.add('element__delete-button_disabled')
}

popupConfirm.addEventListener('submit', confirmRemoveCardSubmit);