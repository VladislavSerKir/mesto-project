import { Popup } from './Popup';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(card) {
    super.open();
    const popupImg = this._element.querySelector('.popup__image');
    popupImg.src = card.link;
    popupImg.alt = card.name;
    this._element.querySelector('.popup__text').textContent = card.name;
  }
}