import './index.css';
export { popupProfile, nameField, occupationField, formProfile, nameInput, occupationInput, formCard, formProfileSubmit, formCardSubmit }
import { cardsContainer, createCard } from '../components/card.js';
import { enableValidation } from '../components/validate.js';
import { listOfPopups, profileEditButton, cardEditButton, popupCard } from '../components/utils/utils.js';
import { cardsInfo, validationConfig } from '../components/utils/constants.js';
import { openPropfilePopup, closePopup, closeOverlay, openPopup } from '../components/modal.js';

const popupProfile = document.querySelector('.popup_type_profile');
const nameField = document.querySelector('.profile__title');
const occupationField = document.querySelector('.profile__occupation');
const formProfile = document.querySelector('#form-profile');
const nameInput = formProfile.querySelector('.form__field_profile_name');
const occupationInput = formProfile.querySelector('.form__field_profile_occupation');
const formCard = document.querySelector('#form-card');
const cardInput = formCard.querySelector('.form__field_card_name');
const linkInput = formCard.querySelector('.form__field_card_link');

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

function renderCards() {
    cardsInfo.forEach(card => {
        cardsContainer.append(createCard(card));
    })
}

formCard.addEventListener('submit', formCardSubmit);
formProfile.addEventListener('submit', formProfileSubmit);
profileEditButton.addEventListener('click', () => { openPropfilePopup() });
cardEditButton.addEventListener('click', () => { openPopup(popupCard) });
profileEditButton.addEventListener('click', () => { enableValidation(validationConfig); });
cardEditButton.addEventListener('click', () => { enableValidation(validationConfig); });

renderCards();
closeOverlay(listOfPopups);
enableValidation(validationConfig);