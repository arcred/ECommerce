var myApp=angular.module('myApp',[]);


myApp.controller('itemsController',['$scope','$http',function(a,b){
    
    console.log("Hello from controller");
    
    
    a.searchItem=function(){
       
        var responsedata=[];
        var responsedatawithcount = [];
        console.log(a.nameItem);
 
 
        b.post('/ecommerce',({'category':a.nameItem}))
            .then(function(response){

                console.log("Inside post from controller");
                console.log(response);
                console.log("AFter post in controller");

                responsedata.push(response.data);
                console.log(responsedata);

                a.search=responsedata[0];     

        });
    };
    
    a.view=function(prodname){
        
        var productname=[];
        productname.push(prodname);
        console.log(productname[0].name);
        a.name=productname[0].name;
        a.price=productname[0].price;
        a.category=productname[0].category;
        a.description=productname[0].description;
        
    };
   
}]);
    