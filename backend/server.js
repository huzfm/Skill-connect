const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app')
dotenv.config({
      path: './.env'
});

// MongoDB connection
const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
);

mongoose.connect(DB)
      .then(() => {
            console.log('DB connection successful');
      })
      .catch((err) => {
            console.log(err.message);
      });

// Start the server on port 8000
const port = process.env.PORT || 8001;

const server = app.listen(port, () => {
      console.log('Listening from port 8000')
})




