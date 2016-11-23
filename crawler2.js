var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express');

var app = express();
var url = require('url');

var condeUrl = 'https://cnodejs.org/';
app.get('/',function(req,res,next){


superagent.get(condeUrl).end(function(err,sres){
	if(err){
		return console.error(err);
	}
	var topicUrls = [];
	var $ = cheerio.load(sres.text);
	$('#topic_list .topic_title').each(function(idx,element){
		var $element = $(element);
		var href = url.resolve(condeUrl,$element.attr('href'));
		topicUrls.push(href);
	});
	var ep = new eventproxy();
	var items = [];
	ep.after('topic_html',topicUrls.length,function(topics){
		topics = topics.map(function(topicPair){
			var topicUrl = topicPair[0];
			var topicHtml =topicPair[1];
			var $ = cheerio.load(topicHtml);
			items.push({
				title:$('.topic_full_title').text().trim(),
				href: topicUrl,
				comment1: $('.reply_content').eq(0).text().trim()
			});
			return({
				title: $('.topic_full_title').text().trim(),
				href: topicUrl,
				comment1: $('.reply_content').eq(0).text().trim()
			});
		});
		console.log(topics);
		res.send(topics);
	});
	topicUrls.forEach(function(topicUrl){
		superagent.get(topicUrl).end(function(err,sres){
			console.log('fetch ' + topicUrl + " successfule");
			ep.emit('topic_html',[topicUrl,sres.text]);
		});
	});
});

});

app.listen('3000',function(req,res){
	console.log('app is running at port 3000');
});