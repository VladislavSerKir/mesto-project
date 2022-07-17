import './index.css';

import {
    apiConfig
} from '../components/utils/constants.js';
import Api from '../components/Api.js';

const server = new Api(apiConfig);

console.log(server.getUserInfo());

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
