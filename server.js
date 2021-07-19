
const express = require("express")
const cors = require("cors");
require("dotenv").config();


// import routes
const authRoutes = require("./routes/auth")

// app
const app = express();

// middleware
app.use(cors());

app.use("/api", authRoutes)

const port = process.env.PORT;

app.listen(port, () => {
    console.log("Server is live on port", port)
})