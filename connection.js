const mongoose = require("mongoose");

async function connectToMonagoDB(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectToMonagoDB,
};