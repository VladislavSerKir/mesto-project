import './index.css';
import '../components/Api';
import { config } from '../components/utils/utils.js';
import { Api } from '../components/Api';
import { UserInfo } from '../components/UserInfo';
import { Section } from '../components/Section';
import { Card } from '../components/Card';

const server = new Api(config);

Promise.all([server.getUser(), server.getCards()])
    .then(([user, cards]) => {
        const userInfo = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar' });
        userInfo.setUserInfo(user)

        const cardSection = new Section({
            items: cards,
            renderer: (item) => {
                const card = new Card({
                    cardData: item,
                    template: '.template',
                    handleCardClick: (prop) => {
                        console.log('handleCardClick', prop)
                    },
                    handleCardDelete: (prop) => {
                        console.log('handleCardDelete', prop)
                    },
                    handleCardLike: (prop) => {
                        console.log('handleLikeCard', prop)
                    }
                })
                const cardElement = card.generate()
                cardSection.addItem(cardElement)
            }
        }, '.elements')
        cardSection.renderItem()
    })
