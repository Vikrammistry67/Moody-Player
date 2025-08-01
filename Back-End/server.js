require("dotenv").config();
const app = require("./src/app.js");
const PORT = 3000;
const connectToDataBase = require("./src/DataBase/DB.js");
connectToDataBase();
app.listen(PORT, () => console.log(`Server Running at PORT : ${PORT}`))