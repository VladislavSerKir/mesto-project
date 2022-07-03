import './index.css';
export { popupProfile, nameField, occupationField, formProfile, nameInput, occupationInput, formCard, formProfileSubmit, formCardSubmit, renderCards, cardInput, linkInput, avatarField, avatarInput, formProfileButton, formAvatarButton, profileID }
import { cardsContainer, createCard, handleDeleteCard } from '../components/card.js';
import { enableValidation } from '../components/validate.js';
import { listOfPopups, profileEditButton, cardEditButton, avatarEditButton, popupCard, popupAvatar } from '../components/utils.js';
import { validationConfig } from '../components/utils/constants.js';
import { openPropfilePopup, closePopup, closeOverlay, openPopup } from '../components/modal.js';
import { config, editProfileInfo, addNewCard, changeAvatar } from '../components/api.js';

const popupProfile = document.querySelector('.popup_type_profile');
const nameField = document.querySelector('.profile__title');
const occupationField = document.querySelector('.profile__occupation');
const avatarField = document.querySelector('.profile__avatar')
const formAvatar = document.querySelector('#form-avatar')
const formProfile = document.querySelector('#form-profile');
const nameInput = formProfile.querySelector('.form__field_profile_name');
const occupationInput = formProfile.querySelector('.form__field_profile_occupation');
const formCard = document.querySelector('#form-card');
const cardInput = formCard.querySelector('.form__field_card_name');
const linkInput = formCard.querySelector('.form__field_card_link');
const avatarInput = formAvatar.querySelector('.form__field_avatar_link');
const formProfileButton = document.querySelector('#form-profile-button');
const formAvatarButton = document.querySelector('#form-avatar-button');
const profileID = document.querySelector('.profile');

function formAvatarSubmit(event) {
    event.preventDefault();
    formAvatarButton.textContent = 'Сохранение...';
    changeAvatar(config, avatarInput.value);
    avatarInput.value = '';
    closePopup(popupAvatar);
}

function formProfileSubmit(event) {
    event.preventDefault();
    formProfileButton.textContent = 'Сохранение...';
    editProfileInfo(config, nameInput.value, occupationInput.value)
    closePopup(popupProfile);
}

function formCardSubmit(event) {
    event.preventDefault();
    const newCard = {};
    newCard.name = cardInput.value;
    newCard.link = linkInput.value;
    addNewCard(config, newCard);
    cardInput.value = '';
    linkInput.value = '';
    closePopup(popupCard);
}

function renderCards(cardsInfo) {
    cardsInfo.forEach(card => {
        cardsContainer.append(createCard(card, handleDeleteCard));
    })
}

formCard.addEventListener('submit', formCardSubmit);
formProfile.addEventListener('submit', formProfileSubmit);
formAvatar.addEventListener('submit', formAvatarSubmit);

profileEditButton.addEventListener('click', () => { openPropfilePopup() });
cardEditButton.addEventListener('click', () => { openPopup(popupCard) });
avatarEditButton.addEventListener('click', () => { openPopup(popupAvatar) });
profileEditButton.addEventListener('click', () => { enableValidation(validationConfig); });
cardEditButton.addEventListener('click', () => { enableValidation(validationConfig); });
avatarEditButton.addEventListener('click', () => { enableValidation(validationConfig); });

closeOverlay(listOfPopups);
enableValidation(validationConfig);
