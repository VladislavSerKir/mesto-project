const cardsInfo = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];

const cardsContainer = document.querySelector('#cards');
const template = cardsContainer.querySelector('#card');
const popupImages = document.querySelector('.popup_type_image');
const imageCloseButton = document.querySelector('.popup__close-button_type_image');
const popupProfile = document.querySelector('.popup_type_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close-button_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const cardEditButton = document.querySelector('.profile__add-button');
const cardCloseButton = document.querySelector('.popup__close-button_type_card');
const nameField = document.querySelector('.profile__title');
const occupationField = document.querySelector('.profile__occupation');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
const popupContainer = document.querySelector('.popup__container');
const popupOpened = document.querySelector('.popup');

const formProfile = document.querySelector('#form-profile');
const nameInput = formProfile.querySelector('.form__field_profile_name');
const occupationInput = formProfile.querySelector('.form__field_profile_occupation');

const formCard = document.querySelector('#form-card');
const cardInput = formCard.querySelector('.form__field_card_name');
const linkInput = formCard.querySelector('.form__field_card_link');

function renderCards() {
    cardsInfo.forEach(card => {
        cardsContainer.append(createCard(card));
    })
}
renderCards();

function createCard(attr) {
    const card = template.content.cloneNode(true).querySelector('.element');
    const cardImage = card.querySelector('.element__image');
    cardImage.setAttribute('src', `${attr.link}`);
    cardImage.setAttribute('alt', `${attr.name}`);
    card.querySelector('.element__title').textContent = attr.name;
    cardImage.addEventListener('click', () => selectImage(attr));
    card.querySelector('.element__delete-button').addEventListener('click', (event) => {
        deleteCard(event);
    });
    card.querySelector('.element__like-button').addEventListener('click', (event) => {
        addLike(event);
    });
    return card;
}

function addLike(event) {
    event.target.classList.toggle('element__like-button_liked_true');
}

function deleteCard(event) {
    event.target.closest('.element').remove();
}

function closePopupEsc(evt) {
    console.log('closePopupEsc')
    const modal = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(modal);
        document.removeEventListener('keydown', closePopupEsc);
    };
}

function openPopup(element) {
    enableValidation(formProp);
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup(element) {
    element.classList.remove('popup_opened');
}
profileCloseButton.addEventListener('click', () => { closePopup(popupProfile) });
cardCloseButton.addEventListener('click', () => { closePopup(popupCard) });
imageCloseButton.addEventListener('click', () => { closePopup(popupImages) });

const listOfPopups = Array.from(document.querySelectorAll('.popup'))

function closeOverlay(listOfPopups) {
    listOfPopups.forEach((popupElem) => {
        popupElem.addEventListener('click', (evt) => {
            if (evt.target === popupElem) {
                closePopup(popupElem)
            }
        });
    })
}
closeOverlay(listOfPopups)


function selectImage(elem) {
    const cardSrc = elem.link;
    const cardText = elem.name;
    openPopup(popupImages);
    popupImage.setAttribute('src', cardSrc);
    popupImage.setAttribute('alt', cardText);
    popupText.textContent = cardText;
}

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
    // enableValidation(formProp);
    closePopup(popupCard);
}

formCard.addEventListener('submit', formCardSubmit);
formProfile.addEventListener('submit', formProfileSubmit);
profileEditButton.addEventListener('click', () => { openPropfilePopup() });
cardEditButton.addEventListener('click', () => { openPopup(popupCard) });


// https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg

const showError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputErrorClass)
}

const hideError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.remove(inputErrorClass)
}

function hasInvalidInput(inputsList) {
    return inputsList.some((input) => {
        return !input.validity.valid;
    })
}

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {

    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        showError(formElement, inputElement, inputErrorClass);
    } else {
        hideError(formElement, inputElement, inputErrorClass);
    }
}

const toggleButtonState = (button, inputsList, inactiveButtonClass) => {
    if (hasInvalidInput(inputsList)) {
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    }
}

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) => {
    const inputsList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    toggleButtonState(submitButton, inputsList, inactiveButtonClass);

    inputsList.forEach(inputElement => {
        if ((inputElement.id === 'profile-name') || (inputElement.id === 'profile-about')) {
            checkInputValidity(formElement, inputElement, inputErrorClass);
        }
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass);
            toggleButtonState(submitButton, inputsList, inactiveButtonClass);
        })
    })
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
}

const enableValidation = ({ formSelector, ...rest }) => {
    const formList = document.querySelectorAll(formSelector);
    Array.from(formList).forEach(formElement => {
        setEventListeners(formElement, rest)
    })
}

const formProp = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__field-error_active'
}
const { inputSelector, ...rest } = formProp;

enableValidation(formProp);
