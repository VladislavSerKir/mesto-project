export { popupImage, popupText, selectImage, closeOverlay, closePopup, closePopupEsc, openPopup, imageCloseButton, listOfPopups, cardCloseButton, cardEditButton, profileCloseButton, profileEditButton, popupCard }
import { openPropfilePopup, popupProfile } from "./modal.js";
import { enableValidation, formProp } from "./validate.js";

const popupImages = document.querySelector('.popup_type_image');
const imageCloseButton = popupImages.querySelector('.popup__close-button_type_image');
const popupImage = popupImages.querySelector('.popup__image');
const popupText = popupImages.querySelector('.popup__text');
const listOfPopups = Array.from(document.querySelectorAll('.popup'))
const popupCard = document.querySelector('.popup_type_card');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close-button_type_profile');
const cardEditButton = document.querySelector('.profile__add-button');
const cardCloseButton = document.querySelector('.popup__close-button_type_card');

function openPopup(element) {
    enableValidation(formProp);
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup(element) {
    element.classList.remove('popup_opened');
}

function selectImage(elem) {
    const cardSrc = elem.link;
    const cardText = elem.name;
    openPopup(popupImages);
    popupImage.setAttribute('src', cardSrc);
    popupImage.setAttribute('alt', cardText);
    popupText.textContent = cardText;
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
        document.removeEventListener('keydown', closePopupEsc);
        closePopup(modal);
    };
}

imageCloseButton.addEventListener('click', () => { closePopup(popupImages) });
profileEditButton.addEventListener('click', () => { openPropfilePopup() });
cardEditButton.addEventListener('click', () => { openPopup(popupCard) });
profileCloseButton.addEventListener('click', () => { closePopup(popupProfile) });
cardCloseButton.addEventListener('click', () => { closePopup(popupCard) });

