(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{xN:()=>I,WO:()=>R,ad:()=>M,zk:()=>A,O9:()=>w,rN:()=>U,D2:()=>N,Rf:()=>O,iZ:()=>W,UY:()=>Y});var e=document.querySelector(".popup_type_image"),n=e.querySelector(".popup__close-button_type_image"),o=document.querySelector(".popup__close-button_type_profile"),r=document.querySelector(".popup__close-button_type_card"),c=document.querySelector(".popup__close-button_type_avatar"),a=document.querySelector(".popup__close-button_type_confirm");function i(t){t.classList.add("popup_opened"),document.addEventListener("keydown",l)}function u(t){t.classList.remove("popup_opened"),document.removeEventListener("keydown",l)}function l(t){var e=document.querySelector(".popup_opened");"Escape"===t.key&&e&&u(e)}n.addEventListener("click",(function(){u(e)})),o.addEventListener("click",(function(){u(O)})),r.addEventListener("click",(function(){u(m)})),c.addEventListener("click",(function(){u(v)})),a.addEventListener("click",(function(){u(b)})),e.querySelector(".popup__close-button_type_image");var s,d=e.querySelector(".popup__image"),f=e.querySelector(".popup__text"),p=Array.from(document.querySelectorAll(".popup")),m=document.querySelector(".popup_type_card"),_=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__add-button"),y=document.querySelector(".profile__avatar-link"),v=document.querySelector(".popup_type_avatar"),b=document.querySelector(".popup_type_confirm"),S={baseUrl:"https://nomoreparties.co/v1",cohortId:"plus-cohort-13",headers:{authorization:"c78a0ff3-e5d6-4d7f-a1e3-4df178535103","Content-Type":"application/json"}};function k(t){return t.ok?t.json():Promise.reject("Ошибка:".concat(t.status," ").concat(t.statusText))}(s=S,fetch("".concat(s.baseUrl,"/").concat(s.cohortId,"/users/me"),{method:"GET",headers:{authorization:s.headers.authorization,"Content-Type":"application/json"}}).then(k).then((function(t){return A.textContent=t.name,U.textContent=t.about,I.src=t.avatar,W.id=t._id,t})).catch((function(t){console.log("Ошибка: ".concat(t.status,", ").concat(t.statusText))}))).then((function(){!function(t){fetch("".concat(t.baseUrl,"/").concat(t.cohortId,"/cards"),{method:"GET",headers:{authorization:t.headers.authorization,"Content-Type":"application/json"}}).then(k).then((function(t){return Y(t),t})).catch((function(t){console.log("Ошибка: ".concat(t.status,", ").concat(t.statusText))}))}(S)}));var q=document.querySelector("#cards"),E=q.querySelector("#card");function L(t,n){var o=E.content.cloneNode(!0).querySelector(".element");o.id=t._id,o.querySelector(".element__title").textContent=t.name;var r=o.querySelector(".element__delete-button"),c=o.querySelector(".element__image"),a=o.querySelector(".element__likes");return c.setAttribute("src","".concat(t.link)),c.setAttribute("alt","".concat(t.name)),t.likes.length&&(a.textContent=t.likes.length),t.owner._id!==W.id&&r.classList.add("element__delete-button_disabled"),Array.from(t.likes).forEach((function(t){t._id===W.id&&o.querySelector(".element__like-button").classList.add("element__like-button_liked_true")})),r.addEventListener("click",(function(t){n(t,o.id)})),o.querySelector(".element__like-button").addEventListener("click",(function(t){!function(t,e,n){!function(t,e,n,o){fetch("".concat(t.baseUrl,"/").concat(t.cohortId,"/cards"),{method:"GET",headers:{authorization:t.headers.authorization,"Content-Type":"application/json"}}).then(k).then((function(t){return t.find((function(t){if(t._id===e.target.closest(".element").id)return t.likes}))})).then((function(r){r.likes.some((function(t){if(t._id===o)return!0}))?function(t,e,n){fetch("".concat(t.baseUrl,"/").concat(t.cohortId,"/cards/likes/").concat(e.target.closest(".element").id),{method:"DELETE",headers:{authorization:t.headers.authorization,"Content-Type":"application/json"}}).then(k).then((function(t){return t.likes.length?n.textContent=t.likes.length:n.textContent="",e.target.classList.remove("element__like-button_liked_true"),t}))}(t,e,n):function(t,e,n){fetch("".concat(t.baseUrl,"/").concat(t.cohortId,"/cards/likes/").concat(e.target.closest(".element").id),{method:"PUT",headers:{authorization:t.headers.authorization,"Content-Type":"application/json"}}).then(k).then((function(t){return n.textContent=t.likes.length,e.target.classList.add("element__like-button_liked_true"),t}))}(t,e,n)})).catch((function(t){console.log("Ошибка: ".concat(t.status,", ").concat(t.statusText))}))}(S,t,n,e)}(t,W.id,a)})),c.addEventListener("click",(function(){return o=(n=t).link,r=n.name,i(e),d.setAttribute("src",o),d.setAttribute("alt",r),void(f.textContent=r);var n,o,r})),o}var g=function(t,e){var n=function n(o){o.preventDefault(),function(t,e){return fetch("".concat(t.baseUrl,"/").concat(t.cohortId,"/cards/").concat(e),{method:"DELETE",headers:{authorization:t.headers.authorization,"Content-Type":"application/json"}}).then(k).then((function(t){return t})).catch((function(t){console.log("Ошибка: ".concat(t.status,", ").concat(t.statusText))}))}(S,e).then((function(){t.target.closest(".element").remove()})).then((function(){u(b)})).catch((function(t){console.log("Ошибка: ".concat(t.status,", ").concat(t.statusText))})),b.removeEventListener("submit",n)};b.addEventListener("click",(function(t){!t.target.classList.contains("popup__close-button_type_confirm")&&t.target.closest(".popup__container")||b.removeEventListener("submit",n)})),document.addEventListener("keydown",(function(){b.removeEventListener("submit",n)})),b.addEventListener("submit",n),i(b)},C=["formSelector"];function x(t,e,n){e.validity.valid?function(t,e,n){t.querySelector("#".concat(e.id,"-error")).textContent=e.validationMessage,e.classList.remove(n)}(t,e,n):function(t,e,n){t.querySelector("#".concat(e.id,"-error")).textContent=e.validationMessage,e.classList.add(n)}(t,e,n)}function T(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(e)?(t.classList.remove(n),t.disabled=!1):(t.classList.add(n),t.disabled=!0)}function z(t){var e=t.formSelector,n=function(t,e){if(null==t)return{};var n,o,r=function(t,e){if(null==t)return{};var n,o,r={},c=Object.keys(t);for(o=0;o<c.length;o++)n=c[o],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(o=0;o<c.length;o++)n=c[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}(t,C),o=document.querySelectorAll(e);Array.from(o).forEach((function(t){!function(t,e){var n=e.inputSelector,o=e.submitButtonSelector,r=e.inactiveButtonClass,c=e.inputErrorClass,a=Array.from(t.querySelectorAll(n)),i=t.querySelector(o);T(i,a,r),a.forEach((function(e){"profile-name"!==e.id&&"profile-about"!==e.id||(x(t,e,c),T(i,a,r)),e.addEventListener("input",(function(){x(t,e,c),T(i,a,r)}))})),t.addEventListener("submit",(function(t){t.preventDefault()}))}(t,n)}))}var j={formSelector:".form",inputSelector:".form__field",submitButtonSelector:".form__submit-button",inactiveButtonClass:"form__submit-button_disabled",inputErrorClass:"form__field_type_error",errorClass:"form__field-error_active"},O=document.querySelector(".popup_type_profile"),A=document.querySelector(".profile__title"),U=document.querySelector(".profile__occupation"),I=document.querySelector(".profile__avatar"),P=document.querySelector("#form-avatar"),D=document.querySelector("#form-profile"),w=D.querySelector(".form__field_profile_name"),N=D.querySelector(".form__field_profile_occupation"),B=document.querySelector("#form-card"),G=B.querySelector(".form__field_card_name"),J=B.querySelector(".form__field_card_link"),H=P.querySelector(".form__field_avatar_link"),M=document.querySelector("#form-profile-button"),R=document.querySelector("#form-avatar-button"),W=document.querySelector(".profile");function Y(t){t.forEach((function(t){q.append(L(t,g))}))}B.addEventListener("submit",(function(t){t.preventDefault();var e={};e.name=G.value,e.link=J.value,function(t,e){fetch("".concat(t.baseUrl,"/").concat(t.cohortId,"/cards"),{method:"POST",headers:{authorization:t.headers.authorization,"Content-Type":"application/json"},body:JSON.stringify({name:e.name,link:e.link})}).then(k).then((function(t){return q.prepend(L(t,g)),t})).catch((function(t){console.log("Ошибка: ".concat(t.status,", ").concat(t.statusText))}))}(S,e),G.value="",J.value="",u(m)})),D.addEventListener("submit",(function(t){t.preventDefault(),M.textContent="Сохранение...",function(t,e,n){fetch("".concat(t.baseUrl,"/").concat(t.cohortId,"/users/me"),{method:"PATCH",headers:{authorization:t.headers.authorization,"Content-Type":"application/json"},body:JSON.stringify({name:e,about:n})}).then(k).then((function(t){return A.textContent=t.name,U.textContent=t.about,M.textContent="Сохранить",t})).catch((function(t){console.log("Ошибка: ".concat(t.status,", ").concat(t.statusText))}))}(S,w.value,N.value),u(O)})),P.addEventListener("submit",(function(t){t.preventDefault(),R.textContent="Сохранение...",function(t,e){fetch("".concat(t.baseUrl,"/").concat(t.cohortId,"/users/me/avatar"),{method:"PATCH",headers:{authorization:t.headers.authorization,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then(k).then((function(t){return I.src=t.avatar,R.textContent="Сохранить",t})).catch((function(t){console.log("Ошибка: ".concat(t.status,", ").concat(t.statusText))}))}(S,H.value),H.value="",u(v)})),_.addEventListener("click",(function(){w.value=A.textContent,N.value=U.textContent,i(O)})),h.addEventListener("click",(function(){i(m)})),y.addEventListener("click",(function(){i(v)})),_.addEventListener("click",(function(){z(j)})),h.addEventListener("click",(function(){z(j)})),y.addEventListener("click",(function(){z(j)})),function(t){t.forEach((function(t){t.addEventListener("click",(function(e){e.target===t&&u(t)}))}))}(p),z(j)})();