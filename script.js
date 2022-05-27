let profileInfo = { name: 'Жак-Ив Кусто', occupation: 'Исследователь океана' };
let cardsInfo = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        liked: false
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        liked: false
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        liked: false
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        liked: false
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        liked: false
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        liked: false
    }
];
let cards = document.querySelector('#cards');
let template = cards.querySelector('#card');
function renderCards() {
    cardsInfo.forEach(item => {
        let card = template.content.cloneNode(true).querySelector('.element');
        card.querySelector('.element__image').setAttribute('src', `${item.link}`);
        card.querySelector('.element__image').setAttribute('alt', `${item.name}`);
        card.querySelector('.element__title').textContent = item.name;
        cards.append(card);
    })
}
renderCards();

let allCards = document.querySelectorAll('#cards')[0].children;
let deletedItem = document.querySelectorAll('.element__delete-button');
let allImages = document.querySelectorAll('.element__image');
let popupImages = document.querySelector('.popup_type_image');
let closeWindowImage = document.querySelector('.popup__close-button_type_image');
let popupUser = document.querySelector('.popup_type_user');
let profileEditButton = document.querySelector('.profile__edit-button');
let profileCloseButton = document.querySelector('.popup__close-button_type_user');
let popupCard = document.querySelector('.popup_type_card');
let cardEditButton = document.querySelector('.profile__add-button');
let cardCloseButton = document.querySelector('.popup__close-button_type_card');
let nameField = document.querySelector('.profile__title');
let occupationField = document.querySelector('.profile__occupation');

const formElement = document.querySelector('#form-user');
let nameInput = formElement.querySelector('.form__field_person_name');
let jobInput = formElement.querySelector('.form__field_person_occupation');

const formCardSubmit = document.querySelector('#form-card');
let cardInput = formCardSubmit.querySelector('.form__field_card_name');
let linkInput = formCardSubmit.querySelector('.form__field_card_link');


nameInput.value = profileInfo.name;
jobInput.value = profileInfo.occupation;
nameField.textContent = profileInfo.name;
occupationField.textContent = profileInfo.occupation;


function openClose(element) {
    element.classList.toggle('popup_opened');
}
profileEditButton.addEventListener('click', () => { openClose(popupUser) });
profileCloseButton.addEventListener('click', () => { openClose(popupUser) });
cardEditButton.addEventListener('click', () => { openClose(popupCard) });
cardCloseButton.addEventListener('click', () => { openClose(popupCard) });
closeWindowImage.addEventListener('click', () => { openClose(popupImages) });


function deletedCard() {
    console.log(this);
    this.parentNode.remove();
    allImages = document.querySelectorAll('.element__image');
}


function selectedImage() {
    let popupImage = document.querySelector('.popup__image');
    let popupText = document.querySelector('.popup__text');
    console.log(this);
    console.dir(this);
    popupImages.classList.toggle('popup_opened');
    popupImage.setAttribute('src', this.currentSrc);
    popupImage.setAttribute('alt', this.alt);
    popupText.textContent = this.alt;
}

for (let i = 0; i < deletedItem.length; i++) {
    deletedItem[i].addEventListener('click', deletedCard);
    allImages[i].addEventListener('click', selectedImage);
}


function formSubmitHandler(event) {
    console.log('form');
    event.preventDefault();
    if (nameInput.value && jobInput.value) {
        profileInfo.name = nameInput.value;
        profileInfo.occupation = jobInput.value;
        nameField.textContent = profileInfo.name;
        occupationField.textContent = profileInfo.occupation;
    }
    popupUser.classList.toggle('popup_opened');
}
formElement.addEventListener('submit', formSubmitHandler);



function formCardHandler(event) {
    console.log('form-card');
    event.preventDefault();
    if (cardInput.value && linkInput.value) {
        let newCard = {};
        newCard.name = cardInput.value;
        newCard.link = linkInput.value;
        newCard.liked = false;
        cardsInfo.unshift(newCard);

        card = template.content.cloneNode(true).querySelector('.element');
        card.querySelector('.element__image').setAttribute('src', `${newCard.link}`);
        card.querySelector('.element__image').setAttribute('alt', `${newCard.name}`);
        card.querySelector('.element__title').textContent = newCard.name;
        cards.prepend(card);
        // renderCards();
    }
    popupCard.classList.toggle('popup_opened');
}
formCardSubmit.addEventListener('submit', formCardHandler);



