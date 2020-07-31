const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');

// Routes:
const csvRoute = require('./routes/csv');
const homeRoute = require('./routes/home');

const app = express();
// Middlewares
app.use(express.json());
app.use(logger);

// Template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// API Routes
app.use('/', homeRoute);
app.use('/csv', csvRoute);

// Initializing server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})




