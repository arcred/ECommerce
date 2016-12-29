var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('ecommerce',['ecommerce']);
var bodyParser=require('body-parser'); 

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.listen(3000);

console.log("server running on port 3000");
 




app.post('/ecommerce',function(req,res){
    
    console.log("iam in server control");
    var collection=db.collection('ecommerce');

    console.log(req.body);
    collection.find(req.body,function(err,doc)
    {

        if(err)
        {
            return;
        }
        else
        {
            res.json(doc);
            console.log("From server.js post");
            console.log(req.body);
        }
    });
});