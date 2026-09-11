# SkillSwap

**SkillSwap** — веб-приложение для обмена навыками. Находите людей по интересам, смотрите, чему они могут научить, и рассказывайте о собственных умениях. Каталог помогает подобрать предложения по категориям и городу, а регистрация — создать профиль и первое предложение.

<details>
<summary><h2>Структура проекта</h2></summary>

```text
SkillSwap_54_2/
├── src/
│   ├── app/                 # Корневой компонент, провайдеры и общие стили
│   ├── api/                 # Загрузка JSON-данных
│   ├── entities/            # Пользователи, навыки и типы заявок
│   ├── features/            # Авторизация, регистрация, каталог и фильтры
│   ├── pages/               # Страницы приложения
│   ├── shared/
│   │   ├── hooks/           # Общие хуки
│   │   ├── lib/             # Константы и вспомогательные функции
│   │   ├── types/           # Общие типы TypeScript
│   │   └── ui/              # Переиспользуемые компоненты интерфейса
│   ├── store/               # Redux-хранилище и типизированные хуки
│   ├── widgets/             # Шапка, карточки, фильтры и другие блоки
│   ├── setupTests.ts        # Настройка тестового окружения
│   └── main.tsx             # Точка входа приложения
├── public/
│   └── db/                  # Демонстрационные данные пользователей и навыков
├── index.html               # HTML-шаблон главной страницы
├── vite.config.ts           # Настройки сборщика Vite
├── vitest.config.ts         # Настройки Vitest
├── eslint.config.js         # Настройки ESLint
├── tsconfig.json            # Настройки TypeScript
├── package.json             # Зависимости и команды
└── README.md                # Документация проекта
```

</details>

## Технологический стек:

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=for-the-badge&logo=cssmodules&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Yup](https://img.shields.io/badge/Yup-4B5563?style=for-the-badge)

### Инструменты разработки

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Stylelint](https://img.shields.io/badge/Stylelint-263238?style=for-the-badge&logo=stylelint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

ESLint и Stylelint проверяют код и стили, Prettier отвечает за форматирование. Для тестирования настроены Vitest и Testing Library; тестовые сценарии пока не добавлены.

## Основной функционал
- Каталог: карточки пользователей с навыками «Могу научить» и «Хочу научиться».
- Фильтры: выбор категорий, подкатегорий, города, пола и направления обмена.
- Подборки: популярные и новые предложения, рекомендации с постепенным показом карточек.
- Детали навыка: описание, галерея изображений, информация об авторе и похожие предложения.
- Регистрация: три шага с заполнением личных данных, выбором интересов и описанием своего навыка.
- Предпросмотр: проверка предложения перед завершением регистрации.
- Авторизация: вход, выход и ограничение доступа к приватным страницам.

## Реализация:
- Код разделён на слои `app`, `pages`, `widgets`, `features`, `entities` и `shared` по принципам `Feature-Sliced Design`.
- Redux Toolkit хранит пользователей, навыки, состояние авторизации, регистрации и фильтров.
- Селекторы объединяют данные пользователей и навыков, формируют подборки и результаты фильтрации.
- Формы реализованы через React Hook Form, правила проверки описаны с помощью Yup.
- Страницы загружаются через `React.lazy`, доступ к приватным маршрутам контролирует `PrivateRoute`.
- Исходные данные загружаются из JSON-файлов в `public/db`. Новые пользователи, навыки и черновик регистрации сохраняются в `localStorage`.

## Текущий статус

- Приложение работает с демонстрационными данными без отдельного backend-сервера. Авторизация имитируется на стороне браузера.
- Интерфейсы профиля и избранного подготовлены, но сохранение изменений профиля и подключение избранных карточек к странице пока не завершены.
- Предложение обмена реализовано как интерфейсный сценарий без отправки заявки другому пользователю. Отдельная страница создания навыка находится в разработке.


## Запуск
1. В каталоге проекта установите зависимости:

```bash
npm ci
```

2. Запустите приложение:

```bash
npm run dev
```

## Полезные команды

| Команда | Назначение |
| --- | --- |
| `npm run dev` | запуск сервера разработки |
| `npm run build` | проверка TypeScript и сборка проекта в `dist` |
| `npm run preview` | локальный просмотр готовой сборки |
| `npm run lint` | проверка кода и стилей |
| `npm run lint:fix` | автоматическое исправление ошибок линтеров |
| `npm run format` | форматирование файлов проекта |
| `npm test` | запуск Vitest |
| `npm run test:watch` | запуск Vitest в режиме наблюдения |
