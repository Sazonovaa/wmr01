# 🚀 Пошаговая инструкция по запуску Telegram Mini App

## Шаг 1: Создание Telegram бота

1. Откройте Telegram
2. Найдите [@BotFather](https://t.me/BotFather)
3. Отправьте команду `/newbot`
4. Введите название бота (например: "Мой IT Магазин")
5. Введите username бота (например: "my_it_shop_bot")
6. **Скопируйте токен** (выглядит так: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

## Шаг 2: Установка проекта

```bash
# 1. Перейдите в директорию проекта
cd /workspace

# 2. Установите все зависимости
npm run install:all
```

## Шаг 3: Настройка Backend

```bash
# 1. Создайте файл .env в папке backend
cd backend
cp .env.example .env

# 2. Откройте .env и вставьте ваш токен бота
nano .env
```

В файле `backend/.env` укажите:
```
TELEGRAM_BOT_TOKEN=ваш_токен_от_BotFather
WEB_APP_URL=https://ваш-домен.com  # пока оставьте localhost
PORT=3000
```

## Шаг 4: Настройка Frontend

```bash
# 1. Создайте файл .env в папке frontend
cd ../frontend
cp .env.example .env

# 2. Откройте .env
nano .env
```

В файле `frontend/.env` укажите:
```
VITE_API_URL=http://localhost:3000
```

## Шаг 5: Запуск в режиме разработки

```bash
# Вернитесь в корень проекта
cd ..

# Запустите оба сервера
npm run dev
```

Вы увидите:
- ✅ Backend запущен на http://localhost:3000
- ✅ Frontend запущен на http://localhost:5173
- ✅ Telegram Bot активен

## Шаг 6: Тестирование локально (ngrok)

Для тестирования Mini App нужен HTTPS. Используйте ngrok:

```bash
# 1. Установите ngrok (если нет)
# Скачайте с https://ngrok.com/download

# 2. Запустите ngrok для frontend
ngrok http 5173
```

Скопируйте HTTPS URL (например: `https://abc123.ngrok.io`)

## Шаг 7: Подключение Mini App к боту

### Вариант A: Через кнопку меню

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/mybots`
3. Выберите вашего бота
4. Нажмите **"Menu Button"** → **"Edit menu button URL"**
5. Вставьте ваш ngrok URL
6. Готово! Теперь откройте бота и нажмите кнопку меню (≡)

### Вариант B: Через inline кнопку (уже настроено)

1. Откройте вашего бота в Telegram
2. Отправьте `/start`
3. Нажмите кнопку "🛍 Открыть магазин"

**Важно**: Обновите `WEB_APP_URL` в `backend/.env` на ваш ngrok URL

## Шаг 8: Деплой в продакшен

### Frontend (Vercel - бесплатно)

```bash
cd frontend
npm run build

# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel --prod
```

Получите URL (например: `https://your-app.vercel.app`)

### Backend (Railway - бесплатно)

1. Зарегистрируйтесь на [Railway.app](https://railway.app)
2. Создайте новый проект → Deploy from GitHub
3. Выберите репозиторий
4. Настройки:
   - **Root Directory**: `backend`
   - **Build Command**: (пусто)
   - **Start Command**: `node server.js`
5. Добавьте переменные окружения:
   - `TELEGRAM_BOT_TOKEN`: ваш токен
   - `WEB_APP_URL`: https://your-app.vercel.app
   - `PORT`: 3000
6. Deploy!

### Обновите конфигурацию

1. В `frontend/.env` измените:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```

2. Пересоберите frontend:
   ```bash
   npm run build
   vercel --prod
   ```

3. Обновите URL в BotFather (Menu Button) на финальный Vercel URL

## Шаг 9: Проверка работоспособности

✅ Checklist:
- [ ] Backend отвечает на `/api/products`
- [ ] Frontend открывается по HTTPS
- [ ] Бот отвечает на `/start`
- [ ] Mini App открывается из бота
- [ ] Товары отображаются в каталоге
- [ ] Добавление в корзину работает
- [ ] Кнопка "Заказать" внизу появляется
- [ ] Заказ отправляется в бот

## 🐛 Решение проблем

### Mini App не открывается
- Проверьте, что URL начинается с `https://`
- Проверьте консоль браузера (F12)
- Убедитесь, что URL доступен

### Бот не отвечает
- Проверьте токен в `.env`
- Убедитесь, что backend запущен
- Проверьте логи сервера

### Товары не загружаются
- Проверьте `VITE_API_URL` в frontend
- Откройте Network tab в DevTools
- Проверьте CORS настройки

### MainButton не появляется
- Проверьте консоль на ошибки
- Убедитесь, что Telegram SDK загружен
- Добавьте `console.log` в код

## 💡 Полезные команды

```bash
# Просмотр логов backend
cd backend && npm run dev

# Пересборка frontend
cd frontend && npm run build

# Проверка портов
lsof -i :3000
lsof -i :5173

# Очистка кэша
rm -rf node_modules package-lock.json
npm install
```

## 📞 Что дальше?

1. **Добавьте базу данных** (MongoDB/PostgreSQL)
2. **Настройте платежи** (Telegram Stars)
3. **Создайте админ-панель** для управления товарами
4. **Добавьте аналитику** (Google Analytics)
5. **Настройте уведомления** для админа

---

**Готово! Ваш Telegram Mini App работает! 🎉**

Если что-то не работает - проверьте логи и консоль браузера.
