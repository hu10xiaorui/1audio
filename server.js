/* LOADING THE MODULES NEEDED TO RUN THE WEBSERVER */


const express = require('express')			// module used to create the web server
	, path = require('path')				// module used to get the absolute path of a file
	, http = require('http')				// module used to talk to a client
	, cors = require('cors')				// module used to allow cross origin requests
	, fs = require('fs')
	;

	const childProcess = require('child_process');

const prompt = require('prompt-sync')();
/* GLOBAL CONSTANTS */
const app = express()						// Creating a variable: app, to receive and respond to client's requests
	, port = 8000							// Defining what port to use to talk to the client
	, server = http.createServer(app)		// Creating the web server and storing it in a variable: app
	, corsOptions = {						// Setting up the server to accept requests from other domain names
		'origin': '*',
		'methods': 'GET',
		'preflightContinue': false,
		'optionsSuccessStatus': 204
	}
	;


  const time = prompt('seconds to play audio after');
var d = new Date();
var ttpa  = d.getTime()+time*1000;
setTimeout(function() {
	console.log("TIME TO PLAY")
},time*1000)
app.use(cors(corsOptions));					// Allowing any API route to accept requests from any domain

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/client.html'));
});
/* ROUTES TO HANDLE THE REQUEST */
app.get('/audio', (req, res, next) => {			// Recieving a request from the client when there is no path
  var filePath = path.join(__dirname, 'audio.mp3');
   var stat = fs.statSync(filePath);

   res.writeHead(200, {
       'Content-Type': 'audio/mpeg',
       'Content-Length': stat.size
   });

   var readStream = fs.createReadStream(filePath);
   readStream.pipe(res);
   var ip = req.connection.remoteAddress;
   console.log(ip+"requested audio")
});

app.get('/time', (req, res, next) => {			// Recieving a request from the client when there is no path
	res.send(ttpa.toString());
});

server.on('listening', () => {				// Calling a function when the server starts listening for requests
	var addr = server.address()
		, bind = typeof addr === 'string'
			? 'pipe ' + addr
			: 'port ' + addr.port
		;
	console.log('Listening on ' + bind);});	// Logging a message to terminal
server.listen(port);						// Telling the server to start listening
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('server ip: '+add);
})
console.log("time to play:"+ttpa);
