export default class Api {
    constructor(config) {
        this._config = config;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
    }

    getUser() {
        this._config.method = 'GET';
        return fetch(`${this._config.baseUrl}/users/me`, this._config)
            .then(this._checkResponse);
    }

    updateUser(user) {
        this._config.method = 'PATCH';
        this._config.body = JSON.stringify(user);
        return fetch(`${this._config.baseUrl}/users/me`, this._config)
            .then(this._checkResponse);
    }

    getCards() {
        this._config.method = 'GET';
        return fetch(`${this._config.baseUrl}/cards`, this._config)
            .then(this._checkResponse);
    }

    addCard(card) {
        this._config.method = 'POST';
        this._config.body = JSON.stringify(card);
        return fetch(`${this._config.baseUrl}/cards`, this._config)
            .then(this._checkResponse);
    }

    removeCard(id) {
        this._config.method = 'DELETE';
        return fetch(`${this._config.baseUrl}/cards/${id}`, this._config)
            .then(this._checkResponse);
    }

    updateAvatar(avatar) {
        this._config.method = 'PATCH';
        this._config.body = JSON.stringify({ avatar });
        return fetch(`${this._config.baseUrl}/users/me/avatar`, this._config)
            .then(this._checkResponse);
    }

    likeCard(id) {
        this._config.method = 'PUT';
        return fetch(`${this._config.baseUrl}/cards/likes/${id}`, this._config)
            .then(this._checkResponse);
    }

    dislikeCard(id) {
        this._config.method = 'DELETE';
        return fetch(`${this._config.baseUrl}/cards/likes/${id}`, this._config)
            .then(this._checkResponse);
    }
}