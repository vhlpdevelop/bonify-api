const bodyParser = require("body-parser");
//const db = require("./config/db")
const cors = require("cors");
//const helmet = require('helmet')
//const mongoSanitize = require("express-mongo-sanitize")
require("dotenv").config()
const app = require("express")();
app.enable('trust proxy')
app.use(bodyParser.json());
app.use(cors());
//app.use(helmet());
//app.use(mongoSanitize())
app.disable('x-powered-by')
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const {
    HOTSPOT_PORT,

} = process.env
const hotspot_port = process.env.HOTSPOT_PORT || 4000;
app.listen(hotspot_port, () => {
  console.log(`HOTSPOT rodando na porta ${hotspot_port}`);
})
/*
db.on("open", () => {
  console.log("Conectado ao mongo pelo ADMIN SERVICE! ");
});
db.on("error", (err) => {
  console.log(err);
});
*/
const hotspot = require('./routes/hotspot.route')

app.use("/", hotspot)