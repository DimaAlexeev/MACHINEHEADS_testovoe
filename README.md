# Тестовое задание — админ-панель

Админка для REST API http://rest-test.machineheads.ru

## Стек

- React + TypeScript (Vite)
- Redux + Redux-Saga
- react-router-dom v5 + connected-react-router
- Ant Design
- axios, js-cookie

## Запуск

```
npm install --legacy-peer-deps
npm run dev
```

(флаг нужен из-за connected-react-router — он до сих пор не обновил peer dependencies под React 18)

Приложение поднимется на http://localhost:5173

Логин: test@test.ru / khro2ij3n2730 (подставлены в форму по умолчанию)

## Что сделано

- Авторизация, токены хранятся в куках (время жизни куки = время жизни токена)
- Автообновление access-токена по рефреш-токену при 401 (axios-интерсептор)
- Список постов с пагинацией (данные пагинации берутся из заголовков ответа)
- CRUD постов (с загрузкой картинки превью)
- CRUD авторов
- CRUD тегов (в модалке)
- Ошибки валидации с сервера (422) выводятся под полями формы, системные ошибки — в Alert
- Страницы подгружаются через React.lazy
