# ⚡ Быстрый старт - 5 минут до запуска!

## Шаг 1: Получите токен бота (2 минуты)

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot`
3. Введите имя: `Мой IT Магазин`
4. Введите username: `my_it_shop_bot`
5. **Скопируйте токен** ⬅️ Важно!

---

## Шаг 2: Установка (1 минута)

```bash
npm run install:all
```

---

## Шаг 3: Настройка (1 минута)

### Backend
```bash
cd backend
echo "TELEGRAM_BOT_TOKEN=ваш_токен_здесь" > .env
echo "WEB_APP_URL=http://localhost:5173" >> .env
echo "PORT=3000" >> .env
cd ..
```

### Frontend
```bash
cd frontend
echo "VITE_API_URL=http://localhost:3000" > .env
cd ..
```

---

## Шаг 4: Запуск (30 секунд)

```bash
npm run dev
```

Готово! 🎉
- Backend: http://localhost:3000
- Frontend: http://localhost:5173
- Бот активен

---

## Шаг 5: Тестирование (30 секунд)

### Локальное тестирование через ngrok:

```bash
# В новом терминале
ngrok http 5173
```

Скопируйте HTTPS URL (например: `https://abc123.ngrok.io`)

### Подключите к боту:

1. Откройте [@BotFather](https://t.me/BotFather)
2. `/mybots` → выберите бота → **Menu Button**
3. Вставьте ngrok URL
4. Откройте бота → нажмите кнопку меню

**ИЛИ** используйте inline кнопку:
1. Найдите своего бота в Telegram
2. `/start`
3. Нажмите "🛍 Открыть магазин"

---

## 🎯 Что дальше?

### Кастомизация:
- **Товары**: редактируйте `backend/server.js` → массив `products`
- **Стили**: `frontend/src/App.css`
- **Логика**: `frontend/src/App.jsx`

### Монетизация:
- Прочитайте `MONETIZATION.md` - 10 способов заработка
- `EXAMPLES.md` - 50 идей для бизнеса

### Деплой:
- `DEPLOY.md` - инструкции для продакшена
- Бесплатный хостинг: Vercel + Railway

---

## 📁 Структура проекта

```
telegram-mini-app-shop/
├── backend/           # Node.js сервер
│   ├── server.js     # API + Telegram Bot
│   └── .env          # Конфигурация
├── frontend/          # React приложение
│   ├── src/
│   │   ├── App.jsx   # Главный компонент
│   │   └── App.css   # Стили
│   └── .env          # Конфигурация
└── README.md         # Документация
```

---

## 💡 Быстрые команды

```bash
# Запуск разработки
npm run dev

# Только backend
npm run dev:backend

# Только frontend
npm run dev:frontend

# Сборка для продакшена
npm run build

# Запуск продакшен версии
npm start
```

---

## 🐛 Проблемы?

### Бот не отвечает
✅ Проверьте токен в `backend/.env`
✅ Убедитесь что backend запущен

### Mini App не открывается
✅ URL должен быть HTTPS (используйте ngrok)
✅ Проверьте URL в BotFather

### Товары не загружаются
✅ Проверьте `VITE_API_URL` в `frontend/.env`
✅ Откройте DevTools → Network tab

---

## 📚 Полезные ссылки

- `README.md` - полная документация
- `SETUP_GUIDE.md` - детальная инструкция
- `MONETIZATION.md` - как заработать
- `EXAMPLES.md` - 50 идей для бизнеса
- `DEPLOY.md` - деплой в продакшен

---

## 🚀 Цель: 4,000-5,000 ₽/день

### План на месяц:

**Неделя 1:** Кастомизация под вашу нишу
**Неделя 2:** Первые 3 клиента (по 15,000 ₽)
**Неделя 3:** Масштабирование (5-7 клиентов)
**Неделя 4:** Автоматизация + пассивный доход

**Результат:** 120,000-150,000 ₽/месяц ✅

---

**Успехов! Вопросы? Смотрите документацию 📖**
