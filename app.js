const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000')
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'))
})

app.post('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'))
})

app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'))
})

app.get('/cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/cart.html'))
})

app.post('/cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/cart.html'))
})

//app.set("view engine","ejs");
//app.use(express.static('public'));