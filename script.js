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

function openPopup(element) {
    element.classList.add('popup_opened');
}
cardEditButton.addEventListener('click', () => { openPopup(popupCard) });

function closePopup(element) {
    element.classList.remove('popup_opened');
}
profileCloseButton.addEventListener('click', () => { closePopup(popupProfile) });
cardCloseButton.addEventListener('click', () => { closePopup(popupCard) });
imageCloseButton.addEventListener('click', () => { closePopup(popupImages) });

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
profileEditButton.addEventListener('click', () => { openPropfilePopup() });

function formProfileSubmit(event) {
    event.preventDefault();
    if (nameInput.value && occupationInput.value) {
        nameField.textContent = nameInput.value;
        occupationField.textContent = occupationInput.value;
    }
    closePopup(popupProfile);
}
formProfile.addEventListener('submit', formProfileSubmit);

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


