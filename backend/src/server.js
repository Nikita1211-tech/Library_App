const express= require("express");
const cors = require('cors');
const Conn = require("./dbconfig");
const port = 3000;
const app = express();
const authRoutes = require("./routes/authRoutes");
app.use(express.json());
app.use(cors());

app.use("/api/users", authRoutes)
// DB connection 
Conn.connect(function(error){
    if(error){
        console.log(`DB not connected ${error}`)
    }
    else{
        // Server connection 
        app.listen(port, (req,res)=>{
            console.log("Server is up and running");
            console.log("DB connected successfully");
        })
    }
})
