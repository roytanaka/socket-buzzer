"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _socket = _interopRequireDefault(require("socket.io"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server started on ${PORT}`));
const io = (0, _socket.default)(server);
io.on('connection', socket => {
  console.log('Socket connection established', socket.id);
  socket.on('HELLO', msg => {
    console.log(msg);
    socket.broadcast.emit('HELLO', msg);
  });
}); // Routes

app.get('/', (req, res) => {
  res.send('hello world');
});