export { profileEditButton, cardEditButton, cardCloseButton, openPropfilePopup, openPopup, closePopup, closeOverlay, imageCloseButton, popupImages, profileCloseButton };
import { cardEditButton, profileEditButton, popupCard, popupAvatar } from './utils.js';
import { popupProfile, occupationInput, occupationField, nameField, nameInput } from '../pages/index.js'

const popupImages = document.querySelector('.popup_type_image');
const imageCloseButton = popupImages.querySelector('.popup__close-button_type_image');
const profileCloseButton = document.querySelector('.popup__close-button_type_profile');
const cardCloseButton = document.querySelector('.popup__close-button_type_card');
const avatarCloseButton = document.querySelector('.popup__close-button_type_avatar');

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

imageCloseButton.addEventListener('click', () => { closePopup(popupImages) });
profileCloseButton.addEventListener('click', () => { closePopup(popupProfile) });
cardCloseButton.addEventListener('click', () => { closePopup(popupCard) });
avatarCloseButton.addEventListener('click', () => { closePopup(popupAvatar) });