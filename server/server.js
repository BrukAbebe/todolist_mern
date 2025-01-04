const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const taskRoutes= require("./routes/taskRoutes");
const categoryRoutes= require("./routes/categoryRoutes");
const connectdDB = require("./config/db");

dotenv.config();
const PORT = process.env.PORT || 5000;
connectdDB();

const app =express();
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/api/tasks',taskRoutes);
app.use('/api/categories',categoryRoutes);

// app.use((req, res, next) => {
//     res.status(404).json({
//       message: "Resource not found",
//     });
//   });
  
 
app.listen(PORT,()=>
    console.log(`Server running on port ${PORT}`)
);

