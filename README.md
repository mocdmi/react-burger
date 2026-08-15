# 🍔 Stellar Burger

[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-764abc?style=flat-square&logo=redux)](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-764abc?style=flat-square&logo=redux)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2.3-fcc72b?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Cypress](https://img.shields.io/badge/Cypress-14.4.1-000000?style=flat-square&logo=cypress)](https://www.cypress.io/)

Интерактивное веб-приложение для создания и заказа кастомизированных бургеров. Проект реализован в рамках курса [React Developer](https://practicum.yandex.ru/react/) от Яндекс.Практикум.

🔗 [Ссылка на проект](https://stellar-burger.mocdmi.ru/)

---

## 📋 Описание

Stellar Burger — это полнофункциональное приложение для конструктора бургеров, позволяющее пользователям:

- Собирать уникальные бургеры из различных ингредиентов
- Перетаскивать ингредиенты в конструктор (drag-and-drop)
- Оформлять заказы с подсчётом стоимости
- Просматривать историю заказов
- Регистрироваться и авторизовываться
- Восстанавливать пароль через email

Приложение использует реальное API для работы с заказами и авторизации.

---

## ✨ Основные возможности

| Возможность                 | Описание                                                             |
| --------------------------- | -------------------------------------------------------------------- |
| 🧅 **Конструктор бургеров** | Drag-and-drop интерфейс для сборки бургера из доступных ингредиентов |
| 📦 **Управление заказами**  | Создание заказов, просмотр статуса и истории                         |
| 👤 **Личный кабинет**       | Регистрация, вход, редактирование профиля                            |
| 📜 **Лента заказов**        | Просмотр всех заказов в реальном времени через WebSocket             |
| 📱 **Адаптивный дизайн**    | Корректное отображение на различных устройствах                      |
| 🔐 **JWT авторизация**      | Безопасная аутентификация с refresh-токенами                         |
| 🧪 **Тестирование**         | Unit-тесты (Vitest) и E2E-тесты (Cypress)                            |

---

## 🛠 Техологии

### Frontend

- **React 19** — библиотека для создания пользовательских интерфейсов
- **TypeScript** — типизированный JavaScript
- **Redux Toolkit** — управление состоянием приложения
- **React Router v7** — маршрутизация
- **React DnD** — drag-and-drop функциональность

### Сборка и инструменты

- **Vite** — быстрый сборщик
- **ESLint** — анализ кода
- **Prettier** — форматирование кода
- **Stylelint** — линтинг стилей
- **Husky** — Git-хуки

### Тестирование

- **Vitest** — unit-тестирование
- **React Testing Library** — тестирование React-компонентов
- **Cypress** — end-to-end тестирование

### Дополнительно

- **CSS Modules** — стилизация компонентов
- **WebSocket** — реальное обновление заказов

---

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+
- npm или yarn

### Установка

```bash
# Клонируйте репозиторий
git clone https://github.com/mocdmi/stellar-burger.git
cd stellar-burger

# Установите зависимости
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

### Сборка для production

```bash
npm run build
```

### Предпросмотр production сборки

```bash
npm run preview
```

### Запуск тестов

```bash
# Unit-тесты
npm run test

# Unit-тесты с UI
npm run test:ui

# E2E-тесты
npm run cypress

# E2E-тесты с UI
npm run cypress:open
```

### Проверка качества кода

```bash
# Полная проверка (ESLint + Stylelint + Prettier)
npm run lint

# Только ESLint
npm run eslint

# Только Stylelint
npm run stylelint
```

---

## 📁 Структура проекта

```
react-burger/
├── cypress/       # E2E-тесты
├── public/        # Публичные файлы
├── src/
│   ├── components # Компоненты
│   ├── hooks      # Хуки
│   ├── pages      # Страницы
│   ├── services   # Redux store и API
│   ├── utils      # Утилиты
│   ├── router.tsx
│   └── main.tsx
├── .husky
├── eslint.config.ts
├── prettier.config.js
├── stylelint.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📝 Скрипты

| Команда                | Описание                       |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Запуск dev-сервера             |
| `npm run build`        | Сборка для production          |
| `npm run preview`      | Предпросмотр production сборки |
| `npm run test`         | Запуск unit-тестов             |
| `npm run test:ui`      | Запуск тестов с UI             |
| `npm run cypress`      | Запуск E2E-тестов              |
| `npm run cypress:open` | E2E-тесты с UI                 |
| `npm run lint`         | Полная проверка кода           |
| `npm run eslint`       | Проверка ESLint                |
| `npm run stylelint`    | Проверка Stylelint             |
| `npm run prettier`     | Форматирование Prettier        |
| `npm run commit`       | Создание коммита с проверками  |
| `npm run deploy`       | Деплой на GitHub Pages         |

---

## 🔧 Конфигурация алиасов

В проекте настроены алиасы для удобных импортов:

```typescript
'@'          -> src/
'@components'-> src/components/
'@services'  -> src/services/
'@pages'     -> src/pages/
'@utils'     -> src/utils/
```

---

## 📄 Лицензия

MIT License

---

## 🙏 Благодарности

- [Яндекс.Практикум](https://practicum.yandex.ru/) за отличный курс по React
