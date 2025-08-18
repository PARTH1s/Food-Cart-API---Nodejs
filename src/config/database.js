const mongoose = require('mongoose');

const connect = () => {
    console.log("Mongodb connection requested");
    return mongoose.connect('mongodb://localhost/food_cart_api');
}

module.exports = {
    connect
}