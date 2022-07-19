export default class Popup {
    constructor(selector) {
        this._element = document.querySelector(selector);
    }

    _handleEscClose(evt) {
        console.log(this); // Здесь ты говорил document
        if (evt.key === 'Escape') {
            console.log('Escape');
            this.close(); // поэтому здесь метод close не вызывался, потерян контекст
            console.log('after close');
        };
    }

    open() {
        this._element.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        console.log('333')
        this._element.classList.remove('popup_opened')
        document.removeEventListener('keydown', () => {
            this._handleEscClose(); // через стрелочную функцию попробовал вызвать _handleEscClose, чтобы в this был текущий экземпляр класса, а не document
        });
    }

    setEventListeners() {
        // добавляет слушатель клика на иконку "закрыть"
        // слушатель клика на оверлей

        this._element.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close()
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.close()
            }
        })
    }
}