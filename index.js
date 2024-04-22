import "dotenv/config";
import express from "express";
import sql from "mssql";
import authRoutes from "./Routes/authRoutes.js";
import { sqlConfig } from "./Config/sqlConfig.js";
const app = express();


app.use(express.json()) // Middleware to Parse Json Payload
app.use('/api/v1/user',authRoutes) // Routes For User Authentication

const port = process.env.PORT || 4000; 

(async () => {
  try {
    sql.connect(sqlConfig); // Connect to database
    app.listen(port, () => {
        console.log(`Server Running in Port ${port}`);
      });
      
  } catch (err) {
    console.error("DB Connect Error :", err.message);
  }
})();

