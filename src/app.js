import express from "express";
import mongoose, { mongo } from "mongoose";
import routes from "./routes";

class App {
  constructor() {
    this.server = express();
    this.database();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
  }

  database() {
    mongoose.connect(
      "mongodb+srv://eriksonsouza:Erik1994@cluster0.pisiubs.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
