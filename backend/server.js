const express = require("express");
const errorHandler = require("./midlleware/errHandler");
const ConnectDb = require("./config/db")
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors")
const colors = require("colors")

ConnectDb();
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use("/api/notes", require("./routes/NoteRoutes"))
app.use("/api/users", require("./routes/UserRoutes"))

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running at port ${port}`) )