const mongoose = require("mongoose");


const DbConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("DB connected");
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }

}

module.exports = DbConnection;