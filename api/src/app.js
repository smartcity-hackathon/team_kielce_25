import { env, mongo, port, ip, apiRoot } from "./config";
import mongoose from "./services/mongoose";
import dziurawdrodze from "./services/dziurawdrodze";

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

dziurawdrodze.start(io);

http.listen(2137, () => {
  console.log("listening on *:2137");
});

console.log(mongo.uri);

mongoose.connect(mongo.uri);
mongoose.Promise = Promise;

export default http;
