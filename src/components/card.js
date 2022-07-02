export { cardsContainer, createCard, deleteCard, hideDeleteButton, handleDeleteCard };
import { selectImage, popupAvatar, popupConfirm } from './utils.js';
import { config, removeCard, getCardLikes } from './api.js';
import { profileID, formConfirm } from '../pages/index.js';
import { confirmModalSubmit, openPopup, closePopup } from './modal.js';

const cardsContainer = document.querySelector('#cards');
const template = cardsContainer.querySelector('#card');

function createCard(attr, handleDelete) {
    // console.log(attr)
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

    // card.querySelector('.element__delete-button').addEventListener('click', (event) => {
    //     deleteCard(event);
    // });

    // deleteButton.addEventListener('click', (cardEvent) => {
    //     console.log(cardEvent.target.closest('.element'))
    //     formConfirm.addEventListener('submit', (formEvent) => {
    //         confirmModalSubmit(formEvent, cardEvent)
    //         console.log(formEvent.target, cardEvent.target.closest('.element'))
    //     });
    //     openPopup(popupConfirm);
    // });


    // deleteButton.addEventListener('click', (cardElement) => handleDeleteCard(cardElement));

    // const handleDeleteCard = (cardElement) => {
    //     console.warn(`Удаление карточки и добавление обработчика submit id: ${cardElement.target.closest('.element').id}`)
    //     const confirmRemoveCardSubmit = (evt) => {
    //         evt.preventDefault();
    //         removeCard(config, cardElement.target.closest('.element').id)
    //             .then(() => {
    //                 cardElement.target.closest('.element').remove();
    //             })
    //             .then(() => {
    //                 closePopup(popupConfirm);
    //             })
    //             .catch((err) => {
    //                 console.log(`Ошибка: ${err.status}, ${err.statusText}`)
    //             })
    //         popupConfirm.removeEventListener('submit', confirmRemoveCardSubmit);
    //     };
    //     popupConfirm.addEventListener('submit', (evt) => { confirmRemoveCardSubmit(evt, cardElement) });
    //     openPopup(popupConfirm)
    // }


    deleteButton.addEventListener('click', (cardElement) => {
        handleDelete(cardElement)
    });

    card.querySelector('.element__like-button').addEventListener('click', (event) => {
        likeHandler(event, profileID.id, cardLikes);
    });
    cardImage.addEventListener('click', () => selectImage(attr));
    return card;
}

const handleDeleteCard = (cardElement) => {
    console.warn(`Удаление карточки и добавление обработчика submit id: ${cardElement.target.closest('.element').id}`)
    const confirmRemoveCardSubmit = (evt) => {
        evt.preventDefault();
        removeCard(config, cardElement.target.closest('.element').id)
            .then(() => {
                cardElement.target.closest('.element').remove();
            })
            .then(() => {
                closePopup(popupConfirm);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.status}, ${err.statusText}`)
            })
        popupConfirm.removeEventListener('submit', confirmRemoveCardSubmit);
    };
    popupConfirm.addEventListener('submit', (evt) => { confirmRemoveCardSubmit(evt, cardElement) });
    openPopup(popupConfirm)
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