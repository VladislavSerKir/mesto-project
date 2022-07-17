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
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`)
}

function getUserInfo(config) {
    return fetch(`${config.baseUrl}/${config.cohortId}/users/me`, config)
        .then(promise)
}

function getCardsInfo(config) {
    return fetch(`${config.baseUrl}/${config.cohortId}/cards`, config)
        .then(promise)
}

function editProfileInfo(config, name, about) {
    config.method = 'PATCH'
    config.body = JSON.stringify({
        name: name,
        about: about
    })
    return fetch(`${config.baseUrl}/${config.cohortId}/users/me`, config)
        .then(promise)
}

function addNewCard(config, cardInfo) {
    config.method = 'POST';
    // body: JSON.stringify({
    //     name: cardInfo.name,
    //     link: cardInfo.link
    // })
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
    config.method = 'DELETE';
    return fetch(`${config.baseUrl}/${config.cohortId}/cards/${cardID}`, config)
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
    config.method = 'GET';
    return fetch(`${config.baseUrl}/${config.cohortId}/cards`, config)
        .then(promise)
}

function likeCard(config, event, cardLikes) {
    config.method = 'PUT';
    return fetch(`${config.baseUrl}/${config.cohortId}/cards/likes/${event.target.closest('.element').id}`, config)
        .then(promise)
}

function removeLikeCard(config, event, cardLikes) {
    config.method = 'DELETE';
    return fetch(`${config.baseUrl}/${config.cohortId}/cards/likes/${event.target.closest('.element').id}`, config)
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
        console.log(`Ошибка: ${err}`)
    });


/////////////


