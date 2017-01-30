
//port for client
$(document).ready(function(){
	$("#testAPI").on("click",function(){
		console.log("It is working!");
	});

	var test = $.ajax({
		type: "GET",
		url: "http://localhost:3000/api/test"
	});
	test.done(function(data){
		console.log(data);
	});
	test.fail(function(){
		console.log("Oh no!")
	});

});
