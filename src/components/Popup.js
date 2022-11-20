export class Popup {
    constructor(selector) {
        this._element = document.querySelector(selector);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close(); 
        };
    }

    _handleClosePopupClick = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
        if (evt.target.classList.contains('popup__close-button')) {
            this.close();
        }
    }

    _setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._element.addEventListener('mousedown', this._handleClosePopupClick);
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._element.removeEventListener('mousedown', this._handleClosePopupClick);
    }

    open() {
        this._element.classList.add('popup_opened');
        this._setEventListeners();
    }

    close() {
        this._element.classList.remove('popup_opened');
        this._removeEventListeners();
    }
}