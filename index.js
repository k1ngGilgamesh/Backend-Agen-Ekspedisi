require ('dotenv').config();

// import library
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const routes = require('./src/router')

//use library

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/controller', routes)

app.get('/', (req, res) => {
    res.send('Hello World');
} );

app.post('/', (req, res) => {
    res.send('Hello World');
} );

app.listen(process.env.APP_PORT, () => {
    console.log('Server is running on port 4040');
} );