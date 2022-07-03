export { popupImage, popupText, selectImage, listOfPopups, cardEditButton, profileEditButton, popupCard, avatarEditButton, popupAvatar, popupConfirm }
import { openPopup, popupImages } from "./modal.js";

const popupImage = popupImages.querySelector('.popup__image');
const popupText = popupImages.querySelector('.popup__text');
const listOfPopups = Array.from(document.querySelectorAll('.popup'))
const popupCard = document.querySelector('.popup_type_card');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardEditButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-link');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupConfirm = document.querySelector('.popup_type_confirm');

function selectImage(elem) {
    const cardSrc = elem.link;
    const cardText = elem.name;
    openPopup(popupImages);
    popupImage.setAttribute('src', cardSrc);
    popupImage.setAttribute('alt', cardText);
    popupText.textContent = cardText;
}