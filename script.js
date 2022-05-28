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
console.log(cardsInfo);
let cards = document.querySelector('#cards');
let template = cards.querySelector('#card');
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

function renderCards() {
    cardsInfo.forEach(item => {
        let card = template.content.cloneNode(true).querySelector('.element');
        card.querySelector('.element__image').setAttribute('src', `${item.link}`);
        card.querySelector('.element__image').setAttribute('alt', `${item.name}`);
        card.querySelector('.element__title').textContent = item.name;
        if (item.liked) {
            card.querySelector('.element__like-button').classList.add('element__like-button_liked_true');
        }
        cards.append(card);
        addLike(card);
        deleteCard(card);
        selectedImage(card);
    })
}
renderCards();

function addLike(elem) {
    elem.querySelector('.element__like-button').addEventListener('click', function (event) {
        event.target.classList.toggle('element__like-button_liked_true');
        let cardSrc = elem.querySelector('.element__image').src;
        let cardText = elem.querySelector('.element__title').textContent;

        if (Array.from(event.target.classList).includes('element__like-button_liked_true')) {
            selectedCard(cardText, cardSrc).liked = true;
        } else {
            selectedCard(cardText, cardSrc).liked = false;
        }
        console.log(cardsInfo);
    });
}

function selectedCard(text, src) {
    let selectedElem = cardsInfo.find(item => {
        if ((item.name === text) && (item.link === src)) {
            return item;
        }
    });
    if (selectedElem === undefined) {
        let newLink = src.split('/');
        selectedElem = cardsInfo.find(item => {
            if ((item.name === text) && (item.link === newLink[newLink.length - 1])) {
                return item;
            }
        });
    }
    return selectedElem;
}

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

function deleteCard(elem) {
    elem.querySelector('.element__delete-button').addEventListener('click', () => {
        let cardSrc = elem.querySelector('.element__image').src;
        let cardText = elem.querySelector('.element__title').textContent;
        console.log(cardsInfo);
        cardsInfo.splice(cardsInfo.indexOf(selectedCard(cardText, cardSrc)), 1);
        elem.remove();
    });
}

function selectedImage(elem) {
    elem.querySelector('.element__image').addEventListener('click', () => {
        openClose(popupImages);
        let popupImage = document.querySelector('.popup__image');
        let popupText = document.querySelector('.popup__text');
        let cardSrc = elem.querySelector('.element__image').src;
        let cardText = elem.querySelector('.element__title').textContent;
        popupImage.setAttribute('src', selectedCard(cardText, cardSrc).link);
        popupImage.setAttribute('alt', selectedCard(cardText, cardSrc).name);
        popupText.textContent = selectedCard(cardText, cardSrc).name;
    });
}

function formSubmitHandler(event) {
    event.preventDefault();
    if (nameInput.value && jobInput.value) {
        profileInfo.name = nameInput.value;
        profileInfo.occupation = jobInput.value;
        nameField.textContent = profileInfo.name;
        occupationField.textContent = profileInfo.occupation;
    }
    openClose(popupUser);
}
formElement.addEventListener('submit', formSubmitHandler);

function formCardHandler(event) {
    event.preventDefault();
    if (cardInput.value && linkInput.value) {
        if (!selectedCard(cardInput.value, linkInput.value)) {
            let newCard = {};
            newCard.name = cardInput.value;
            newCard.link = linkInput.value;
            newCard.liked = false;
            cardsInfo.unshift(newCard);
            let card = template.content.cloneNode(true).querySelector('.element');
            card.querySelector('.element__image').setAttribute('src', `${newCard.link}`);
            card.querySelector('.element__image').setAttribute('alt', `${newCard.name}`);
            card.querySelector('.element__title').textContent = newCard.name;
            cards.prepend(card);
            console.log(cardsInfo);
            addLike(card);
            deleteCard(card);
            selectedImage(card);
        } else {
            console.warn(`Карточка с именем: ${cardInput.value} и ссылкой: ${linkInput.value} уже существует!`);
        }
    }
    openClose(popupCard);
}
formCardSubmit.addEventListener('submit', formCardHandler);



