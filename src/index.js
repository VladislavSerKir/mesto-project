import './pages/index.css';
import { renderCards } from './components/card.js';
import { formProp, enableValidation } from './components/validate.js';
import { listOfPopups, closeOverlay } from './components/utils.js';

renderCards();
closeOverlay(listOfPopups);
enableValidation(formProp);