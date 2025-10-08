# 🚀 Инструкция по деплою Telegram Mini App

## Быстрый деплой (бесплатно)

### Вариант 1: Vercel (Frontend) + Railway (Backend) ⭐ Рекомендуется

#### Frontend на Vercel

1. **Установите Vercel CLI**
```bash
npm i -g vercel
```

2. **Подготовьте frontend**
```bash
cd frontend
npm run build
```

3. **Деплой**
```bash
vercel --prod
```

4. **Настройте environment variables** (в Vercel Dashboard):
   - `VITE_API_URL` = https://your-backend.railway.app

5. **Получите URL**: `https://your-app.vercel.app`

#### Backend на Railway

1. Зарегистрируйтесь на [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Выберите ваш репозиторий
4. Settings:
   - **Root Directory**: `backend`
   - **Start Command**: `node server.js`
5. Variables (Add):
   ```
   TELEGRAM_BOT_TOKEN=your_token
   WEB_APP_URL=https://your-app.vercel.app
   PORT=3000
   ```
6. Deploy!

---

### Вариант 2: Netlify (Frontend) + Render (Backend)

#### Frontend на Netlify

```bash
cd frontend
npm run build

# Установите Netlify CLI
npm i -g netlify-cli

# Деплой
netlify deploy --prod --dir=dist
```

#### Backend на Render

1. [render.com](https://render.com) → New Web Service
2. Connect Repository
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Environment Variables:
   ```
   TELEGRAM_BOT_TOKEN=...
   WEB_APP_URL=https://your-app.netlify.app
   ```

---

### Вариант 3: GitHub Pages (Frontend) + Heroku (Backend)

#### Frontend на GitHub Pages

```bash
cd frontend

# Добавьте в package.json
"homepage": "https://yourusername.github.io/repo-name"

# Установите gh-pages
npm install --save-dev gh-pages

# Добавьте в scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Деплой
npm run deploy
```

#### Backend на Heroku

```bash
# Установите Heroku CLI
# brew install heroku/brew/heroku  # macOS
# или скачайте с heroku.com

cd backend
heroku login
heroku create your-app-name

# Настройте env
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set WEB_APP_URL=https://yourusername.github.io/repo-name

# Деплой
git push heroku main
```

---

### Вариант 4: Полный стек на одном VPS

#### Подходит для: DigitalOcean, Linode, Hetzner, Timeweb

```bash
# 1. Подключитесь к серверу
ssh root@your-server-ip

# 2. Установите Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# 3. Установите Nginx
apt-get install nginx

# 4. Клонируйте проект
git clone https://github.com/yourusername/telegram-mini-app.git
cd telegram-mini-app

# 5. Установите зависимости
npm run install:all

# 6. Создайте .env файлы
nano backend/.env
nano frontend/.env

# 7. Соберите frontend
cd frontend
npm run build
cd ..

# 8. Настройте Nginx
nano /etc/nginx/sites-available/miniapp
```

**Конфигурация Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /root/telegram-mini-app/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Активируйте конфиг
ln -s /etc/nginx/sites-available/miniapp /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Установите SSL (Let's Encrypt)
apt-get install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com

# Запустите backend с PM2
npm install -g pm2
cd backend
pm2 start server.js --name telegram-miniapp
pm2 startup
pm2 save
```

---

## 🔐 SSL сертификат (обязательно!)

Telegram Mini Apps требуют HTTPS. Варианты:

### 1. Cloudflare (бесплатно)
- Зарегистрируйтесь на cloudflare.com
- Добавьте домен
- Измените NS записи
- Включите SSL/TLS (Full)

### 2. Let's Encrypt (бесплатно)
```bash
certbot --nginx -d your-domain.com
```

### 3. Хостинг провайдер
- Vercel/Netlify - SSL автоматически
- Railway/Render - SSL из коробки

---

## 📊 Настройка домена

### Если у вас есть домен:

**Для Vercel/Netlify:**
1. Domains → Add Domain
2. Настройте DNS:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

**Для Railway/Render:**
1. Settings → Custom Domain
2. Добавьте CNAME:
   ```
   api.yourdomain.com → your-app.railway.app
   ```

### Если нет домена:

**Бесплатные варианты:**
- Freenom (.tk, .ml, .ga)
- Cloudflare Pages (yourapp.pages.dev)
- GitHub Pages (username.github.io)

**Платные ($1-3/год):**
- Namecheap
- Porkbun
- Cloudflare Registrar

---

## 🔄 CI/CD Автодеплой

### GitHub Actions (автоматический деплой)

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd frontend && npm install && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
```

---

## 🧪 Проверка после деплоя

### Checklist:
- [ ] Frontend открывается по HTTPS
- [ ] Backend отвечает на `/api/products`
- [ ] Бот получает `/start` команду
- [ ] Mini App открывается из бота
- [ ] Товары загружаются
- [ ] Корзина работает
- [ ] Заказ отправляется в бот
- [ ] SSL сертификат валиден

### Тестирование:

```bash
# Проверка backend
curl https://your-backend.com/api/products

# Проверка frontend
curl -I https://your-frontend.com

# Проверка SSL
curl -vI https://your-frontend.com 2>&1 | grep SSL
```

---

## 📈 Мониторинг

### Логи (PM2):
```bash
pm2 logs telegram-miniapp
pm2 monit
```

### Uptime мониторинг (бесплатно):
- [UptimeRobot](https://uptimerobot.com)
- [Freshping](https://www.freshworks.com/website-monitoring/)
- [Pingdom](https://www.pingdom.com)

### Аналитика:
```html
<!-- В index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

## 🐛 Решение проблем

### 1. Mini App не открывается
**Проблема:** URL не HTTPS
**Решение:** Настройте SSL

### 2. Bot не отвечает
**Проблема:** Backend не запущен или неверный токен
**Решение:** Проверьте `pm2 logs` и `.env`

### 3. CORS ошибка
**Проблема:** Frontend и Backend на разных доменах
**Решение:** Добавьте в `server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend.com'
}));
```

### 4. 502 Bad Gateway
**Проблема:** Backend не запущен
**Решение:** `pm2 restart telegram-miniapp`

---

## 💰 Стоимость хостинга

| Сервис | Frontend | Backend | Итого/мес |
|--------|----------|---------|-----------|
| Vercel + Railway | Free | Free | **$0** |
| Netlify + Render | Free | Free | **$0** |
| VPS (Hetzner) | - | - | **€4** (~400₽) |
| DigitalOcean | - | - | **$6** (~600₽) |

**Рекомендация:** Начните с бесплатных tier, масштабируйтесь по необходимости.

---

## 🔄 Обновление после деплоя

```bash
# 1. Внесите изменения в код
# 2. Коммит
git add .
git commit -m "Update features"
git push origin main

# 3a. Если используете CI/CD - автоматически задеплоится

# 3b. Если вручную:
# Vercel
cd frontend && vercel --prod

# Railway
# Автоматически при push в GitHub

# VPS
ssh root@your-server
cd telegram-mini-app
git pull
cd frontend && npm run build
pm2 restart telegram-miniapp
```

---

## ✅ Финальные шаги

1. **Обновите URL в BotFather:**
   - `/mybots` → выберите бота → Menu Button
   - Вставьте финальный URL

2. **Обновите `WEB_APP_URL` в backend/.env**

3. **Протестируйте полный флоу**

4. **Настройте мониторинг**

5. **Начинайте привлекать пользователей!**

---

**Готово! Ваш Mini App в продакшене! 🎉**
