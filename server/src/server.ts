import App from "./app";
const PORT = process.env.PORT || 3000;

App.app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));



App.io.on('connection', (socket) => {
  console.log(socket)
  // @TODO send user Info when emit intead of socket
})