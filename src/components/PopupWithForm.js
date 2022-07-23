import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor({selector, submitHandler}) {
    super(selector);
    this._formElement = this._element.querySelector('.form');
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._inputValues = {};
    this._formElement.querySelectorAll('.form__field').forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    this._submitHandler(this._formElement, this._getInputValues());
  }

  _setPopupWithFormEventListeners() {
    this._formElement.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  open(data) {
    super.open();
    this._setPopupWithFormEventListeners();
    if (data) {
      for (const key in data) {
        let input = this._formElement.querySelector(`.form__field_${key}`);
        if (input) {
          input.value = data[key];
        }
      }
    }
  }
}
