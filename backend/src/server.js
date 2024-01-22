const express= require("express");
const cors = require('cors');
const Conn = require("./dbconfig");
const port = 3000;
const app = express();
const env = require('dotenv').config();
const authRoutes = require("./routes/authRoutes");
app.use(express.json());
app.use(cors());

app.use("/api/users", authRoutes)
// DB connection 
// Conn.connect(function(error){
//     if(error){
//         console.log(`DB not connected ${error}`)
//     }
//     else{
        // Server connection 
        app.listen(port, (req,res)=>{
            console.log("Server is up and running");
        })
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'Library',
 'root',
 '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
//     }
// })
