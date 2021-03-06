var message_box = {
    open : function(message){
        $("#modal_message").css("display","block");
        $("#modal_message .text").text(message);
        $("#modal_message button").unbind('click').click(message_box.close);
        $("body").addClass("noscroll");
    },
    close : function(){
        $("body").removeClass("noscroll");
        $("#modal_message").css("display","none");
    }
}
$("#order_form form").submit(function(e){
    e.preventDefault();
    var error = 0;
    var form = this;
    var info = $(this).serialize();
    var name = $(this).find('input[name="name"]');
    var addr = $(this).find('input[name="address"]');

    function working(obj){
        $(obj).find('input').prop("disabled", true);
        $(obj).find('input[type="submit"]').val("Attendez...");
    }
    function done(obj){
        $(obj).find('input').prop("disabled", false);
        $(obj).find('input[type="submit"]').val("Envoyer");
    }

    if(error == 0){
        if(($.trim(name.val())).length < 2){
            name.focus();
            name.parents("div.form-input").addClass("error");
            error++;
        }
        else{
            name.parents("div.form-input").removeClass("error");
        }
    }
    if(error == 0){
        if(($.trim(addr.val())).length < 2){
            addr.focus();
            addr.parents("div.form-input").addClass("error");
            error++;
        }
        else{
            addr.parents("div.form-input").removeClass("error");
        }
    }
    if(error == 0){
        working(form);
        function processResponse(response){
            setTimeout(function(){
                done(form);
                message_box.open(response.message);
            },1000);
        }
        $.ajax({
            method : "post",
            url : "mail.php",
            data : info,
            success : processResponse
        });
    }
});