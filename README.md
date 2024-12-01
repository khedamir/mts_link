Для запуска выполнить
yarn
yarn dev

## Структура проекта

````plaintext
├── src/                   # Исходный код проекта
│   ├── components/        # Реактовые компоненты
│   ├── context/           # Контекст для управления состоянием
│   ├── services/          # Запросы на сервер
│   ├── utils/             # Утилиты и вспомогательные функции
│   ├── App.tsx            # Главный компонент приложения
│   ├── index.tsx          # Точка входа
├── public/                # Статические ресурсы
├── package.json           # Список зависимостей проекта
├── README.md              # Описание проекта


## Состав команды

Хеда Амирова — Роль: Frontned-разработчик
Ислам Дашуев — Роль: Backend-разработчик
Мохьмад Чабдарханов — Роль: Data Analitic.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
````

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
