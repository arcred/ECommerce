var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('ecommerce',['ecommerce']);
var featured=mongojs('featureProd',['featureProd']);
var userprod=mongojs('userProducts',['userProducts']);
var users=mongojs('userDetails',['userDetails']);
var bodyParser=require('body-parser'); 

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.listen(3000);

console.log("server running on port 3000");

var session = require('express-session');

app.set('trust proxy', 1) // trust first proxy 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.post('/featureProd',function(req,res){
    console.log("iam in nginit server");
    var collection = featured.collection('featureProd');
    collection.find(function(err,doc)
                    {
        if(err){
            return;
        }
        else{
            res.json(doc);
            console.log("from init server");         
        }
    });

});

app.post('/getAddress',function(req,res){
    
    console.log(req.body);
    
    var collection=users.collection('userDetails');
    
    collection.find({'emailid':req.body.emailid},{'address':1},function(err,doc){
        
        
        if(err)
        {
            return;
        }
        else
        {
            res.json(doc);
            console.log("address sent"+doc);

        }

        
        
    });
    
    
    
});





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



app.post('/userDetails', function (req, res) {
    console.log("from server userDetails");

    var sessionDetails=[];
    var sid = req.sessionID;
    var sess = req.session;
    sessionDetails.push(sid);
    sessionDetails.push(sess);

    console.log(req.body);
    var collection=users.collection('userDetails');
    var document = {"firstname":req.body.firstname, "secondname":req.body.secondname,"password":req.body.password,"emailid":req.body.emailid,"phone":req.body.phone};

    collection.findOne({'emailid':req.body.emailid},function(error,exist){
        if(exist && !error){
            console.log("User already exists");
            console.log(req.body.emailid);
            collection.find({'emailid':req.body.emailid},function(err,doc){
                console.log(doc);
                sessionDetails.push(doc);
                sessionDetails.push("OldUser");
                res.json(sessionDetails);
            });
        }
        else{
            console.log("user not found");
            console.log(document);
            if(document.firstname==undefined){
                console.log("firstname not found");
                res.json(null);
            }
            else{

                collection.insert(document,function(err,doc){
                    if(err)
                        console.log(err);
                    else
                    {
                        console.log("item inserted");
                        sessionDetails.push(doc);
                        sessionDetails.push("NewUser")
                        res.json(sessionDetails);

                    }

                });
            }



            console.log("from server.js userDetails");
        }

    })


});

app.post('/userProducts',function(req,res){
    console.log(req.body);
    console.log(req.body[1].length);
    var collection=userprod.collection('userProducts');
    var collection1=db.collection('ecommerce');
    var document = {"emailid":req.body[0],"products":req.body[1]};

    collection.findOne({'emailid':req.body[0]},function(error,exist){
        if(exist && !error){
            console.log("user found");
            collection.update(
                {'emailid':req.body[0]},
                {$push: {'products':req.body[1]}});


            for(var i=0;i<req.body[1].length;i++){
                var tempName=req.body[1][i].name;
                console.log(tempName);
                collection1.find({'name':req.body[1][i].name},{'quantity':1,'name':1},function(err,doc){
                    if(!err){
                        console.log(doc[0].quantity);
                        console.log("for loop qunatoty update");
                        console.log(doc[0].name);
                       // console.log(doc[0].quantity-1);
                        collection1.update({'name':doc[0].name},{$set:{'quantity':doc[0].quantity-1}},function(err,doc){
                            console.log("modified");
                            console.log(doc);
                        });
                    }
                    else{
                        console.log("not found");
                    }
                });
            }
            res.send("updated") ;  
        }

        else{

            collection.insert(document,function(err,doc){

                if(err)
                    console.log(err);
                else
                {
                    console.log("inserted");
                    res.send("inserted");
                }

            });



        }


    });

});

app.post('/previousOrders',function(req,res){

    console.log(req.body);

    var collection=userprod.collection('userProducts');
    collection.find(req.body,function(err,doc){

        if(err)
        {
            return;
        }
        else
        {
            res.json(doc);
            console.log("sent from server");

        }


    });



});
