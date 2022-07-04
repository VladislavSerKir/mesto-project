import './index.css';
export { popupProfile, nameField, occupationField, formProfile, nameInput, occupationInput, formCard, formProfileSubmit, formCardSubmit, renderCards, cardInput, linkInput, avatarField, avatarInput, formProfileButton, formAvatarButton, profileID }
import { cardsContainer, createCard, handleDeleteCard } from '../components/card.js';
import { enableValidation } from '../components/validate.js';
import { profileEditButton, cardEditButton, avatarEditButton, popupCard, popupAvatar } from '../components/utils.js';
import { validationConfig } from '../components/utils/constants.js';
import { openPropfilePopup, closePopup, openPopup } from '../components/modal.js';
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
const formCardButton = document.querySelector('#form-card-button');
const profileID = document.querySelector('.profile');

function handleAvtarFormSubmit(event) {
    event.preventDefault();
    formAvatarButton.textContent = 'Сохранение...';
    changeAvatar(config, avatarInput.value)
        .then(data => {
            avatarField.src = data.avatar;
            return data
        })
        .then(() => {
            formAvatar.reset()
        })
        .then(() => {
            closePopup(popupAvatar);
        })
        .then(() => {
            formAvatarButton.disabled = true;
            formAvatarButton.classList.add('form__submit-button_disabled')
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
        .finally(() => {
            formAvatarButton.textContent = 'Сохранить'
        })
}

function formProfileSubmit(event) {
    event.preventDefault();
    formProfileButton.textContent = 'Сохранение...';
    editProfileInfo(config, nameInput.value, occupationInput.value)
        .then(data => {
            nameField.textContent = data.name;
            occupationField.textContent = data.about;
            return data
        })
        .then(() => {
            closePopup(popupProfile);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
        .finally(() => {
            formProfileButton.textContent = 'Сохранить'
        })
}

function formCardSubmit(event) {
    event.preventDefault();
    const newCard = {};
    newCard.name = cardInput.value;
    newCard.link = linkInput.value;
    addNewCard(config, newCard)
        .then(data => {
            cardsContainer.prepend(createCard(data, handleDeleteCard));
            return data
        })
        .then(() => {
            formCard.reset();
        })
        .then(() => {
            closePopup(popupCard);
        })
        .then(() => {
            formCardButton.disabled = true;
            formCardButton.classList.add('form__submit-button_disabled')
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
}

function renderCards(cardsInfo) {
    cardsInfo.forEach(card => {
        cardsContainer.append(createCard(card, handleDeleteCard));
    })
}

formCard.addEventListener('submit', formCardSubmit);
formProfile.addEventListener('submit', formProfileSubmit);
formAvatar.addEventListener('submit', handleAvtarFormSubmit);
profileEditButton.addEventListener('click', openPropfilePopup);
cardEditButton.addEventListener('click', () => { openPopup(popupCard) });
avatarEditButton.addEventListener('click', () => { openPopup(popupAvatar) });

enableValidation(validationConfig);
