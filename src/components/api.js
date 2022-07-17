export default class Api {
    constructor(config) {
        this.config = config;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
    }

    getUserInfo() {
        this.config.method = 'GET';
        return fetch(`${this.config.baseUrl}/users/me`, this.config)
            .then(this._checkResponse);
    }

    updateUserInfo(user) {
        this.config.method = 'PATCH';
        this.config.body = JSON.stringify(user);
        return fetch(`${this.config.baseUrl}/users/me`, this.config)
            .then(this._checkResponse);
    }

    getCards() {
        this.config.method = 'GET';
        return fetch(`${this.config.baseUrl}/cards`, this.config)
            .then(this._checkResponse);
    }

    addCard(card) {
        this.config.method = 'POST';
        this.config.body = JSON.stringify(card);
        return fetch(`${this.config.baseUrl}/cards`, this.config)
            .then(this._checkResponse);
    }

    removeCard(id) {
        this.config.method = 'DELETE';
        return fetch(`${this.config.baseUrl}/cards/${id}`, this.config)
            .then(this._checkResponse);
    }

    updateAvatar(avatar) {
        this.config.method = 'PATCH';
        this.config.body = JSON.stringify({ avatar });
        return fetch(`${this.config.baseUrl}/users/me/avatar`, this.config)
            .then(this._checkResponse);
    }

    likeCard(id) {
        this.config.method = 'PUT';
        return fetch(`${this.config.baseUrl}/cards/likes/${id}`, this.config)
            .then(this._checkResponse);
    }

    dislikeCard(id) {
        this.config.method = 'DELETE';
        return fetch(`${this.config.baseUrl}/cards/likes/${id}`, this.config)
            .then(this._checkResponse);
    }
}