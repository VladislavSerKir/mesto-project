export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__field-error_active'
}

export const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: 'c78a0ff3-e5d6-4d7f-a1e3-4df178535103',
        'Content-Type': 'application/json'
    }
}