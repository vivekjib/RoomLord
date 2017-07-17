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

//upvote
$("[id^=tu-]").on('click', function () {
    var str = $(this).attr("id");
    var r_url = str.slice(3);
    var $vote = {
        "type": "insert",
        "args": {
            "table": "votes",
            "objects": [
                {
                    "user_id": Cookies.get('id'),
                    "resource": r_url,
                    "value": 1
			}
			]
        }
    }
    $.ajax({
        method: 'POST',
        url: data_url + '/v1/query',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify($vote)
    }).done(function (data) {
        console.log(data);
        toastr["success"]("Your vote is recorded")
            toastr.options = {
                "closeButton": true,}
        update(r_url);

    }).fail(function (error) {
        if (error.status == 400) {
            delete_vote(r_url);
        }
        console.log(error.status);
        //alert(JSON.parse(error.responseText).message);
    })

})
//down vote
$("[id^=td-]").on('click', function () {
    var str = $(this).attr("id");
    var r_url = str.slice(3);
    var $vote = {
        "type": "insert",
        "args": {
            "table": "votes",
            "objects": [
                {
                    "user_id": Cookies.get('id'),
                    "resource": r_url,
                    "value": -1
			}
			]
        }
    }
    $.ajax({
        method: 'POST',
        //url: 'http://data.vivekjib.hasura.me/v1/query',
        url: data_url + '/v1/query',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify($vote)
    }).done(function (data) {
        console.log(data);
        toastr["success"]("Your vote is recorded")
            toastr.options = {
                "closeButton": true,}
        update(r_url);

        //window.location = "/";
    }).fail(function (error) {
        if (error.status == 400) {
            delete_vote(r_url);
        }
        console.log(error);
        //alert(JSON.parse(error.responseText).message);
    })

})


//delete vote function
function delete_vote(rurl) {
    var $delete_original = {
        type: 'delete',
        args: {
            table: 'votes',
            where: {
                user_id: Cookies.get('id'),
                resource: rurl
            }

        }

    }
    $.ajax({
        method: 'POST',
        url: data_url + '/v1/query',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify($delete_original)
    }).done(function (data) {
        console.log(data);
        toastr["error"]("Your vote was removed")
            toastr.options = {
                "closeButton": true,}
        update(rurl);

        //window.location = "/";
    }).fail(function (error) {
            toastr["warning"]("Please login to vote")
            toastr.options = {
                "closeButton": true,}
                console.log(error);
                //alert(JSON.parse(error.responseText).message);
            })
    }

    //update the total votes count
    function update(uurl) {
        //var id = 'tv-'+url;
        var $update = {
            type: 'select',
            args: {
                table: 'resource_info',
                columns: ['total_votes'],
                where: {
                    resource_url: uurl
                }
            }
        }
        $.ajax({
            method: 'POST',
            //url: 'http://data.vivekjib.hasura.me/v1/query',
            url: data_url + '/v1/query',
            xhrFields: {
                withCredentials: true
            },
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify($update)
        }).done(function (data) {
            var x = JSON.stringify(data[0].total_votes); //data is an array with 1 element
            if (x == 'null') {
                x = '0';
            }
            document.getElementById('tv-' + uurl).innerHTML = x;
            //window.location = "/";
        }).fail(function (error) {

            console.log(error);
            //alert(JSON.parse(error.responseText).message);
        })
        //console.log($id);

    }
