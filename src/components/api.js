// import { reject, resolve } from "core-js/fn/promise"

export { config, getUserInfo, loadedProfileInfo, editProfileInfo, addNewCard, changeAvatar }
import { nameField, occupationField, renderCards, cardInput, linkInput, avatarField } from '../pages/index.js'

const config = {
    baseUrl: 'https://nomoreparties.co/v1',
    cohortId: 'plus-cohort-13',
    headers: {
        authorization: 'c78a0ff3-e5d6-4d7f-a1e3-4df178535103',
        'Content-Type': 'application/json'
    }
}
const loadedProfileInfo = getUserInfo(config);

function promise(res) {
    // console.log(res);
    return res.ok ? res.json() : Promise.reject(`Ошибка:${res.status}`)
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
            // console.log(data)
            nameField.textContent = data.name;
            occupationField.textContent = data.about;
            avatarField.src = data.avatar
            // console.log(data)
            return data
        })
}
getUserInfo(config)

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
            console.log(cards)
            renderCards(cards)
            return cards
        })
}
getCardsInfo(config)


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
            // console.log(data)
            nameField.textContent = data.name;
            occupationField.textContent = data.about;
            return data
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
            cardInfo.name = data.name;
            cardInfo.link = data.link;
            return data
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
            console.log(avatarField)
            return data
        })
}



// const getUserInfo = new Promise(function (resolve, reject) {
//     () => {
//         fetch(`${config.baseUrl}/${config.cohortId}/users/me`, {
//             method: 'GET',
//             headers: {
//                 authorization: config.headers.authorization,
//                 'Content-Type': 'application/json'
//             }
//         })
//     }
// })
// getUserInfo.then((res) => {
//     return res.ok ? res.json() : Promise.reject('Ошибка')
// })
// .catch((err) => {
//     console.log(err)
// })