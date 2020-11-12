const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

// middleware

app.use(express.json()); //req.body
app.use(cors());
//app.use(express.static("./client/build"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));

// ROUTES

//register and login ROUTES
app.use("/auth", require("./routes/jwtAuth"));

// dashboard route
app.use("/dashboard", require("./routes/dashboard"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});