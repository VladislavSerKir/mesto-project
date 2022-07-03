export { config, getUserInfo, editProfileInfo, addNewCard, changeAvatar, removeCard, likeCard, removeLikeCard, getCardsInfo, getCardLikes }
import { nameField, occupationField, renderCards, avatarField, formProfileButton, formAvatarButton, profileID } from '../pages/index.js'
import { cardsContainer, createCard, handleDeleteCard } from './card.js'

const config = {
    baseUrl: 'https://nomoreparties.co/v1',
    cohortId: 'plus-cohort-13',
    headers: {
        authorization: 'c78a0ff3-e5d6-4d7f-a1e3-4df178535103',
        'Content-Type': 'application/json'
    }
}

function promise(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка:${res.status} ${res.statusText}`)
}

function getUserInfo(config) {
    return fetch(`${config.baseUrl}/${config.cohortId}/users/me`, {
        method: 'GET',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
    })
        .then(promise)
        .then(data => {
            nameField.textContent = data.name;
            occupationField.textContent = data.about;
            avatarField.src = data.avatar
            profileID.id = data._id
            return data
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
}

function getCardsInfo(config) {
    return fetch(`${config.baseUrl}/${config.cohortId}/cards`, {
        method: 'GET',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
    })
        .then(promise)
        .then(cards => {
            renderCards(cards)
            return cards
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
}

function editProfileInfo(config, name, about) {
    return fetch(`${config.baseUrl}/${config.cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(promise)
        .then(data => {
            nameField.textContent = data.name;
            occupationField.textContent = data.about;
            formProfileButton.textContent = 'Сохранить'
            return data
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
}

function addNewCard(config, cardInfo) {
    return fetch(`${config.baseUrl}/${config.cohortId}/cards`, {
        method: 'POST',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardInfo.name,
            link: cardInfo.link
        })
    })
        .then(promise)
        .then(data => {
            cardsContainer.prepend(createCard(data, handleDeleteCard));
            return data
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
}

function removeCard(config, cardID) {
    return fetch(`${config.baseUrl}/${config.cohortId}/cards/${cardID}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
    })
        .then(promise)
        .then(cardID => {
            return cardID
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
}

function changeAvatar(config, link) {
    return fetch(`${config.baseUrl}/${config.cohortId}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: link
        })
    })
        .then(promise)
        .then(data => {
            avatarField.src = data.avatar;
            formAvatarButton.textContent = 'Сохранить'
            return data
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
}

function getCardLikes(config, event, cardLikes, profileID) {
    return fetch(`${config.baseUrl}/${config.cohortId}/cards`, {
        method: 'GET',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
    })
        .then(promise)
        .then(data => {
            return data.find((card) => {
                if (card._id === event.target.closest('.element').id) {
                    return card.likes
                }
            })

        })
        .then(data => {
            const profileLiked = data.likes.some((likedCard) => {
                if (likedCard._id === profileID) {
                    return true
                }
            })
            profileLiked ? removeLikeCard(config, event, cardLikes) : likeCard(config, event, cardLikes);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.status}, ${err.statusText}`)
        })
}

function likeCard(config, event, cardLikes) {
    return fetch(`${config.baseUrl}/${config.cohortId}/cards/likes/${event.target.closest('.element').id}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
    })
        .then(promise)
        .then(data => {
            cardLikes.textContent = data.likes.length;
            event.target.classList.add('element__like-button_liked_true');
            return data
        })
}

function removeLikeCard(config, event, cardLikes) {
    return fetch(`${config.baseUrl}/${config.cohortId}/cards/likes/${event.target.closest('.element').id}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
    })
        .then(promise)
        .then(data => {
            if (data.likes.length) {
                cardLikes.textContent = data.likes.length;
            } else {
                cardLikes.textContent = '';
            }
            event.target.classList.remove('element__like-button_liked_true');
            return data
        })
}

getUserInfo(config)
    .then(() => {
        getCardsInfo(config)
    })