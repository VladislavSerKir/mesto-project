export { profileEditButton, cardEditButton, openPropfilePopup, openPopup, closePopup, popupImages };
import { cardEditButton, profileEditButton } from './utils.js';
import { popupProfile, occupationInput, occupationField, nameField, nameInput } from '../pages/index.js';

const popupImages = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
})

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

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const modal = document.querySelector('.popup_opened');
        closePopup(modal);
    };
}