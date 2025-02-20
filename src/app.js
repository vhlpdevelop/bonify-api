const bodyParser = require("body-parser");
//const db = require("./config/db")
const cors = require("cors");
//const helmet = require('helmet')
//const mongoSanitize = require("express-mongo-sanitize")
require("dotenv").config()
const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();

//const port = 443;	
app.use(bodyParser.json());
app.use(cors());
//app.use(helmet());
//app.use(mongoSanitize())
app.disable('x-powered-by')
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


//ENV

const {
    HOTSPOT_PORT,
    PORT
} = process.env

//IO SOCKET
/*
var server = require("https").createServer(httpsOptions, app);
const io = require("socket.io")(server, {
  cors: {
    origins: []
  },
});
*/

//PROXYS
const hotspot_port = process.env.HOTSPOT_PORT || 3001;
const HotSpotServiceProxy = httpProxy("0.0.0.0:" + hotspot_port);




app.use('/hotspot', (req, res, next) => HotSpotServiceProxy(req, res, next));

/*
db.on("open", () => {
  console.log("Conectado ao mongo pelo ADMIN SERVICE! ");
});
db.on("error", (err) => {
  console.log(err);
});
*/

const port = process.env.PORT || 3000;

app.listen(3000, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta 3000`);

});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
/*
server.listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta 443`);
  
  });
  */