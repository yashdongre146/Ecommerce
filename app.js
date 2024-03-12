const express = require('express')
const adminRoutes = require('./routes/admin')
const bodyParser = require('body-parser');

const mongodbConnect = require('./utils/database').mongodbConnect
// const cors = require('cors')
// const helmet = require('helmet')

const app = express();
app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.sendFile('signup.html', {root: 'views'});
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', {root:'views'});
});

app.get('/shop', (req, res)=>{
    res.sendFile('shop.html', {root: "views"})
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
app.get('/editProduct/:productId', (req, res)=>{
    res.sendFile('editproduct.html', {root: "views"})
})
app.use(adminRoutes)
// app.use(cors());
app.use(express.static('public'));

// app.use(helmet());
// app.use(async (req, res, next)=>{
//     const user = await User.findUserById("65eda7998e72d72df8467705")
//     req.user = user;
//     console.log(user);
//     next();
// });

mongodbConnect(()=>{
    app.listen(3000);
});
