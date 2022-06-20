// https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg

const showError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputErrorClass)
}

const hideError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.remove(inputErrorClass)
}

function hasInvalidInput(inputsList) {
    return inputsList.some((input) => {
        return !input.validity.valid;
    })
}

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {

    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        showError(formElement, inputElement, inputErrorClass);
    } else {
        hideError(formElement, inputElement, inputErrorClass);
    }
}

const toggleButtonState = (button, inputsList, inactiveButtonClass) => {
    if (hasInvalidInput(inputsList)) {
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    }
}

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) => {
    const inputsList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    toggleButtonState(submitButton, inputsList, inactiveButtonClass);

    inputsList.forEach(inputElement => {
        if ((inputElement.id === 'profile-name') || (inputElement.id === 'profile-about')) {
            checkInputValidity(formElement, inputElement, inputErrorClass);
        }
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass);
            toggleButtonState(submitButton, inputsList, inactiveButtonClass);
        })
    })
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
}

const enableValidation = ({ formSelector, ...rest }) => {
    const formList = document.querySelectorAll(formSelector);
    Array.from(formList).forEach(formElement => {
        setEventListeners(formElement, rest)
    })
}

const formProp = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__field-error_active'
}
const { inputSelector, ...rest } = formProp;

enableValidation(formProp);
