import express from "express";
import { Client } from "pg";


const app = express();
app.use(express.json());

// const pgClient = new Client("postgresql://neondb_owner:npg_dC2E3KYWlbwa@ep-little-silence-a8q4pdy5-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
const pgClient2 = new Client({
    user:"neondb_owner",
    password
    :"npg_dC2E3KYWlbwa",
    port:5432,
    host:"ep-little-silence-a8q4pdy5-pooler.eastus2.azure.neon.tech",
    database:"neondb",
    ssl:true,
})
pgClient2.connect();
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try {
    const  sqlQuery = `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;
    const response = await pgClient2.query(sqlQuery);
    res.json({
        message : "you have signed up"
    })
} catch (error) {
    res.json({
        message : "error user already exists"
    })}
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})