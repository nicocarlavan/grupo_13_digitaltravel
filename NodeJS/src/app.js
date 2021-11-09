const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');

const path = require('path');
const methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DELETE



const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: "Secreto!",
    resave: false,
    saveUninitialized: false
}));

app.use(cookies());

app.use(userLoggedMiddleware);


const publicPath = path.resolve(__dirname, './public');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//Rutas
const rutasProductos = require("./routes/products");
const rutasUsuarios = require("./routes/users");
const rutasHome = require("./routes/home");


//Rutas APIs
const rutasUsuariosApi = require('./routes/api/usersApiRouter');
const rutasProductosApi = require('./routes/api/productsApiRouter');



app.use("/products", rutasProductos);
app.use("/", rutasUsuarios);
app.use("/", rutasHome);


app.use('/api/users', rutasUsuariosApi);
app.use('/api/products', rutasProductosApi);


app.use(express.static(publicPath));



app.set("view engine", "ejs");
app.use(express.static('public'));
app.set("views", "./src/views");


app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000')
});