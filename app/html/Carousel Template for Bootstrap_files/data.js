//Setting user panel
$('#roomAddressTable').bootstrapTable({});
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
	//console.log(data);
			document.getElementById("username").textContent= data.username; 
			document.getElementById("username1").textContent= data.username; 
			document.getElementById("email").textContent= data.email;   
    }).fail(function(error){
			console.log(error);
    });
});

$('#search-button').on('click', function() {
    var searchBarValue = document.getElementById("search-bar").value;
	 var searchWhereClause = [];
    var searchSplit = searchBarValue.split(" ");
    searchSplit.forEach(function(item, index, arr){
	       searchWhereClause.push({"address":{"$ilike": "%" + arr[index] + "%"}});
    })
	 console.log(JSON.stringify(searchWhereClause));
	 var $searchQ = {
		"type": "select",
		"args": {
		    "table": "room",
		    "columns": ["id","address"],
		    "where": {"$and" : searchWhereClause }
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
        data: JSON.stringify($searchQ)
    }).done(function (data) {
        console.log(data);
        toastr["success"]("Query is success")
            toastr.options = {
                "closeButton": true,} 
		  $('#roomAddressTable').bootstrapTable("load", data);
    }).fail(function (error) {
        console.log(error);
        //alert(JSON.parse(error.responseText).error);
    })
});


