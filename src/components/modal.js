export { imageCloseButton, popupProfile, profileEditButton, profileCloseButton, popupCard, cardEditButton, cardCloseButton, nameField, occupationField, formProfile, nameInput, occupationInput, formCard, cardInput, linkInput, closePopupEsc, openPopup, closePopup, openPropfilePopup, formProfileSubmit, formCardSubmit };
import { cardsContainer, createCard } from './card.js';
import { closePopup, closePopupEsc, openPopup, imageCloseButton, cardCloseButton, cardEditButton, profileCloseButton, profileEditButton, popupCard } from './utils.js';

const popupProfile = document.querySelector('.popup_type_profile');
const nameField = document.querySelector('.profile__title');
const occupationField = document.querySelector('.profile__occupation');
const formProfile = document.querySelector('#form-profile');
const nameInput = formProfile.querySelector('.form__field_profile_name');
const occupationInput = formProfile.querySelector('.form__field_profile_occupation');
const formCard = document.querySelector('#form-card');
const cardInput = formCard.querySelector('.form__field_card_name');
const linkInput = formCard.querySelector('.form__field_card_link');

function openPropfilePopup() {
    nameInput.value = nameField.textContent;
    occupationInput.value = occupationField.textContent;
    openPopup(popupProfile);
}

function formProfileSubmit(event) {
    event.preventDefault();
    nameField.textContent = nameInput.value;
    occupationField.textContent = occupationInput.value;
    closePopup(popupProfile);
}

function formCardSubmit(event) {
    event.preventDefault();
    const newCard = {};
    newCard.name = cardInput.value;
    newCard.link = linkInput.value;
    cardInput.value = '';
    linkInput.value = '';
    cardsContainer.prepend(createCard(newCard));
    closePopup(popupCard);
}

formCard.addEventListener('submit', formCardSubmit);
formProfile.addEventListener('submit', formProfileSubmit);