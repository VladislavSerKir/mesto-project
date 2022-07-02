export { profileEditButton, cardEditButton, cardCloseButton, openPropfilePopup, openPopup, closePopup, closeOverlay, imageCloseButton, popupImages, profileCloseButton, confirmModalSubmit };
import { cardEditButton, profileEditButton, popupCard, popupAvatar, popupConfirm } from './utils.js';
import { popupProfile, occupationInput, occupationField, nameField, nameInput } from '../pages/index.js';
import { config, removeCard } from './api.js';

const popupImages = document.querySelector('.popup_type_image');
const imageCloseButton = popupImages.querySelector('.popup__close-button_type_image');
const profileCloseButton = document.querySelector('.popup__close-button_type_profile');
const cardCloseButton = document.querySelector('.popup__close-button_type_card');
const avatarCloseButton = document.querySelector('.popup__close-button_type_avatar');
const confirmCloseButton = document.querySelector('.popup__close-button_type_confirm');

function openPropfilePopup() {
    nameInput.value = nameField.textContent;
    occupationInput.value = occupationField.textContent;
    openPopup(popupProfile);
}

function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

function closeOverlay(listOfPopups) {
    listOfPopups.forEach((popupElem) => {
        popupElem.addEventListener('click', (evt) => {
            if (evt.target === popupElem) {
                closePopup(popupElem)
            }
        });
    })
}

function closePopupEsc(evt) {
    const modal = document.querySelector('.popup_opened');
    if (evt.key === 'Escape' && modal) {
        closePopup(modal);
    };
}

function confirmModalSubmit(formEvent, cardEvent) {
    formEvent.preventDefault();
    console.log(cardEvent.target.closest('.element').id)
    removeCard(config, cardEvent.target.closest('.element').id)
        .then(() => {
            cardEvent.target.closest('.element').remove();
        })
        .then(() => {
            closePopup(popupConfirm);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
}

imageCloseButton.addEventListener('click', () => { closePopup(popupImages) });
profileCloseButton.addEventListener('click', () => { closePopup(popupProfile) });
cardCloseButton.addEventListener('click', () => { closePopup(popupCard) });
avatarCloseButton.addEventListener('click', () => { closePopup(popupAvatar) });
confirmCloseButton.addEventListener('click', () => { closePopup(popupConfirm) });