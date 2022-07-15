const fs = require("fs");

exports.findAll = (req,res) => {
    fs.readFile("../server/db/data/pesertaId.json", "utf-8", (err, jsonString) => {
        if (err) {
            console.log(err);
            res.json(err);
        }
        console.log("TEST");
        res.send(JSON.parse(jsonString));
        // res.send("SUCCESS");
    })
}

exports.write = (req,res) => {
    const jsonString = JSON.stringify(req.body.data);
    fs.writeFile("../server/db/data/pesertaId.json", jsonString, err => {
        if (err) {
            console.log(err);
            res.json(err);
        }
        console.log("TEST");
        res.send("Succesfully write")
    })
}