require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connectToMongoose = require("./connectToDB")
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Test API Endpoint
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/ada', (req, res) => {
  res.send('Hello World!')
})


// API Endpoint through Routing
app.use("/", require("./routes/Todo"))


// Listening the API Endpoint
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
  connectToMongoose()
})