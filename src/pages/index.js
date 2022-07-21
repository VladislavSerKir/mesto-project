import './index.css';

import {
    config,
    profileButton,
    avatarButton,
    logError,
    renderLoader
} from '../components/utils/constants';

import { Api } from '../components/Api';
import { Section } from '../components/Section';
import { UserInfo } from '../components/UserInfo';
import { Card } from '../components/card';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';

const server = new Api(config.api);
const profile = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__occupation',
    avatarSelector: '.profile__avatar'
});
const imagePopup = new PopupWithImage('.popup_type_image');
const profilePopup = new PopupWithForm({
    selector: '.popup_type_profile',
    submitHandler: function(form, data) {
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
    submitHandler: function(form, data) {
        renderLoader(form, 'Сохраняем');
        console.log(data);
        server.updateAvatar(data)
            .then(user => {
                renderLoader(form, 'Сохранить');
                profile.setUserInfo(user);
                avatarPopup.close();
            })
            .catch(logError);
    }
});

profileButton.addEventListener('click', function () {
    profilePopup.open(profile.getUserInfo());
});

avatarButton.addEventListener('click', function () {
    avatarPopup.open(profile.getUserInfo());
});

Promise.all([server.getUser(), server.getCards()])
    .then(([user, cards]) => {
        // Добавить данные пользователя.
        profile.setUserInfo(user);

        // Создать и отрисовать карточки.
        const cardsSection = new Section({
            items: cards,
            renderer: function (item) {
                const card = new Card({
                    card: item,
                    user: user,
                    template: '#card',
                    handleCardClick: function (card) {
                        imagePopup.open(card);
                    },
                    handleDeleteClick: function () {
                        console.log('delete');
                    },
                    handleLikeClick: function (id, buttonElement) {

                        if (buttonElement.classList.contains('element__like-button_active')) {
                            server.dislikeCard(id)
                                .then(card => {
                                    buttonElement.classList.remove('element__like-button_active');
                                    buttonElement.nextElementSibling.textContent = card.likes.length;
                                })
                                .catch(err => console.log(err));
                        } else {
                            server.likeCard(id)
                                .then(card => {
                                    buttonElement.classList.add('element__like-button_active');
                                    buttonElement.nextElementSibling.textContent = card.likes.length;
                                })
                                .catch(err => console.log(err));
                        }

                    }
                });
                const cardElement = card.generate();
                cardsSection.addItem(cardElement);
            }
        },
            '.elements');
        cardsSection.renderItems();
    })
    .catch(err => {
        console.log(`Ошибка: ${err}`)
    });

// console.log(server.getUserInfo());

// Promise.all([server.getUserInfo(), server.getCards()])
//     .then(([userData, cards]) => {
//         nameField.textContent = userData.name;
//         occupationField.textContent = userData.about;
//         avatarField.src = userData.avatar
//         profileID.id = userData._id
//         renderCards(cards)
//         return userData, cards
//     })
//     .catch(err => {
//         console.log(`Ошибка: ${err}`)
//     });
