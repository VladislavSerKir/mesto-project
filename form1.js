// console.log('work')

const formProp = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__field-error_active'
}

function enableValidation(prop) {
    let profileInputList = []
    let cardInputList = []
    const inputList = Array.from(document.querySelectorAll(prop.inputSelector));
    inputList.forEach((inputElement) => {
        // const formButton = formElement.querySelector(prop.submitButtonSelector)
        // setEventListeners(formElement, prop.inputSelector, formButton);

        if (inputElement.name === 'profile-name' || inputElement.name === 'profile-about') {
            profileInputList.push(inputElement);
        } else {
            cardInputList.push(inputElement);
        }
        // console.log(inputElement)
    });
    // console.log(profileInputList, cardInputList)
    setEventListenersProfile(profileInputList)
    // setEventListenersCard(cardInputList)
}

function setEventListenersProfile(profileInput) {
    profileInput.forEach(input => {
        console.log(input)

    })
}

function toggleButtonStateProfile(profileInputList, button) {
    // console.log(profileInputList)
    if (hasInvalidInputProfile(profileInputList)) {
        button.classList.add(formProp.inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(formProp.inactiveButtonClass);
        button.disabled = false;
    }
}

enableValidation(formProp); 