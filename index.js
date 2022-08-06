require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
// const tasks = require("./controllers/todoController");
const mongoose = require('mongoose');
// const routes = require("./routes/todoRoutes");
const PORT = 3000;

mongoose.connect(process.env.USERS_URL, {useNewUrlParser: true});

app.use(bodyParser.json());
// app.use("/", routes);

mongoose.connection.once('open', () => {
  console.log("Database connected");
})
.on('error', () => {
  console.log("Error msg: ", error);
})


app.listen(PORT, () => {
    console.log(`server is listening on https://localhost:${PORT}`);
});