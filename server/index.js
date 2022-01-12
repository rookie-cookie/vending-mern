require('dotenv').config()

const express = require("express")
const PORT = process.env.PORT || 3002
const app = express()
const mongoose = require('mongoose')

//Database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))


app.use(express.json())

const sodasRouter = require('../routes/sodas')

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from server!"
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});