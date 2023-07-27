const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')
const colors = require("colors")
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });

// Routes
const connect = require('./config/db');
const errorHandler = require('./middlewares/error');
const bootcamp = require('./routes/bootcamps');
const auth = require('./routes/auth');

const app = express();

// Body Parser
app.use(express.json());
// Dev logging middleware
app.use(morgan('tiny'));

app.use(cookieParser())
// Database Connection
connect();

const port = process.env.PORT || 3000;

// Mount Routers
app.use('/api/v1/bootcamps',bootcamp)
app.use('/api/v1/auth',auth)
app.use(errorHandler)

const server = app.listen(port, () => {
  console.log(`the server is running`.cyan.underline.bold);
});

// handle unhandled promise rejection

process.on('unhandledRejection',(err,promise) => {
    console.log(`Error ${err.message}`.red);
    server.close(() => process.exit(1));
})