# 🛍 Telegram Mini App - IT Магазин

Полнофункциональный пример Telegram Mini App с каталогом товаров, корзиной и интеграцией с Telegram Bot API.

## 📋 Что внутри?

- **Frontend**: React + Vite + Telegram Web App SDK
- **Backend**: Node.js + Express + Telegram Bot API
- **Функционал**: Каталог товаров, корзина, оформление заказов

## 🚀 Быстрый старт

### 1. Создайте Telegram бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям и получите **токен бота**
4. Сохраните токен - он понадобится для настройки

### 2. Установка зависимостей

```bash
# Установить все зависимости (корень + backend + frontend)
npm run install:all
```

Или отдельно:
```bash
# Корневой проект
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Настройка окружения

Создайте файл `backend/.env` (скопируйте из `.env.example`):

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
WEB_APP_URL=https://your-domain.com
PORT=3000
```

Создайте файл `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Запуск в режиме разработки

```bash
# Запустить backend и frontend одновременно
npm run dev
```

Или отдельно:
```bash
# Backend (порт 3000)
npm run dev:backend

# Frontend (порт 5173)
npm run dev:frontend
```

## 🌐 Деплой

### Вариант 1: Vercel (для frontend)

```bash
cd frontend
npm run build
# Задеплойте папку dist на Vercel
```

### Вариант 2: Railway/Render (для backend)

1. Подключите GitHub репозиторий
2. Укажите папку `backend` как Root Directory
3. Добавьте переменные окружения (TELEGRAM_BOT_TOKEN)
4. Деплой произойдет автоматически

### Вариант 3: VPS (полный стек)

```bash
# Клонируйте репозиторий
git clone your-repo-url
cd telegram-mini-app-shop

# Установите зависимости
npm run install:all

# Соберите frontend
cd frontend
npm run build
cd ..

# Настройте nginx для раздачи статики
# Запустите backend с PM2
pm2 start backend/server.js --name telegram-mini-app
```

## 📱 Подключение Mini App к боту

После деплоя frontend:

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/mybots`
3. Выберите вашего бота
4. Нажмите **Menu Button**
5. Введите URL вашего задеплоенного frontend
6. Готово! Теперь кнопка меню открывает ваше приложение

Альтернативно, используйте inline кнопки (уже реализовано в коде):
```javascript
{
  reply_markup: {
    inline_keyboard: [
      [{ text: '🛍 Открыть магазин', web_app: { url: 'your-url' } }]
    ]
  }
}
```

## 🔧 Структура проекта

```
telegram-mini-app-shop/
├── backend/
│   ├── server.js          # Express сервер + Telegram Bot
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Главный компонент
│   │   ├── App.css        # Стили
│   │   ├── main.jsx       # Entry point
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json           # Корневой package.json
└── README.md
```

## 💡 Возможности для монетизации

1. **Комиссия за заказы** - берите % с каждой сделки
2. **Подписка** - премиум функции за ежемесячную плату
3. **Telegram Stars** - встроенные платежи Telegram
4. **Криптовалюта** - интеграция TON, USDT
5. **Реклама** - показ баннеров в каталоге

## 🎨 Кастомизация

### Изменить товары
Отредактируйте массив `products` в `backend/server.js`:

```javascript
const products = [
  {
    id: 1,
    name: 'Ваш товар',
    price: 10000,
    description: 'Описание',
    image: 'https://your-image-url.com'
  }
]
```

### Изменить стили
Все стили в `frontend/src/App.css`. Используются CSS-переменные Telegram для автоматической темизации.

### Добавить оплату
Интегрируйте Telegram Payments или Stripe в `backend/server.js`:

```javascript
app.post('/api/order', async (req, res) => {
  // Добавьте логику оплаты
})
```

## 📊 База данных (опционально)

Для реального проекта добавьте БД:

```bash
npm install mongoose  # MongoDB
# или
npm install pg        # PostgreSQL
```

## 🔐 Безопасность

1. **Валидация данных** - проверяйте данные от клиента
2. **HTTPS** - обязательно для Mini Apps
3. **initData проверка** - валидируйте запросы от Telegram

```javascript
// Пример проверки initData
const crypto = require('crypto');

function validateInitData(initData, botToken) {
  // Реализуйте проверку подписи
}
```

## 📖 Полезные ссылки

- [Telegram Mini Apps Документация](https://core.telegram.org/bots/webapps)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [@twa-dev/sdk](https://github.com/twa-dev/sdk)
- [Примеры Mini Apps](https://core.telegram.org/bots/webapps#examples)

## 🎯 Примеры реальных проектов на Mini Apps

- Магазины (e-commerce)
- Сервисы бронирования
- Игры
- CRM системы
- Каталоги услуг
- Калькуляторы
- Трекеры (финансы, здоровье)

## 💰 Монетизация: Расчет дохода

При цене 15,000-60,000 ₽ за услугу:
- **5-7 заказов в месяц** = 75,000-420,000 ₽
- **При комиссии 20%** = 15,000-84,000 ₽/месяц
- **Цель 4,000-5,000 ₽/день** = 120,000-150,000 ₽/месяц

## 🆘 Поддержка

Если возникли вопросы:
1. Проверьте логи (`console.log` в коде)
2. Убедитесь, что все env переменные настроены
3. Проверьте, что бот запущен
4. HTTPS обязателен для работы Mini Apps

## 📝 TODO для улучшения

- [ ] Добавить БД (MongoDB/PostgreSQL)
- [ ] Реализовать платежи (Telegram Stars/Stripe)
- [ ] Админ-панель для управления товарами
- [ ] Уведомления о заказах
- [ ] История заказов пользователя
- [ ] Поиск и фильтры товаров
- [ ] Отзывы и рейтинги

---

**Удачи с вашим Telegram Mini App! 🚀**
