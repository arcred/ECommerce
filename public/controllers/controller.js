var myApp=angular.module('myApp', ['ngStorage','ngRoute','angular.filter']);


var loginStatus=false; var email="";
localStorage.flag="false";
var loginStatus=false;
myApp.filter('offset', function() {
    
  return function(input,start) {
      if (!input || !input.length) { return; }
    start = parseInt(start, 10);
    return input.slice(start);
  };
});

myApp.controller('itemsController',['$scope','$http', '$localStorage', '$sessionStorage','$location','$rootScope',function(a,b,c,d,e,f){

     //rating
    a.maxRating = 5;
    a.value="All";
    console.log("Hello from controller");
    var index = 0;
    var list1=[];
    var list2=[];
    var list3=[];

    //pagination
    
     a.itemsPerPage = 4;
  a.currentPage = 0;
  
    a.range = function() {
    var rangeSize = a.pageCount()+1;
    var ret = [];
    var start;

    start = a.currentPage;
    if ( start > a.pageCount()-rangeSize ) {
      start = a.pageCount()-rangeSize+1;
    }

    for (var i=start; i<start+rangeSize; i++) {
      ret.push(i);
    }
    return ret;
    };
    a.prevPage = function() {
    if (a.currentPage > 0) {
      a.currentPage--;
    }
    };

      a.prevPageDisabled = function() {
        return a.currentPage === 0 ? "disabled" : "";
      };

  a.pageCount = function() {
     
    return Math.ceil(f.search.length/a.itemsPerPage)-1;
     
  };

  a.nextPage = function() {
    if (a.currentPage < a.pageCount()) {
      a.currentPage++;
    }
  };

  a.nextPageDisabled = function() {
    return a.currentPage === a.pageCount() ? "disabled" : "";
  };
    a.setPage = function(n) {
    a.currentPage = n;
  };
  

    a.value="All";
    console.log("Hello from controller");
    var index = 0;
    var list1=[];
    var list2=[];
    var list3=[];



    a.showDrop=function(actualItem){

        
        a.actualItem="men";
        a.droplist=[];
        var templist=[];
        var templist1=[];
        a.actualItem=actualItem;
        b.post('/ecommerce',({dept: actualItem})).then(function(response) {
            console.log("i got the data i requested");
            templist.push(response.data);
            var j=0;
            for(var i=0;i<response.data.length;i++){
                templist1.push(templist[0][i].category);

            }
            a.droplist=templist1;
        });
    };

    a.viewAll=function(){

        var responseData=[];
        var allproducts=[];

        b.post('/ecommerce').then(function(response){

            responseData.push(response.data);

            for(var i=0;i<responseData[0].length;i++){
                allproducts.push(responseData[0][i]);
            }
            console.log(allproducts);
            f.search=allproducts;


        });

    };

    var isNotPresent=function(id){

        console.log(id);

        for(var i = 0;i<f.cartItems.length;i++){

            if(f.cartItems[i]._id == id){
                console.log("product is present");
                return false;
            }
        }
        console.log("product is not present");
        return true;
    }


    a.addItem = function(product){


        if(typeof(c.count)!='undefined'){
            c.count=c.count+1;

        }
        else{
            c.count=0;
            c.count=c.count+1;
        }

        f.cartcount=c.count;
        if(isNotPresent(product["_id"]))
        {

            product["count"] = product["count"]+1;
            console.log(product["count"]);

            f.cartItems.push(product);

        }
        else 
        {
            console.log(product["count"]);
            for(var i = 0;i<f.cartItems.length;i++){

                if(f.cartItems[i]._id == product["_id"])
                {
                    product["count"]=product["count"]+1;
                    f.cartItems[i].count=f.cartItems[i].count+1;
                    console.log(f.cartItems[i].count);

                    break;
                }
            }

        } 


        c.addItems = f.cartItems;
        console.log(f.cartItems);
    };

    a.removeItem = function(product)
    {
        var index=c.addItems.indexOf(product);
        f.cartItems.splice(index, 1);
        c.addItems = f.cartItems;
        console.log(f.cartItems);
    };




    f.init = function()
    {  

        f.cartcount=c.count;

        console.log(localStorage.flag);
        if(localStorage.flag=="true"){
            console.log(localStorage.flag);
            document.getElementById("logindd").style.display="none";
            document.getElementById("userdd").style.display="block";

        }
        else{

            document.getElementById("logindd").style.display="block";
            document.getElementById("userdd").style.display="none";
        }

        var responseData=[];
        var responseDataWithCount = [];
        console.log("iam in init fucntion");
        if(typeof(c.addItems)!='undefined')
        {
            f.cartItems = c.addItems;    
        }
        else
        {
            console.log("local storage is not initialized");
            c.addItems=[];
        }
        b.post('/featureProd')
            .then(function(response){

            responseData.push(response.data);
            responseData[0].forEach(function(dataCount) {
                dataCount["count"] = 0;
                responseDataWithCount.push(dataCount);

            });
            f.search=responseDataWithCount;     

        });
    };

    a.viewProducts=function(cat,dep)
    {
        
        var responseData=[]; var responseDataWithCount=[];
        var appareldata=[];
        a.value=cat;
        b.post('/ecommerce',({'dept':dep})).then(function(response){
            responseData.push(response.data);
            for(var i=0;i<responseData[0].length;i++)
            {
                if(responseData[0][i].category == cat){
                    appareldata.push(responseData[0][i]);
                }
            }
            responseData[0].forEach(function(dataCount) {
                dataCount["count"] = 0;
                responseDataWithCount.push(dataCount);
            });
            f.search=appareldata;
        });
        e.path('/');
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
            f.search=responseData[0]; 
        });
    };

    f.searchProduct=function(){    
        var temp=[];    
        var tempName=a.nameItem;
        temp=tempName.split(" ");
        for(var i=0;i<temp.length;i++){
            nameProduct=temp[i];
            searchItem(nameProduct);
        }   
    };   
    a.view=function(prodname){
        var productname=[];
        productname.push(prodname);
        console.log(productname[0].name);
        a.name=productname[0].name;
        a.price=productname[0].price;
        a.category=productname[0].category;
        a.description=productname[0].description;
        a.img=productname[0].img;
    };        


    var searchItem=function(nameProduct)
    {
        var responseData=[]; var responseDataWithCount=[];
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
            else
            {
                responseData.push(response.data);
                console.log(responseData);
                responseData[0].forEach(function(dataCount) {
                    dataCount["count"] = 0;
                    responseDataWithCount.push(dataCount);
                }); 
                for(var i=0;i<responseData[0].length;i++){
                    list1.push(responseData[0][i]);
                }
                categoryFunction();
            }

        });
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
        f.search=newArray;
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
        var list1=[];
        var list2=[];
        var list3=[];
        var list=[];
    }; 


    a.logout=function(){
        localStorage.setItem("userDetails",null);
        console.log("logout");
        localStorage.flag=false;
        f.init();
        e.path('/');
    }
    
    a.previousOrders=function(){
        
        console.log("in previous orders");
        var responsedata={};
        b.post('/previousOrders',({'emailid':email})).then(function(response){
        
           responsedata.push(JSON.stringify(response.data));
           // console.log(JSON.stringify(response.data));
           // responsedata=JSON.stringify(response.data);
          // console.log(responsedata[0]);
        
        });
        console.log(responsedata[0]);
         
    }
    

}]);


myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'homepage.html',
        controller: 'itemsController'
    })
        .when('/cart', {
        templateUrl: 'cart.html',
        controller: 'cartController'
    })
        .when('/login', {
        templateUrl: 'login.html',
        controller: 'loginController'
    })
        .when('/register', {
        templateUrl: 'register.html',
        controller: 'registerController'
    })


        .otherwise({
        redirectTo: '/'
    });
});

myApp.controller('cartController',['$scope','$http', '$localStorage', '$sessionStorage','$location','$rootScope',function(a,b,c,d,e,f){
    var userProducts=[];
    a.msg = "success";

    a.cartProducts = f.cartItems;
    var sum=0;
    for(var i=0;i<f.cartItems.length;i++)
    {
        sum+=f.cartItems[i].price*f.cartItems[i].count;
    }
    f.totalprice=sum;

    a.orderConfirm=function(){
        if(localStorage.flag=="false")
        {
            a.confirmMsg="Please Login!"
        }
        else{

            console.log("inside orderConfirm");
            console.log(email);
            console.log(f.cartItems);
            userProducts.push(email);
            userProducts.push(f.cartItems);
            b.post('/userProducts',(userProducts)).then(function(response){
				console.log(response);
                if(response.data=="inserted"||response.data=="updated"){
                c.addItems = [];
                c.count =0;
                f.cartItems=[];
                a.cartProducts=f.cartItems;
                a.totalprice=0;
                f.cartcount=0;
                c.count=0;        
                a.confirmMsg="Thank you Your order has been placed!";
                }
            });

        }
    }

}]);




myApp.controller('loginController',['$scope','$http', '$localStorage', '$sessionStorage','$location','$rootScope',function(a,b,c,d,e,f){
    console.log("inside loginController");
    if(localStorage.flag == "true"){
        e.path('/');
    }
    else{


        a.userLogin=function(){
            var userName=a.userMail;
            var userPassword=a.userPassword;
            console.log("userName"+userName);
            console.log("Password"+userPassword);

            b.post('/userDetails',({'emailid':userName,'password':userPassword})).then(function(response){
                console.log("inside post UserDetails");
                console.log(response);

                if(response.data==null)
                {
                    a.msg="User Not Found Please SIGNUP";
                    console.log("navigate to login page page for registeration");
                }
                else
                {
                    console.log(response);
                    var sessionId=response.data[0];

                    a.user=response.data[2][0].firstname;
                    a.password=response.data[2][0].password;
                    a.id=sessionId;
                    a.inputPassword=userPassword;
                    console.log(userPassword);
                    console.log(response.data[2][0].password);
                    if(userPassword==response.data[2][0].password)
                    {

                        a.msg="Correct Password";
                        localStorage.setItem("userDetails",JSON.stringify(response.data));
                        console.log("redirect to dashboard");
                        console.log(localStorage.getItem("userDetails"));
                        console.log(localStorage.getItem("userDetails.emailid"));
                        localStorage.flag=true;
                        console.log(localStorage.flag);

                        email=response.data[2][0].emailid;
                        e.path('/');


                    }
                    else{
                        a.msg="Incorrect Password";
                    }    

                }
            });
        }

    };

}]);

myApp.controller('registerController',['$scope','$http', '$localStorage', '$sessionStorage','$location','$rootScope',function(a,b,c,d,e,f){
    console.log("inside regController");


    a.submit=function(){

        var firstName=a.first_Name;
        var secondName=a.last_Name;
        var emailId=a.email_Id;
        var Password=a.pass_word;
        var phoneNumber=a.contact;


        console.log("the details are"+firstName+" "+secondName+" "+emailId+" "+Password+" "+phoneNumber);

        b.post('/userDetails',({'firstname':firstName,'secondname':secondName,'emailid':emailId,'password':Password,'phone':phoneNumber})).then(function(response){

            console.log("inside post UserDetails");
            console.log(response);

            if(response.data[3] == "OldUser"){

                console.log("user already exists please login");
                a.status="The user already exists please login";

            }
            else if(response.data[3] == "NewUser"){

                console.log("user registered");
                a.status="Registeration successful please login";
            }


        });


    };

}]);

