$(document).ready(function () {
    $("#btn-login").on('click', function(){
        let un = $("#loginNo").val();
        let pw = $("#loginPass").val();

        if(un != "" && pw != ""){
            $.ajax({
                url:"login",
                method:"POST",
                data:{
                    un : un,
                    pw : pw
                },
                success: function(result){
                    if(result == "OK"){
                        window.location = "/home"
                    }else {
                        if($(".loginError").length == 0){
                            $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Wrong Username or Password</label>");
                        }else{
                            $(".logInErrorMessage .loginError").remove();
                            $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Wrong Username or Password</label>");
                        }
                    }
                }
            })
        }else{
            if($(".loginError").length == 0){
                $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Fields cannot be Empty</label>");
            }else{
                $(".logInErrorMessage .loginError").remove();
                $(".logInErrorMessage").append("<label class='loginError' style='color: red;'>Fields cannot be Empty</label>");
            }
        }
    });
});