const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv=require('dotenv');
const app = express();
// const routes=require('./routes/index');
dotenv.config();

// MongoDB connection URL
const url = process.env.MONGO_DB_URI; // Replace with your MongoDB server URL and database name

// Options for the MongoDB connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose.connect(url, options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });



// Define routes and middleware here
app.use('/',require('./routes'));
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Start the server
const port = process.env.PORT;
console.log(port);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//JiW60wuX0yCJ8HAZ
