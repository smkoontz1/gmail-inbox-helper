"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var port = 3002;
var whitelist = ['http://localhost:3000'];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin 
        if (!origin)
            return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
            var message = 'The CORS policy for this origin doesn\'t ' +
                'allow access from the particular origin.';
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.listen(port, function () {
    console.log("Express server listening at http://localhost:" + port);
});
