export { cardsContainer, createCard, deleteCard };
import { selectImage } from './utils.js';

const cardsContainer = document.querySelector('#cards');
const template = cardsContainer.querySelector('#card');

function createCard(attr) {
    const card = template.content.cloneNode(true).querySelector('.element');
    const cardImage = card.querySelector('.element__image');
    const cardLikes = card.querySelector('.element__likes')
    cardImage.setAttribute('src', `${attr.link}`);
    cardImage.setAttribute('alt', `${attr.name}`);

    if (attr.likes.length) {
        cardLikes.textContent = attr.likes.length;
    }
    // console.log(attr.likes.length, cardLikes)

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
    console.log(event.target.closest('.element'))
    event.target.closest('.element').remove();
}