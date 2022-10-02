# Проект Яндекса: 'Место'

![2022-10-02_13-41-23](https://user-images.githubusercontent.com/83783362/193449975-043c8b0b-d479-49c7-b871-76b6d5777925.png)

Проект Место представляет из себя простую концепцию полей с информацией о пользователе (Имя, Профессия, Ссылка на аватар), совмещенную с 
интерактивным всплывающим окном, предоставляющим возможность добавления пользовательской карточки. На странице так-же отрисовываются карточки,
добавленные другими пользователями потока курса. Есть возможность ставить лайк, удалять или приближать, путем открытия попапа с картинкой.
Удаление карточек возможно только для карточек, созданных пользователем. Есть возможность редактирования данных пользователя через соответствующий попап.

## Реализация и технологии в проекте
Для написания проекта использовался сборщик Webpack. В нем установлено все необходимые модули и пакеты для разработки SPA на нативном JS и компиляцией CSS
* Для работы webpack с CSS стилями использовался плагин css-loader, а для трансформации и добавления вендорных префиксов для разных браузеров использовался postcss-loader
* Для написания структуры стилей использовалась БЭМ методология, с созданием иерархии папок и файлов (Nested)
* Транспиляция JS кода в старый синтаксис осуществляется при помощи Babel. Для крайних случаев была добавлена библиотека полифилов core-js.

Данный проект был написан на **функциональных компонентах**. Код можно посмотеть [здесь](https://github.com/VladislavSerKir/mesto-project/commits/main). 
И на **классовых компонентах** с использованием паттерна ООП совместно с [Иваном Фониным](https://github.com/ivanfonin). Код можно посмотеть [здесь](https://github.com/VladislavSerKir/mesto-project/commits/feat/mesto-update).
### Реализация

Страница сверстана адаптивно с 320 до 1440px и условно разделена на 2 части.
* **Первая**: Информация о пользователе
* **Вторая**: Блок с карточками пользователей 

При нажатии на кнопку редактирования профиля  появляется диалоговое окно, предоставляющее возможность внести изменения в профиль. 
В полях реализована динамическая валидация с триггером включения/выключения кнопки подтверждения.
Аналогично можно поменять аватар с помощью нажатия на иконку аватара

![Запись экрана 2022-10-02 в 14 23 45](https://user-images.githubusercontent.com/83783362/193451593-2d9383b4-6ff2-4ae3-8c9a-9f2262f84592.gif)

При нажатии на кнопку + (добавление карточки), появляется окно добавления карточки. Предоставляется возможность ввода имени и ссылки на карточку.

![Запись экрана 2022-10-02 в 14 32 50](https://user-images.githubusercontent.com/83783362/193451935-7fe40be1-c0d0-420d-a64b-619f873ab9ea.gif)

### Технологии
<p>
  <img alt="html5" src="https://img.shields.io/badge/-HTML5-ffffff?style=for-the-badge&logo=html5&logoColor=e54c21"/>
      <img alt="CSS" src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
      <img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-ffffff?style=for-the-badge&logo=javascript&logoColor=f7df1d"/>
       <img alt="Webpack" src="https://img.shields.io/badge/-Webpack-ffffff?style=for-the-badge&logo=webpack&logoColor=1b74ba"/>
          <img alt="Figma" src="https://img.shields.io/badge/-Figma-ffffff?style=for-the-badge&logo=figma&logoColor=f24e1e"/>
</p>

## Установка, настройка
Проект, развернутый на Github:  [GitHub Pages](https://vladislavserkir.github.io/mesto-project/)
- Установка зависимостей: `npm install`
- Режим разработки: `npm run dev`
- Сформировать проект для последующего размещения на ресурсах: `npm run build`
- Сформировать заново проект для отображения на GitHub pages: `npm run deploy`
## Написать мне
[![github](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github)](https://github.com/VladislavSerKir)
[![telegram](https://img.shields.io/badge/Telegram-68c4f0?style=for-the-badge&logo=telegram)](https://t.me/vl_kireev)
