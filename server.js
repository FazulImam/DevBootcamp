const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')

// Routes
const bootcamp = require('./routes/bootcamps');

const app = express();
dotenv.config({ path: "./config/config.env" });

// Dev logging middleware
app.use(morgan('tiny'));

const port = process.env.PORT || 3000;

// Mount Routers
app.use('/api/v1/bootcamps',bootcamp)

app.listen(port, () => {
  console.log(`the server is running`);
});
