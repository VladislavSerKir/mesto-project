export { cardsContainer, createCard, deleteCard };
import { selectImage } from './utils/utils.js';

const cardsContainer = document.querySelector('#cards');
const template = cardsContainer.querySelector('#card');

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