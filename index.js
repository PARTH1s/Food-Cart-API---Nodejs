const express = require('express');
const bodyParser = require('body-parser');
const {connect} = require('./src/config/database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3000, async () => {
    await connect();
    console.log("Mongo db connected successfully");
    console.log("Server Started Successsfully");
});