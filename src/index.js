import { renderCards } from './card.js';
import { formProp, enableValidation } from './validate.js';
import { listOfPopups, closeOverlay } from './utils.js';

renderCards();
closeOverlay(listOfPopups);
enableValidation(formProp);