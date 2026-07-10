require("dotenv").config();

const express=require("express");

const connectDB = require("./config/db");

// Connect MongoDB
connectDB();

const app=express();

app.use(express.json());

app.use("/api/auth",

require("./routes/authRoutes"));

app.use("/api/employees",

require("./routes/employeeRoutes"));

app.use("/api/tasks",

require("./routes/taskRoutes"));

app.listen(process.env.PORT,()=>{

console.log("Server Running on Port",process.env.PORT);

});
