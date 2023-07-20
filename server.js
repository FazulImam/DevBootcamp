const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')
const colors = require("colors")

dotenv.config({ path: "./config/config.env" });

// Routes
const connect = require('./config/db');
const bootcamp = require('./routes/bootcamps');

const app = express();

// Body Parser
app.use(express.json());
// Dev logging middleware
app.use(morgan('tiny'));
// Database Connection
connect();

const port = process.env.PORT || 3000;

// Mount Routers
app.use('/api/v1/bootcamps',bootcamp)

const server = app.listen(port, () => {
  console.log(`the server is running`.cyan.underline.bold);
});

// handle unhandled promise rejection

process.on('unhandledRejection',(err,promise) => {
    console.log(`Error ${err.message}`.red);
    server.close(() => process.exit(1));
})