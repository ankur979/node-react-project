
const express = require("express");
const app = express()
const path = require('path')
const port = process.env.PORT || 5000;
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))
app.get(("/"), (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
})

app.use("/dashboard/users", require("./Router/User"))
app.use("/dashboard/product", require("./Router/Product"))


app.listen(port, () => {
    console.log("Server listening on Port", port);
})