$('[data-toggle="tooltip"]').tooltip();

//Auth
//var auth_url = "http://auth.c100.hasura.me";
//var data_url = "http://data.c100.hasura.me";
var auth_url = "http://auth.vivekjib.hasura.me";
var data_url = "http://data.vivekjib.hasura.me";
(Cookies.get('id') == undefined) ? $('#out').css("display", "none"): $('#out').css("display", "block");
(Cookies.get('id') == undefined) ? $('#in').css("display", "block"): $('#in').css("display", "none");



//login
$('#login_form').on('click', function () {
    //alert("clicked");

    $(this).attr("disabled", true);
    var $usern = $('#username');
    var $pass = $('#password');
    var $user = {
        username: $usern.val(),
        password: $pass.val()
    };


    $.ajax({
        method: 'POST',

        url: auth_url + '/login',
        xhrFields: {
            withCredentials: true
        },

        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify($user)
    }).done(function (data) {
                
        user_id = data.hasura_id;
        Cookies.set('id', user_id, {
            expires: 7
        });
        window.location = "../after-login/index.html";
        toastr["success"]("Login successful")
        toastr.options = {
            "closeButton": true,
        }
    }).fail(function (error) {

        $('#login_form').attr("disabled", false);
        
        var mes = (JSON.parse(error.responseText).message).toString();
        toastr["error"](mes)
        toastr.options = {
            "closeButton": true,
        }
    })
})
//signup

$('#signup_form').on('click touchstart', function () {
    $(this).attr("disabled", true);
    var $usern = $('#username');
    var $pass = $('#password');
    var $email = $('#email');
    var $user = {
        username: $usern.val(),
        password: $pass.val(),
        email: $email.val()
    };

    $.ajax({
        method: 'POST',
        url: auth_url + '/signup',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify($user)
    }).done(function (data) {
        toastr["success"]("Signup successful")
        toastr.options = {
            "closeButton": true,
        }
        console.log(data);
        user_id = data.hasura_id;
        Cookies.set('id', user_id, {
            expires: 7
        });
        var $profile = {
            type: 'insert',
            args: {
                table: 'profile',
                objects: [{
                    'name': $usern.val(),
                    'user_id': user_id
                        }]
            }
        };
        $.ajax({
            method: 'POST',

            url: data_url + '/v1/query',
            xhrFields: {
                withCredentials: true
            },
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify($profile)
        }).done(function (data) {
            //console.log(data);


            window.location = "login.html";
        }).fail(function (error) {
            $('#signup_form').attr("disabled", false);
            console.log(error);
            //alert(JSON.parse(error.responseText).message);
            
        })
        window.location = "login.html";
    }).fail(function (error) {
        $('#signup_form').attr("disabled", false);
         var mes = (JSON.parse(error.responseText).message).toString();
        toastr["error"](mes)
        toastr.options = {
            "closeButton": true,
        }
        console.log(error);
       // alert(JSON.parse(error.responseText).message);
    })
})


//logout
$('#logout').on('click touchstart', function () {
    $(this).attr("disabled", true);
    $.ajax({
        method: 'POST',
        url: auth_url + '/user/logout',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Content-Type': 'application/json'
        }

    }).done(function (data) {
        console.log(data);
        Cookies.remove('id');
        toastr["success"]("Logged out")
        toastr.options = {
            "closeButton": true,
        }
        window.location = "/";
    }).fail(function (error) {
        $('#logout').attr("disabled", false);
        console.log(error);
    })
})


//Insert a new resource into the table by the user
$('#add_resource').on('click', function () {
    $(this).attr("disabled", true);
    var certificate = ($('[name="cert"]:checked').val() == 1) ? true : false;
    var price = ($('[name="paid"]:checked').val() == 1) ? true : false;

    var $info = {
        type: 'insert',
        args: {
            table: 'resource',
            objects: [{
                resource_url: $('[name="r_url"]').val(),
                name: $('[name="name"]').val(),
                topic: $('[name="topic"]').val(),
                user_id: Cookies.get('id'),
                type: $('[name="type"]:checked').val(),
                certificate: certificate,
                cost: price,
                description: $('[name="desc"]').val(),
                }]
        }
    }
    //console.log(JSON.stringify($info));
    $.ajax({
        method: 'POST',
        url: data_url + '/v1/query',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify($info)
    }).done(function (data) {
        console.log(data);


        window.location = "/";
        
    }).fail(function (error) {
        $('#signup_form').attr("disabled", false);
        console.log(error);
        alert(JSON.parse(error.responseText).error);
    })
})
