export class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    _renderUser() {
        this._name.textContent = this._user.name;
        this._about.textContent = this._user.about;
        this._avatar.src = this._user.avatar;
        this._avatar.alt = this._user.avatar;
    }

    getUserInfo(user) {

    }

    setUserInfo(user) {
        this._user = user;
        this._renderUser(this._user);
    }
}