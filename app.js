// Load environment variables from .env file into process.env
require('dotenv').config();

// Core Node/Express dependencies
var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Route handlers for server-side and API routing
var indexRouter = require('./app_server/routes/index');
var travlrRouter = require('./app_server/routes/Travlr');
var apiRouter = require('./app_api/routes/index');

// Connect to MongoDB via Mongoose
require('./app_api/models/db').connect();

// Wire in Passport for authentication and load our local strategy config
var passport = require('passport');
require('./app_api/config/passport');

// Initialize Express application
var app = express();

// Enable CORS for Angular SPA running on port 4200
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// View engine setup using Handlebars (HBS)
app.set('views', path.join(__dirname, 'app_server/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/app_server/views/partials');

// Standard Express middleware
app.use(logger('dev'));
app.use(express.json());

// Additional CORS headers middleware to ensure all responses
// include the necessary headers for cross-origin requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport authentication middleware
app.use(passport.initialize());

// Mount routers
app.use('/', indexRouter);          // Server-side customer facing routes
app.use('/travel', travlrRouter);   // Travel pages routes
app.use('/api', apiRouter);         // REST API routes

// Catch 404 errors and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// General error handler - renders error page
app.use(function (err, req, res, next) {
    // Only provide error details in development mode
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// Handle JWT UnauthorizedError - returns 401 instead of 500
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res
            .status(401)
            .json({ "message": err.name + ": " + err.message });
    }
});

module.exports = app;