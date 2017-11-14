require('dotenv').config()
const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    checkForSession = require('./middlewares/checkForSession'),
    swag = require('./controllers/swag_controller'),
    auth = require('./controllers/auth_controller'),
    cart = require('./controllers/cart_controller'),
    search = require('./controllers/search_controller');

const app = express();
// middleware
app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`))

// endpoints
app.get('/api/swag', swag.read)
app.get('/api/user', auth.getUser)
app.post('/api/login', auth.login)
app.post('/api/register', auth.register)
app.post('/api/signout', auth.signout)
app.post('/api/cart', cart.add)
app.post('/api/cart/checkout', cart.checkout)
app.delete('/api/cart', cart.delete)
app.get('/api/search', search.search)


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})