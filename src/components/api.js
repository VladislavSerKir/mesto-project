export { config, getUserInfo, editProfileInfo, addNewCard, changeAvatar, removeCard, likeCard, removeLikeCard, getCardsInfo, getCardLikes }
import { nameField, occupationField, renderCards, avatarField, profileID } from '../pages/index.js'

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
}

Promise.all([getUserInfo(config), getCardsInfo(config)])
    .then(([userData, cards]) => {
        nameField.textContent = userData.name;
        occupationField.textContent = userData.about;
        avatarField.src = userData.avatar
        profileID.id = userData._id
        renderCards(cards)
        return userData, cards
    })
    .catch(err => {
        console.log(`Ошибка: ${err.status}, ${err.statusText}`)
    });