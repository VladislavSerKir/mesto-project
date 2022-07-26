import './index.css';

let cardsSection;
let currentCard;

import {
    config,
    profileButton,
    avatarButton,
    cardButton,
    logError,
    renderLoader,
}
    from '../components/utils/utils';

import { Api } from '../components/Api';
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { FormValidator } from '../components/FormValidator';

const server = new Api(config.api);
const profile = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__occupation',
    avatarSelector: '.profile__avatar'
});
const profileFormValidator = new FormValidator(config.validator, '#form-profile');
const avatarFormValidator = new FormValidator(config.validator, '#form-avatar');
const cardFormValidator = new FormValidator(config.validator, '#form-card');

const imagePopup = new PopupWithImage('.popup_type_image');
const profilePopup = new PopupWithForm({
    selector: '.popup_type_profile',
    submitHandler: function (form, data) {
        renderLoader(form, 'Сохраняем');
        server.updateUser(data)
            .then(user => {
                renderLoader(form, 'Сохранить');
                profile.setUserInfo(user);
                profilePopup.close();
            })
            .catch(logError);
    }
});
const avatarPopup = new PopupWithForm({
    selector: '.popup_type_avatar',
    submitHandler: function (form, data) {
        renderLoader(form, 'Сохраняем');
        server.updateAvatar(data)
            .then(user => {
                renderLoader(form, 'Сохранить');
                profile.setUserInfo(user);
                avatarPopup.close();
            })
            .catch(logError);
    }
});

const cardPopup = new PopupWithForm({
    selector: '.popup_type_card',
    submitHandler: function (form, data) {
        renderLoader(form, 'Сохраняем');
        server.addCard(data)
            .then(data => {
                renderLoader(form, 'Сохранить');
                const cardElement = cardGenerator(data);
                cardsSection.addItem(cardElement);
                cardPopup.close();
            })
            .catch(logError);
    }
});

const confirmPopup = new PopupWithForm({
    selector: '.popup_type_confirm',
    submitHandler: function (form, data) {
        renderLoader(form, 'Удаляем');
        server.removeCard(data.id)
            .then(message => {
                renderLoader(form, 'Да');
                currentCard.delete();
                confirmPopup.close();
            })
            .catch(logError);
    }
});

const cardGenerator = (data) => {
    const card = new Card({
        card: data,
        user: profile.getUserInfo(),
        template: '#card',
        handleCardClick: function (card) {
            imagePopup.open(card);
        },
        handleDeleteClick: function (id, cardInstance) {
            currentCard = cardInstance;
            confirmPopup.open({ id });
        },
        handleLikeClick: function (id, buttonElement) {
            if (buttonElement.classList.contains('element__like-button_active')) {
                server.dislikeCard(id)
                    .then(card => {
                        buttonElement.classList.remove('element__like-button_active');
                        buttonElement.nextElementSibling.textContent = card.likes.length;
                    })
                    .catch(logError);
            } else {
                server.likeCard(id)
                    .then(card => {
                        buttonElement.classList.add('element__like-button_active');
                        buttonElement.nextElementSibling.textContent = card.likes.length;
                    })
                    .catch(logError);
            }
        }
    });
    return card.generate();
}

Promise.all([server.getUser(), server.getCards()])
    .then(([user, cards]) => {
        // Добавить данные пользователя.
        profile.setUserInfo(user);
        // Создать и отрисовать карточки.
        cardsSection = new Section({
            items: cards,
            renderer: function (item) {
                const cardElement = cardGenerator(item);
                cardsSection.setItem(cardElement);
            }
        },
            '.elements');
        cardsSection.renderItems();
    })
    .catch(logError);


profileButton.addEventListener('click', function () {
    profilePopup.open(profile.getUserInfo());
    profileFormValidator.reset();
});

avatarButton.addEventListener('click', function () {
    avatarPopup.open();
    avatarFormValidator.reset();
});

cardButton.addEventListener('click', function () {
    cardPopup.open();
    cardFormValidator.reset();
});

profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
cardFormValidator.enableValidation();
