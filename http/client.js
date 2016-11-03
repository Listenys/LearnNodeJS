var http = require('http');

var options = {
	hostname:'www.example.com',
	post:80,
	path:'/',
	method:'GET',
	headers:{
		'Content-Type':'application/x-www-form-urlencoded'
	}
};

var request = http.request(options,function(response){});

request.write('Hello World!');
request.end();