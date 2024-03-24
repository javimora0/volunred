const express = require('express');
const fileUpload = require('express-fileupload');

const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.access_path = '/api'
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.access_path, require('../routes/access_routes'))
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}
module.exports = Server;