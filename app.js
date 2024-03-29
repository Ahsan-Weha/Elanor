const path = require('path');
const express = require('express');

const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const notFoundMiddleware = require('./middlewares/not-found');
const cartMiddleware = require('./middlewares/cart');


const baseRoutes = require('./routes/base-routes');
const authRoutes = require('./routes/auth-routes');
const adminRoutes = require('./routes/admin-routes');
const productRoutes = require('./routes/product-route');
const cartRoutes = require('./routes/cart-routes');
const orderRoutes = require('./routes/order-routes');



const expressSession = require('express-session');
const createSessionConfig = require('./config/session');
const db = require('./data/database');


const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));


app.use(cartMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(authRoutes);
app.use(baseRoutes);
app.use(productRoutes);
app.use('/cart', cartRoutes); 
app.use( orderRoutes);
app.use('/admin', protectRoutesMiddleware, adminRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.connectToDatabase()
    .then(function () {
        app.listen(3000);
    })
    .catch(function (error) {
        console.log('Failed To Connect To Database!');
        console.log(error);
    });
