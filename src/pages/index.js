import './index.css';
import '../components/Api';
import { config } from '../components/utils/utils.js';
import { Api } from '../components/Api';
import { UserInfo } from '../components/UserInfo';

const server = new Api(config);

Promise.all([server.getUser(), server.getCards()])
    .then(([user, cards]) => {
        const userInfo = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar' });
        userInfo.setUserInfo(user)
        console.log(cards)

    })


// console.log(server.getUser(), server.getCards());