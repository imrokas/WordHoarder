var express = require('express');
var server = express();
var port = process.env.PORT || 3000;

server.use(express.static(__dirname + '/client'));

server.listen(port, function(){
	console.log('server is running on http://localhost:3000');
});