const express = require("express");
const favicon = require('express-favicon');
const path = require('path');
const {GetKey, DataClient} = require("./lib/API")
const ArgParser = require("./lib/argParser")

const app = express();
const port = process.env.PORT || 8080
app.use(favicon(__dirname + '/build/favicon.ico')); 
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

const api_key = process.env.TRETTON37_API_KEY //new GetKey(filename).read_key() -- for supplying a json file as an argument
const cl = new DataClient()

app.get("/data", (req, res) => {
	cl.fetch(api_key).then(data => res.send(data)).catch(err => res.send({error: err}))
});

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})