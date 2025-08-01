const mongoose = require("mongoose");
const connectToDataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected Successsfully !');
    } catch (error) {
        console.log(`ERROR at DB Connect : `, error);
    }
}
module.exports = connectToDataBase;