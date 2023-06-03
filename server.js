const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Обработка событий от клиентов
io.on('connection', (socket) => {
  console.log('Установлено новое соединение с клиентом');

  // Обработка событий от клиента
  socket.on('sessionCount', (count) => {
    console.log('Получено событие sessionCount:', count);

    // Логика обработки события и отправка обновленного значения счетчика
    const updatedCount = count + 1;
    socket.emit('sessionCountUpdated', updatedCount);
  });

  // Обработка отключения клиента
  socket.on('disconnect', () => {
    console.log('Соединение с клиентом закрыто');
  });
});

// Запуск сервера
const port = 4000;
server.listen(port, () => {
  console.log(`Сервер Socket.IO запущен на порту ${port}`);
});

// Настройка прокси-сервера для обхода CORS
app.use(
    '/api', // Задайте путь, для которого будет использоваться прокси
    createProxyMiddleware({
      target: 'http://localhost:4000', // Задайте URL вашего сервера, к которому нужно обратиться
      changeOrigin: true,
    })
);

// Добавьте middleware для обработки заголовков CORS
app.use(cors());

// Задайте правильный путь к вашей точке входа
const publicPath = path.join(__dirname, 'dzencode_test_react', 'public');
app.use(express.static(publicPath));
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
