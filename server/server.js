const express = require('express')
const app = express()
var cors = require('cors')
const PORT = 8080
const db = require('./db/models')
const session = require('express-session')
const jwt = require('jsonwebtoken')

app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: true}))

const accessTokenSecret = "youraccesstokensecret";

app.get('/', (req,res) => {
    res.send("Hello World")
})

db.sequelize.sync();

require("./db/routes/pesertaMupel.route")(app);
require("./db/routes/account.route")(app);
require("./db/routes/data.route")(app);
require("./db/routes/jumlahPeserta.route")(app);

app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`)
})