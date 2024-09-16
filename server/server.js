require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require('body-parser');
require('./db/db');  // Ensure your DB connection is initialized

const app = express();
const server = http.createServer(app);  // Create an HTTP server

// WebSocket setup with `socket.io`
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5002', 'http://localhost:5000'],
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

// WebSocket event listeners
io.on('connection', (socket) => {
  console.log('New client connected!');
  socket.send('connection established');
  
  socket.on('message', (data) => {
    console.log(`Distributing message: ${data}`);
    io.emit('message', data); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected!');
  });

  socket.on('error', (err) => {
    console.log('WebSocket error:', err);
  });
});

// Import controllers
const userController = require("./controller/user");
const taskController = require("./controller/tasks");
const AuthController = require('./services/auth');
const TaskController = require("./controller/tasks");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5002', 'http://localhost:5000'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

// Define routes
app.get('/tasks/:userId', AuthController.verify, taskController.getTasks);
app.post('/tasks/:userId', AuthController.verify, taskController.createTask);
app.delete('/tasks/:taskId', taskController.deleteTask);
app.get('/tasks/:taskId', TaskController.getTask);
app.put('/tasks/:taskId', taskController.editTask);

app.post("/register", userController.register);
app.post("/login", AuthController.login);
app.patch('/user/:userId', AuthController.verify, userController.updatePassword);
app.patch('/user-delete-refresh/:userId', userController.deleteRefresh);
app.patch('/user/refresh-token', AuthController.refresh);

app.post('/forgot-password', userController.requestPasswordReset);
app.post('/request-password-reset', userController.requestPasswordReset);
app.post('/reset-password', userController.resetPassword);

// Start the server
const port = process.env.PORT || 3055;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});