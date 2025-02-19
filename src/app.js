const bodyParser = require("body-parser");
//const db = require("./config/db")
const cors = require("cors");
//const helmet = require('helmet')
//const mongoSanitize = require("express-mongo-sanitize")
require("dotenv").config()
const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();

const port = 443;	
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

app.get('/', (req, res) => {
    console.log("TESTANDO")	
    return res.json({ message: 'funcionou' });
});


//PROXYS
const HotSpotServiceProxy = httpProxy('http://localhost:' + HOTSPOT_PORT);




app.use('/hotspot', (req, res, next) => HotSpotServiceProxy(req, res, next));

/*
db.on("open", () => {
  console.log("Conectado ao mongo pelo ADMIN SERVICE! ");
});
db.on("error", (err) => {
  console.log(err);
});
*/
app.listen(3000);
/*
server.listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta 443`);
  
  });
  */