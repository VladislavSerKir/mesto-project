export { cardsInfo, validationConfig };

const cardsInfo = []

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__field-error_active'
}

// export const handleDeleteCard = (card) => {
//     card.remove();
//     card = null; // лучше занулять элемент
// };

//    handleDelete (cardElement, cardId) => {
//     const handleRemoveCardSubmit = (evt) => {
//         evt.preventDefault();

//         removeCard(cardId)
//             .then(() => {
//                 handleDeleteCard(cardElement); // удаление карточки из размтетку  должно происходить только в случае успешного запроса
//                 closeModalWindow(removeCardModalWindow);  // закрытие модальных окон должно происходить только в случае успешного запроса
//             })
//             .catch(err => console.log(`При удалении карточки: ${err}`));
//         removeCardModalWindow.removeEventListener('submit', handleRemoveCardSubmit);
//     };
//     removeCardModalWindow.addEventListener('submit', handleRemoveCardSubmit);

//     openModalWindow(removeCardModalWindow);
// }

// deleteButton.addEventListener('click', () => handleDelete(cardElement, cardId));