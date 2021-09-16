var path = require('path')
const express = require('express')

// Environment Variables
const dotenv = require('dotenv')
dotenv.config()

const api = {
    key: process.env.API_KEY
}

const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));

// Cors for cross origin allowance
const cors = require('cors');
const { json } = require('body-parser')
app.use(cors());

let articleData;

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function(req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081 || process.env.PORT, function() {
    console.log(`Article Evaluation app listening on port ${this.address().port}!`)
})

app.get('/apiKey', function(req, res) {
    res.send(api);
})

app.post('/add', function(req, res) {
    articleData = req.body;
    console.log(`Returning article data. ${articleData.confidence}`)
    res.end(JSON.stringify({ status: 200, message: "success", articleData: articleData }))
})

app.get('/data', function(req, res) {
    res.send(articleData);
})