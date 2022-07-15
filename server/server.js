const express = require('express')
const app = express()
var cors = require('cors')
const PORT = process.env.PORT || 8080
const db = require('./db/models')

app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use(cors({origin: "http://localhost:3000"}));

app.get('/', (req,res) => {
    res.send("Hello World")
})

db.sequelize.sync();

require("./db/routes/pesertaMupel.route")(app);
require("./db/routes/account.route")(app);
require("./db/routes/data.route")(app);
require("./db/routes/jumlahPeserta.route")(app);
require("./db/routes/pesertaId.route")(app);
require("./db/routes/absen.route")(app);

app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`)
})