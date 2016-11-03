const url = require('url');

var li = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');

console.log(li);