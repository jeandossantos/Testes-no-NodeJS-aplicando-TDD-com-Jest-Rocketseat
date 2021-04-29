const express = require('express');
const router = require('./routes');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(router);
    }
}

module.exports = new AppController().express;