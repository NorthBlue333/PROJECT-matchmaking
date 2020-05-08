"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: true }));
// parse application/json
app.use(body_parser_1.default.json());
app
    .route('/users')
    .all(function (req, res, next) {
    // user middleware for all request
    next();
})
    .get(function (req, res, next) {
    console.log('USERS::GET : ', req.query);
    res.json({
        user: {
            username: 'Nible',
            email: 'test@test.test',
        },
    });
})
    .post(function (req, res, next) {
    console.log('USERS::POST : ', req.body);
    res.json({
        newUser: {
            username: 'test',
            email: 'nible@test.test',
        },
    });
});
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server); // Attach socket.io to our server
const connectedPlayers = [];
io.on('connection', (socket) => {
    console.log(socket);
    // @TODO send user Info when emit intead of socket
});
server.listen(3000, () => {
    console.log('Server started ! Listen on port 3000');
});
module.exports = app;
//# sourceMappingURL=app.js.map