const express = require("express");
const app = express();
const { ExpressPeerServer } = require("peer");

//muc dich: nham de cho soketio nhan cac even tu http co the tham khao tu nodejs.
const server = require("http").createServer(app);
const PeerServer = ExpressPeerServer(server);
const io = require("socket.io")(server);
//set view engine and local tempalte
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/peer", PeerServer);
app.use(express.static("public"));

io.on("connection", (socket) => {
  PeerServer.on("connection", (client) => {
    socket.broadcast.emit("user", client.id);
  });
});
app.get("/", (req, res) => {
  res.render("rom", { user: "123" });
});
server.listen(3030);
