const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.resolve(__dirname, './public');

const rutasProductos = require ("./routes/products");
const rutasUsuarios = require ("./routes/users");
const rutasHome = require ("./routes/home");

app.use("/", rutasProductos);
app.use("/", rutasUsuarios);
app.use("/", rutasHome);


app.use(express.static(publicPath));



app.set("view engine","ejs");
app.use(express.static('public'));
app.set("views","./src/views");


app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000')
});