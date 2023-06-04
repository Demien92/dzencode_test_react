const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Обробка подій від клієнтів
io.on('connection', (socket) => {
  console.log('Установлено нове з’єднання з клієнтом');

  // Обробка подій від клієнта
  socket.on('sessionCount', (count) => {
    console.log('Получено подію sessionCount:', count);

    // Логіка обробки події та відправлення оновленого значення лічильника
    const updatedCount = count + 1;
    io.emit('sessionCountUpdated', updatedCount);
  });

  // Обробка відключення клієнта
  socket.on('disconnect', () => {
    console.log('З’єднання з клієнтом закрите');
  });
});

// Налаштування проксі-сервера для обходу CORS
app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
);

// Додавання middleware для обробки заголовків CORS
app.use(cors());

// Встановлення шляху до папки зі статичними файлами React
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// Маршрут для відправки статичного файлу index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Запуск сервера
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Сервер Socket.IO запущено на порту ${port}`);
});
