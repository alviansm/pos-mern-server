var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var {decodeToken} = require('./middlewares');
var expressHandlebars = require('express-handlebars')
var favicon = require('serve-favicon');

// Routing modules
var productRoute = require('./app/product/router');
var categoryRoute = require('./app/category/router');
var tagRoute = require('./app/tag/router');
var authRoute = require('./app/auth/router');
var deliverAddressRoute = require('./app/deliveryAddress/router');
var cartRoute = require('./app/cart/router');
var orderRoute = require('./app/order/router');
var invoiceRoute = require('./app/invoice/router');

var app = express();

// connect to database
var dbConnect = require('./database/index');
dbConnect;

// view engine setup -> express-handlebars
app.engine('handlebars', expressHandlebars.engine({
        defaultLayout: "main",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// express.js setup
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

// decode token every server receive request
app.use(decodeToken());

// route middleware
app.use('/auth', authRoute);
app.use('/api', productRoute);
app.use('/api', categoryRoute);
app.use('/api', tagRoute);
app.use('/api', deliverAddressRoute);
app.use('/api', cartRoute);
app.use('/api', orderRoute);
app.use('/api', invoiceRoute);

// home
app.use("/", (req, res) => {
  res.render("index", {
    title: "Eduwork Store",
    subtitle: "POS System for the store"
  });
});

app.use('/', (req, res) => {
  res.json({message: "RESTful API for POS System"})
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
