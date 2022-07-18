import './index.css';

import {
    apiConfig
} from '../components/utils/constants';
import Api from '../components/Api';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import Card from '../components/Card';

const server = new Api(apiConfig);
const profile = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__occupation',
    avatarSelector: '.profile__avatar'
});

Promise.all([server.getUser(), server.getCards()])
    .then(([user, cards]) => {
        // Добавить данные пользователя.
        profile.setUserInfo(user);

        // Создать и отрисовать карточки.
       const cardsSection = new Section({
            items: cards,
            renderer: function(item) {
                const card = new Card({
                    card: item,
                    user: user,
                    template: '#card',
                    handleCardClick: function() {
                        console.log('click');
                    },
                    handleDeleteClick: function() {
                        console.log('delete');
                    },
                    handleLikeClick: function(id, cardElement) {

                        console.log('click');
                        
                        if (cardElement.classList.contains('element__like-button_active')) {
                            console.log('dislike');
                            server.dislikeCard(id)
                                .then(card => {
                                    cardElement.querySelector('.element__like-button').classList.remove('element__like-button_active');
                                    cardElement.querySelector('.element__likes').textContent = card.likes.length;
                                })
                                .catch(err => console.log(err));
                        } else {
                            console.log('like');
                            server.likeCard(id)
                                .then(card => {
                                    cardElement.querySelector('.element__like-button').classList.add('element__like-button_active');
                                    cardElement.querySelector('.element__likes').textContent = card.likes.length;
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
