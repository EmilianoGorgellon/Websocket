let express = require("express");
let router = express.Router();
const productos = require("../index");

router.get('/', (req, res, next) => {
    res.render("form", { formularioTitle:"Formulario", productos });
})
router.post('/', (req, res, next) => {
    productos.productos.push(req.body)
    res.render("form", {formularioTitle:"Formulario", productos })
})

module.exports = router;