import './index.css';
import '../components/Api';
import { config } from '../components/utils/utils.js';
import { Api } from '../components/Api';
import { UserInfo } from '../components/UserInfo';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { Popup } from '../components/Popup';
import { PopupWithImage } from '../components/PopupWithImage';

const server = new Api(config);

const profilePopup = new Popup('.popup_type_profile');
const cardPopup = new Popup('.popup_type_card');
const avatarPopup = new Popup('.popup_type_avatar');

const imagePopup = new PopupWithImage('.popup_type_image');

document.querySelector('.profile__edit-button').addEventListener('click', () => { profilePopup.open() })
profilePopup.setEventListeners();
document.querySelector('.profile__add-button').addEventListener('click', () => { cardPopup.open() })
cardPopup.setEventListeners();
document.querySelector('.profile__avatar-link').addEventListener('click', () => { avatarPopup.open() })
avatarPopup.setEventListeners();

imagePopup.setEventListeners()

Promise.all([server.getUser(), server.getCards()])
    .then(([user, cards]) => {
        const userInfo = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar' });
        userInfo.setUserInfo(user)

        const cardSection = new Section({
            items: cards,
            renderer: (item) => {
                const card = new Card({
                    userInfo: user,
                    cardData: item,
                    template: '.template',
                    handleCardClick: (prop) => {
                        imagePopup.open(prop)
                    },
                    handleCardDelete: (ownerID, cardID) => {
                        console.log('handleCardDelete', ownerID, cardID)

                    },
                    handleCardLike: (cardLikes, userID, cardID) => {
                        console.log('handleLikeCard', cardLikes, cardID, item._id, user._id)
                        console.log(cardLikes.some((item) => { item._id === userID }))
                        if (cardLikes.some(item => { item._id === user._id })) {
                            console.log('true')
                            server.likeCard(cardID)
                                .then(() => {
                                    console.log(item)
                                })
                        }
                    }
                })
                const cardElement = card.generate()
                cardSection.addItem(cardElement)
            }
        }, '.elements')
        cardSection.renderItem()
    })
