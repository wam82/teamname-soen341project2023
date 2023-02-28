const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.json({message: "Test" })
})

app.listen(5000, () => {console.log("Console started on port 5000")})