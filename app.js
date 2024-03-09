const express = require('express')
const adminRoutes = require('./routes/admin')
const bodyParser = require('body-parser')
// const cors = require('cors')
// const helmet = require('helmet')
const mongodbConnect = require('./utils/database').mongodbConnect

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.sendFile('home.html', {root: "views"})
})
app.get('/shop', (req, res)=>{
    res.sendFile('shop.html', {root: "views"})
})
app.get('/products', (req, res)=>{
    res.sendFile('products.html', {root: "views"})
})
app.get('/cart', (req, res)=>{
    res.sendFile('cart.html', {root: "views"})
})
app.get('/orders', (req, res)=>{
    res.sendFile('orders.html', {root: "views"})
})
app.get('/addproduct', (req, res)=>{
    res.sendFile('addproduct.html', {root: "views"})
})
app.get('/adminproducts', (req, res)=>{
    res.sendFile('adminproducts.html', {root: "views"})
})
app.use(adminRoutes)
// require('dotenv').config();
// app.use(cors());
app.use(express.static('public'));

// app.use(helmet());
app.use((req, res, next)=>{
    next();
});

mongodbConnect(()=>{
    app.listen(3000);
});
