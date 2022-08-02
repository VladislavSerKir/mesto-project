export class Api {
    constructor(options) {
        this._options = options;
    }

    _checkResponse(data) {
        return data.ok ? data.json() : Promise.reject(`Ошибка:${data.status} ${data.statusText}`)
    }

    getUser() {
        this._options.method = 'GET';
        return fetch(`${this._options.baseUrl}/users/me`, this._options)
            .then(this._checkResponse)
    }

    getCards() {
        this._options.method = 'GET';
        return fetch(`${this._options.baseUrl}/cards`, this._options)
            .then(this._checkResponse)
    }

    editUser(user) {
        this._options.method = 'PATCH';
        this._options.body = JSON.stringify(user);
        return fetch(`${this._options.baseUrl}/users/me`, this._options)
            .then(this._checkResponse)
    }

    addCard(card) {
        this._options.method = 'POST';
        this._options.body = JSON.stringify(card);
        return fetch(`${this._options.baseUrl}/cards`, this._options)
            .then(this._checkResponse)
    }

    deleteCard(id) {
        this._options.method = 'DELETE';
        return fetch(`${this._options.baseUrl}/cards/${id}`, this._options)
            .then(this._checkResponse)
    }

    updateAvatar(link) {
        this._options.method = 'PATCH';
        this._options.body = JSON.stringify(link);
        return fetch(`${this._options.baseUrl}/users/me/avatar`, this._options)
            .then(this._checkResponse)
    }

    likeCard(id) {
        this._options.method = 'PUT';
        return fetch(`${this._options.baseUrl}/cards/likes/${id}`, this._options)
            .then(this._checkResponse)

    }

    dislikeCard(id) {
        this._options.method = 'DELETE';
        return fetch(`${this._options.baseUrl}/cards/likes/${id}`, this._options)
            .then(this._checkResponse)
    }
}