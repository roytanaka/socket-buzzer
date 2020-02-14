import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
// import http from 'http';
import socket from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server started on ${PORT}`));

const io = socket(server);

io.on('connection', socket => {
  console.log('Socket connection established', socket.id);
  socket.on('buzzer', payload => {
    io.emit('answer', payload);
  });
  socket.on('reset', payload => {
    io.emit('clearResponder', payload);
  });
});

// Routes
app.get('/', (req, res) => {
  res.send('hello world');
});
