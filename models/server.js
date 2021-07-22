/** SERVIDOR DE EXPRESS ***/
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path  = require('path');
const cors = require('cors');
const Sockets  = require('./sockets');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        /** HTTP SERVER¨**/
        this.server = http.createServer(this.app);

        /** CONFIG SOCKET **/
        this.io = socketio(this.server, {  /*config */});
    }

    /**DESPLEGAR EL DIRECTPORIO PUBLICO ***/
    middlewares() {
        this.app.use(express.static(path.resolve(__dirname ,'../public')));
        /**CORS **/
        this.app.use(cors());
    }


    configurarSockets(){
        new Sockets(this.io);
    }

    /** INIT EL SERVER **/
    execute() {

        this.middlewares();

        this.configurarSockets();

        this.server.listen(this.port, () => {
            console.log(`Server corriendo en puerto ${this.port}`);
        });
    }

}


module.exports = Server;