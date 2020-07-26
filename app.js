const express = require('express');
const logger = require('./middleware/logger');
// Routes:
const csvRoute = require('./routes/csv');

const app = express();
// Middlewares
app.use(express.json());
app.use(logger);

// API Routes
app.use('/csv', csvRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})




