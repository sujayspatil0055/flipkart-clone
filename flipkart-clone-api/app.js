const result = require('dotenv').config();
const express = require('express');
const app = express();

const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

// enable cross origin request for browsers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
    next();
});

// const bodyParser = require('body-parser');

/* Routes */
const userRoutes = require('./routes/userRoutes');

// convert every request to json string/object
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);
  
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

app.use(userRoutes);
// console.log(process.env.PORT);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

// module.exports = server;