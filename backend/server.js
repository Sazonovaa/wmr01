const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Инициализация Telegram Bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Данные магазина (в реальном проекте - база данных)
const products = [
  {
    id: 1,
    name: 'Веб-сайт Landing Page',
    price: 15000,
    description: 'Современный адаптивный лендинг',
    image: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Landing'
  },
  {
    id: 2,
    name: 'Telegram Bot',
    price: 20000,
    description: 'Бот с базовым функционалом',
    image: 'https://via.placeholder.com/200x200/7B68EE/FFFFFF?text=Bot'
  },
  {
    id: 3,
    name: 'Парсер данных',
    price: 12000,
    description: 'Автоматический сбор данных',
    image: 'https://via.placeholder.com/200x200/50C878/FFFFFF?text=Parser'
  },
  {
    id: 4,
    name: 'CRM система',
    price: 45000,
    description: 'Управление клиентами',
    image: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=CRM'
  },
  {
    id: 5,
    name: 'Интеграция API',
    price: 18000,
    description: 'Подключение сторонних сервисов',
    image: 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=API'
  },
  {
    id: 6,
    name: 'Мобильное приложение',
    price: 60000,
    description: 'iOS/Android приложение',
    image: 'https://via.placeholder.com/200x200/9370DB/FFFFFF?text=Mobile'
  }
];

// API эндпоинты
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/order', async (req, res) => {
  try {
    const { items, userId, totalPrice } = req.body;

    // Формируем сообщение о заказе
    let orderMessage = `🛒 Новый заказ!\n\n`;
    orderMessage += `👤 ID пользователя: ${userId}\n`;
    orderMessage += `💰 Сумма: ${totalPrice.toLocaleString('ru-RU')} ₽\n\n`;
    orderMessage += `📦 Товары:\n`;
    
    items.forEach((item, index) => {
      orderMessage += `${index + 1}. ${item.name} - ${item.price.toLocaleString('ru-RU')} ₽\n`;
    });

    // Отправляем заказ админу (можно указать свой chat_id)
    // В реальном проекте здесь будет логика оплаты
    await bot.sendMessage(userId, orderMessage);

    res.json({ success: true, message: 'Заказ оформлен!' });
  } catch (error) {
    console.error('Ошибка при оформлении заказа:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Telegram Bot команды
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, '👋 Добро пожаловать в наш магазин IT-услуг!\n\nНажмите кнопку ниже, чтобы открыть каталог:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🛍 Открыть магазин', web_app: { url: process.env.WEB_APP_URL } }]
      ]
    }
  });
});

bot.on('web_app_data', async (msg) => {
  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app.data);
  
  if (data.type === 'order') {
    let orderText = `✅ Заказ получен!\n\n📦 Товары:\n`;
    data.items.forEach((item, i) => {
      orderText += `${i + 1}. ${item.name} - ${item.price.toLocaleString('ru-RU')} ₽\n`;
    });
    orderText += `\n💰 Итого: ${data.total.toLocaleString('ru-RU')} ₽`;
    
    await bot.sendMessage(chatId, orderText);
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`🤖 Telegram Bot активен`);
});
