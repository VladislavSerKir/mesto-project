export class FormValidator {
    constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, selector) {
        this._formElement = document.querySelector(selector);
        this._inputsList = Array.from(this._formElement.querySelectorAll(inputSelector));
        this._submitButton = this._formElement.querySelector(submitButtonSelector);
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
    }

    _showError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement);
        } else {
            this._hideError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputsList.some((input) => {
            return !input.validity.valid;
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputsList)) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputsList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        });
    }

    reset() {
        this._inputsList.forEach(inputElement => {
            this._hideError(inputElement);
            this._toggleButtonState();
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}