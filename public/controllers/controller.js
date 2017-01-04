var myApp=angular.module('myApp', ["ngStorage"]);


myApp.controller('itemsController',['$scope','$http', '$localStorage', '$sessionStorage',function(a,b,c,d){
    
    a.value="All";
    console.log("Hello from controller");
    var cartItems = [];
    var index = 0;
    var list1=[];
    var list2=[];
    var list3=[];
    
    a.viewAll=function(){
        
        var responseData=[];var allproducts=[];
        
        b.post('/ecommerce').then(function(response){
        
            responseData.push(response.data);
            //console.log(responseData[0]);
            for(var i=0;i<responseData[0].length;i++){
                allproducts.push(responseData[0][i]);
            }
            console.log(allproducts);
            a.search=allproducts;


        });
                                  
    };
    
    var isNotPresent=function(id){
        
        console.log(id);
        
        for(var i = 0;i<cartItems.length;i++){
        
            if(cartItems[i]._id == id){
                console.log("product is present");
                return false;
            }
        }
        console.log("product is not present");
        return true;
    }
     
    a.addItem = function(product){
        
        
        if(isNotPresent(product["_id"]))
        {
            
            product["count"] = product["count"]+1; 
            cartItems.push(product);
        }
        else {
            product["count"] = product["count"]+1;
        }
        
        c.addItems = cartItems;
        console.log(cartItems);
    };
    
    a.removeItem = function(product){
    
        if(!isNotPresent(product["_id"]) && product["count"]>=1){
            
            product["count"] = product["count"]-1;
               
        }
        else 
        {
            if(!isNotPresent(product["_id"]) && product["count"]==0){
                
                product["count"] = 0;
                cartItems.splice(index, 1);
            }
        }
        
        
        c.addItems = cartItems;
        console.log(cartItems);
        
        
    };
    
    a.init = function(){
        
        
        var responseData=[];
        var responseDataWithCount = [];
        
        if(typeof(c.addItems)!='undefined'){
            
            cartItems = c.addItems;    
        }
        else
        {
            
            console.log("local storage is not initialized");
        }
        b.post('/featured')
            .then(function(response){

                responseData.push(response.data);
                responseData[0].forEach(function(dataCount) {
                    dataCount["count"] = 0;
                    responseDataWithCount.push(dataCount);
                
                });

                a.search=responseDataWithCount;     

        });
    };
    
    a.viewProducts=function(cat,dep){
        var responseData=[]; var responseDataWithCount=[];
       
        var appareldata=[];
        a.value=cat;
        b.post('/ecommerce',({'dept':dep})).then(function(response){
   
            responseData.push(response.data);
            
            
            responseData[0].forEach(function(dataCount) {
                    dataCount["count"] = 0;
                    responseDataWithCount.push(dataCount);
                
                });

        

            for(var i=0;i<responseData.data.length;i++)
            {
                if(responseData[0][i].category == cat){
                    appareldata.push(responseData[0][i]);
                }

            }

            a.search=appareldata;

        });
    };
        
        
    a.deptProducts=function(dep){
        var responseData=[]; var responseDataWithCount=[];
        a.value=dep;
        b.post('/ecommerce',({'dept':dep})).then(function(response){
            responseData.push(response.data);
            responseData[0].forEach(function(dataCount) {
                    dataCount["count"] = 0;
                    responseDataWithCount.push(dataCount);
                
                });

                a.search=responseData; 
            
            
           
        });
    };
    
    a.searchProduct=function(){    
        var temp=[];    
        var tempName=a.nameItem;
        temp=tempName.split(" ");
        for(var i=0;i<temp.length;i++){
            nameProduct=temp[i];
            searchItem(nameProduct);
        }   
    }   
        
    var searchItem=function(nameProduct){
        var responseData=[]; var responseDataWithCount=[];
        //console.log(a.nameItem);
 
        b.post('/ecommerce',({'name':{'$regex': nameProduct}})).then(function(response){
        
            console.log("Inside post name from database from controller");
            console.log(response);
            console.log("AFter post in controller");
            console.log(response.data.length);
            if(response.data.length==0)
            {
                console.log("No match found in product name");
                categoryFunction();
            }
            else{
 
                responseData.push(response.data);
                console.log(responseData);
               
                responseData[0].forEach(function(dataCount) {
                    dataCount["count"] = 0;
                    responseDataWithCount.push(dataCount);
                
                });

               // a.search=responseDataWithCount; 
                
                for(var i=0;i<responseData[0].length;i++){
                    list1.push(responseData[0][i]);
                }
                categoryFunction();
            }

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
        
    var categoryFunction=function(){
        var responseData=[]; var responseDataWithCount=[];
        console.log(a.nameItem);

        b.post('/ecommerce',({'category':{'$regex': nameProduct}})).then(function(response){
            console.log("from category search");
            if(response.data.length==0)
            {
                console.log("no match found in product category");
                deptFunction();
            }
            else{
                responseData.push(response.data);
                console.log(responseData);
                //a.seacrh=responseData[0];
                responseData[0].forEach(function(dataCount) {
                    dataCount["count"] = 0;
                    responseDataWithCount.push(dataCount);
                
                });

              
                for(var i=0;i<responseData[0].length;i++){
                    list2.push(responseData[0][i]);
                }
                deptFunction();  
            }
 
 
        });
    };
 
    var deptFunction=function(){
        var responseData=[]; var responseDataWithCount=[];
        console.log(a.nameItem);

        b.post('/ecommerce',({'dept':{'$regex': nameProduct}})).then(function(response){
            console.log("from dept search");
            if(response.data.length==0)
            {
                console.log("No products found");
                listDetails();
            }
            else{
                responseData.push(response.data);
                console.log(responseData);
                //a.seacrh=responseData[0];
                
                responseData[0].forEach(function(dataCount) {
                    dataCount["count"] = 0;
                    responseDataWithCount.push(dataCount);
                
                });

                 
                for(var i=0;i<responseData[0].length;i++){
                    list3.push(responseData[0][i]);
                }
                listDetails();   
            }

        });

    };
        
    var listDetails=function(){
        var list=[];
        list=list1.concat(list2.concat(list3));
        console.log(list);
        var newArray = removeDuplicate(list, 'name');
        console.log(newArray);
        if(newArray.length==0)
        {
            alert("No products found");
        }
        a.search=newArray;
        refresh();

    };
        
    function removeDuplicate(arr, prop) {
        var new_arr = [];
        var lookup = {};
        for (var i in arr) {
            lookup[arr[i][prop]] = arr[i];
        }
        for (i in lookup) {
            new_arr.push(lookup[i]);
        }
        return new_arr;
    };
  
    var refresh=function(){
        list1=[];
        list2=[];
        list3=[];
        list=[];
    };  
        

    
}]);
    
    