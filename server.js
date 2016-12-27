var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('affa',['affa']);



app.use(express.static(__dirname + '/public'));

app.get('/contactlist',function(req,res){
	console.log("I recieved a get request");
	
	db.affa.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});





























/* app.post('/contactlist',function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,docs){
		res.json(docs);
	})
});

app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	})
}) */

app.listen(3000);
console.log("server port running on 3000");