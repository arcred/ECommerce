var myApp=angular.module('myApp',[]);


myApp.controller('itemsController',['$scope','$http',function(a,b){
    
    console.log("Hello from controller");
    var cartItems = [];
    var index = 0;
    
    a.addItem = function(product){
        
        index = cartItems.indexOf(product);
        if(product["count"]==0){
            
            product["count"] = product["count"]+1;    
           
            cartItems.push(product);
        }
        else if(product["count"]>0){
           product["count"] = product["count"]+1;
           
            //cartItems[index].count = cartItems[index].count+1;
            
        }
        console.log(cartItems.length);
    };
    
    a.removeItem = function(product){
    
        index = cartItems.indexOf(product);
        if(index!=-1 && cartItems[index].count>0 ){
            
            //cartItems[index].count = cartItems[index].count-1;
            product["count"] = product["count"]-1;
               
        }
        else 
        {
            if(index>-1){
                
                product["count"] = 0;
                cartItems.splice(index, 1);
            }
        }
        console.log(cartItems.length);
        
    };
    
    a.searchItem=function(){
       
        var responseData=[];
        var responseDataWithCount = [];
        
        console.log(a.nameItem);
        b.post('/ecommerce',({'category':a.nameItem}))
            .then(function(response){

                console.log("Inside post from controller");
                console.log(response.data);
                console.log("AFter post in controller");

                responseData.push(response.data);

                responseData[0].forEach(function(dataCount) {
                    dataCount["count"] = 0;
                    responseDataWithCount.push(dataCount);
                });
                

                
                console.log(responseDataWithCount);

                a.search=responseDataWithCount;



        });
    };

    a.init = function () {
        
        var responseData=[];
        var responseDataWithCount = [];
        b.post('/featured')
            .then(function(response){

                responseData.push(response.data);
                console.log(responseData);
                responseData[0].forEach(function(dataCount) {
                    dataCount["count"] = 0;
                    responseDataWithCount.push(dataCount);
                
                });
                

                
                console.log(responseDataWithCount);

                a.search=responseDataWithCount;     

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
    