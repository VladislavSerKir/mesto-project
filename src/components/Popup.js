export class Popup {
    constructor(selector) {
        this._selector = document.querySelector(selector);
    }

    open() {
        this._selector.classList.add('popup_opened')
    }

    close() {
        this._selector.classList.remove('popup_opened')
    }

    _handleEscClose(event) {
        console.log(event.key)
        if (event.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        this._selector.querySelector('.popup__close-button').addEventListener('click', () => { this.close() });
        this._selector.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('popup_opened')) {
                this.close()
            }
        })
        document.addEventListener('keydown', (event) => { this._handleEscClose(event) })
    }
}