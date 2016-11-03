var fs = require('fs');
var path = require('path');
var bin = new Buffer([0x68,0x65,0x6c,0x6f]);

console.log(bin);

function travel(dir,callback){
	fs.readdirSync(dir).forEach(function(file){
		var pathname = path.join(dir,file);

		if(fs.statSync(pathname).isDirectory()){
			travel(pathname,callback);
		}else{
			callback(pathname);
		}
	});
}

travel('/server',function (pathname){
	console.log(pathname);
});