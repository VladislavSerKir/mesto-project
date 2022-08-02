import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
    constructor({ selector, profileFormSubmit }) {
        super(selector)
        // this._formSelector = formSelector;
        this.profileFormSubmit = profileFormSubmit;
    }

    _getInputValues() {

    }

    setEventListeners() {
        super.setEventListeners();
        this._selector.querySelector('.form__submit-button').addEventListener('submit', () => { this.profileFormSubmit() })
    }

    // close(form) {
    //     super.close()
    //     form.reset();
    // }
}