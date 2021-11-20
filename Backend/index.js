const connectToMongo=require("./db");
var cors = require('cors')
const express = require('express')
connectToMongo();
var app = express()
const port = 80 
app.use(express.json())
app.use(cors())
//Available routes
app.use('/api/auth', require('./routes/Auth'))
app.use('/api/notes', require('./routes/Notes'))

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.listen(port, () => {
  console.log(`My Note-Book listening at http://localhost:${port}`)
})