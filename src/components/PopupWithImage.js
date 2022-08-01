import { Popup } from "./Popup";
export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
    }

    open(data) {
        super.open()
        const popupImg = this._selector.querySelector('.popup__image')
        popupImg.src = data.link;
        popupImg.textContent = data.name;
        popupImg.alt = data.name;
    }
}