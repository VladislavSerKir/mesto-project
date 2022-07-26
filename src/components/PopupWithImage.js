import { Popup } from './Popup';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(data) {
    super.open();
    const popupImg = this._element.querySelector('.popup__image');
    popupImg.src = data.link;
    popupImg.alt = data.name;
    this._element.querySelector('.popup__text').textContent = data.name;
  }
}