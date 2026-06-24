const express = require('express');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const logger = require('./middleware/logger');

require('dotenv').config();

// Routes:
const csvRoute = require('./routes/csv');
const homeRoute = require('./routes/home');
const healthRoute = require('./routes/health');

const app = express();
// Security & parsing middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(compression());
app.use(express.json());
app.use(logger);

// Template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// API Routes
app.use('/', homeRoute);
app.use('/csv', csvRoute);
app.use('/health', healthRoute);

if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;




