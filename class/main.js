var teacher = require('./teacher.js');
var student = require('./student.js');

exports.create = function (name){
	return{
		teacher:teacher.create(),
		student:student.create()
	};
};