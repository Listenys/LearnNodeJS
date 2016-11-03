var http = require('http');
const url = require('url');

http.createServer(function(request,response){
	var tmp = request.url;
	url.parse(tmp);
}).listen(80);
