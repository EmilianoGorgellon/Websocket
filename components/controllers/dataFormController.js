let Data = require("../service/dataFormService")
let data = new Data("./public/productos.txt");
// let a = require("../../productos.txt");

const sendDataPost = async (req, res) => {
    res.json(await data.sendData(req.body));
}

module.exports = { sendDataPost }