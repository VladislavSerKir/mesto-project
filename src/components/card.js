export { cardsContainer, createCard, deleteCard, hideDeleteButton, handleDeleteCard };
import { selectImage, popupConfirm } from './utils.js';
import { config, removeCard, getCardLikes } from './api.js';
import { profileID } from '../pages/index.js';
import { openPopup, closePopup } from './modal.js';

const cardsContainer = document.querySelector('#cards');
const template = cardsContainer.querySelector('#card');

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

    const confirmRemoveCardSubmit = (evt) => {
        evt.preventDefault();
        removeCard(config, cardID)
            .then(() => {
                handleRemoveCard(cardElement)
            })
            .then(() => {
                closePopup(popupConfirm);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.status}, ${err.statusText}`)
            })
        popupConfirm.removeEventListener('submit', confirmRemoveCardSubmit);
    };

    popupConfirm.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close-button_type_confirm') || !evt.target.closest('.popup__container')) {
            popupConfirm.removeEventListener('submit', confirmRemoveCardSubmit);
        }
    });
    document.addEventListener('keydown', () => {
        popupConfirm.removeEventListener('submit', confirmRemoveCardSubmit);
    });
    popupConfirm.addEventListener('submit', confirmRemoveCardSubmit);
    openPopup(popupConfirm)
}

function handleRemoveCard(element) {
    element.target.closest('.element').remove();
}

function likeHandler(event, profileID, cardLikes) {
    getCardLikes(config, event, cardLikes, profileID)
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