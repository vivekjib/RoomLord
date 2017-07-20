//Setting user panel
var address = sessionStorage.address;
$(window).bind("load", function() { 
    $.ajax({
	method: 'GET',
	url: auth_url + '/user/account/info',
	xhrFields: {
            withCredentials: true
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).done(function (data) {
	console.log(data);
			document.getElementById("username").textContent= data.username; 
			document.getElementById("username1").textContent= data.username; 
			document.getElementById("email").textContent= data.email;   
    }).fail(function(error){
			console.log(error);
    });
});
	 
$(window).bind("load", function() { 
	 var addressId = {
			 "type": "select",
	 	  	 "args": {
		    	 "table": "room",
		    	 "columns": ["*"],
		    	 "where": {"address" : address }
		}
  	 }
	 $.ajax({
		method:'POST',
		url: data_url + '/v1/query',
		xhrFields: {
            withCredentials: true
      },
      headers: {
          'Content-Type': 'application/json'
      },
		data: JSON.stringify(addressId)   
 	 }).done(function (data) {
        console.log(data);
        toastr["success"]("Query for table is success")
            toastr.options = {
                "closeButton": true,}
		  document.getElementById("phoneNo").textContent= data[0].owner_phone_no; 
		  document.getElementById("emailOwner").textContent= data[0].email; 
		  document.getElementById("replyTime").textContent= data[0].owner_reply_time; 
		  document.getElementById("address").textContent= data[0].address; 			
		  document.getElementById("ownerName").textContent= data[0].owner_name; 
		  document.getElementById("rent").textContent= data[0].rent; 
		  document.getElementById("nofRoom").textContent= data[0].nRooms; 	
    }).fail(function (error) {
        console.log(error);
        //alert(JSON.parse(error.responseText).error);
    })
});
