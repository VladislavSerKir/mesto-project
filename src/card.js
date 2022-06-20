export { cardsInfo, cardsContainer, template, renderCards, createCard, addLike, deleteCard };
import { selectImage } from './utils.js';

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

function renderCards() {
    cardsInfo.forEach(card => {
        cardsContainer.append(createCard(card));
    })
}

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