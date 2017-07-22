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
    	    toastr["success"]("Query for table successful")
    	        toastr.options = {
    	            "closeButton": true,}
			  document.getElementById("phoneNo").textContent= data[0].owner_phone_no; 
			  document.getElementById("emailOwner").textContent= data[0].email; 
			  document.getElementById("replyTime").textContent= data[0].owner_reply_time; 
			  document.getElementById("address").textContent= data[0].address; 			
			  document.getElementById("ownerName").textContent= data[0].owner_name; 
			  document.getElementById("rent").textContent= data[0].rent; 
			  document.getElementById("nofRoom").textContent= data[0].nRooms; 	
			  var imageQuery = {
		    	"type": "select",
    			"args": {
    				"table": "images",
    				"columns": ["*"],
    				"where": {
    					"id": {
    						"$eq": data[0].id
    					}
    				}
    			}
    		}
    		$.ajax({
    			method: 'POST',
    			url: data_url + '/v1/query',
    			xhrFields:{
    				withCredentials: true
    			},
    			headers: {
    				'Content-Type': 'application/json'
    			},
    			data: JSON.stringify(imageQuery)
    		}).done(function (data){
    			console.log(data);
    			toastr["success"]("Query for images related to rooms successful")
    			toastr.options = {
    				"closeButton": true
    			}
    			document.getElementById("myImg1").src = data[0].images;
    			document.getElementById("myImg2").src = data[1].images;
    			document.getElementById("myImg3").src = data[2].images;
    			document.getElementById("myImg4").src = data[3].images;
    			document.getElementById("myImg5").src = data[4].images;
    			document.getElementById("myImg6").src = data[5].images;
    			document.getElementById("myImgSrc1").href = data[0].images;
    			document.getElementById("myImgSrc2").href = data[1].images;
    			document.getElementById("myImgSrc3").href = data[2].images;
    			document.getElementById("myImgSrc4").href = data[3].images;
    			document.getElementById("myImgSrc5").href = data[4].images;
    			document.getElementById("myImgSrc6").href = data[5].images;
    		}).fail(function (error) {
    			console.log(error);
    		});
    	}).fail(function (error) {
    	    console.log(error);
    	    //alert(JSON.parse(error.responseText).error);
    	});
    }).fail(function(error){
		console.log(error);
   	});
	$().fancybox({
  		selector : '[data-fancybox="images"]',
  		loop     : true
	});
});

