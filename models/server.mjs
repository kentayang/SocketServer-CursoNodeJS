import express from "express";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
import http from "http";
import { socketController } from "../sockets/controller.mjs";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = http.createServer(this.app);
    this.io = new SocketServer(this.server);

    this.paths = {};

    //Middlewares
    this.middlewares();

    //Rutas de mi App
    this.routes();

    //Sockets
    this.sockets();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    //this.app.use(this.paths.users, users_router);
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Escuchando en el puerto ${this.port}`);
    });
  }
}

export default Server;
