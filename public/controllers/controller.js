var myApp = angular.module('myApp',[]);

myApp.controller('appCtrl', function($scope,$http) {
  console.log("Iam in Controller");
  
  		$http.get('/contactlist').then(function(response)
		{
		  	console.log("i got the data i requested");
		  	console.log(response.data);
		  	$scope.contactList = angular.fromJson(response).data;
		});
	  });	
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
 /*  refresh();

  a.addContact = function(){
  		console.log(a.contact);
  		b.post('/contactlist',a.contact).then(function(response){
  			console.log(response);
  			refresh();
  		});
  };

  a.remove = function(id){
  		console.log(id);
  		b.delete('/contactlist/' + id);
  		refresh();
  }

}]);
 */