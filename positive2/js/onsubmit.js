$(document).ready(function(){

    $(".et_pb_promo_button").click(function(e) {
        e.preventDefault();
        var aid = $(this).attr("href");
        $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
    });
  var submit_fx = function(){

   // Process First name
   var full_name = $.trim($("#full_name").val());
   var name_parts = full_name.split(' ');
   var last_index = name_parts.length - 1;
   var fname = $.trim($("#et_pb_contact_voornaam_1").val());
   var lname = $.trim($("#et_pb_contact_achternaam_1").val());
   var values_raw = $('#register_form').serialize();
   values_raw = values_raw + "&name=" + fname + "%20" +lname
   
   
   var urls = {
    "be": "https://script.google.com/macros/s/AKfycbxQGaO8WWO578Tr9nw6NrWWOQ6F3ZC8xRjmyVOwr3_TEZOEsAq9/exec", 
    "en": "https://script.google.com/macros/s/AKfycbyIg57MoqgCvXOq4ZmoyKEb45rzs-JPPYjcvqKvH2GRWuANe71L/exec",
    "fr": "https://script.google.com/macros/s/AKfycbwzwatitW1Y-eI2ZPASUPj1x_6fKz3mAUq3KxRkKr8dDZCt1JI/exec",
    "de": "https://script.google.com/macros/s/AKfycbzHJOamgdRJO752bFVoFAWr_LzEZ04xNt7nvaH_VM8c00Prpxk/exec",
    "nl": "https://script.google.com/macros/s/AKfycby6-44SDZVUAC_dqkd-lZaB7lcKGK12QlRTYZGpGsmfbsqBw9M/exec",
    "dk": "https://script.google.com/macros/s/AKfycbwQBvPbtdJ0Zyy2eiOws69i4ngpZa1bIyNF3x6iWybAczoV5wc/exec",
}

 
   console.log(values_raw)
   function getLocaleDateTime(){
       var now  = new Date();
       var YYYY = now.getFullYear();
       var MM   = String(now.getMonth()+1).length > 1? now.getMonth()+1 : '0'+String(now.getMonth()+1);
       var DD   = String(now.getDate()).length > 1? now.getDate() : '0'+String(now.getDate());
       var hh   = String(now.getHours()).length > 1? now.getHours() : '0'+String(now.getHours());
       var mm   = String(now.getMinutes()).length > 1? now.getMinutes() : '0'+String(now.getMinutes());
       var ss   = String(now.getSeconds()).length > 1? now.getSeconds() : '0'+String(now.getSeconds());
       var tz   = now.getTimezoneOffset()/60;
       var sign = "";

       if(tz < 0) sign = '+'; if(tz > 0) sign = '-';
       tz = String(Math.abs(tz)).length > 1? sign+Math.abs(tz)+':00' : sign+'0'+Math.abs(tz)+':00';

       var format = YYYY+'-'+MM+'-'+DD+' '+hh+':'+mm+':'+ss+' UTC'+tz;

       return format;
   }

 //   Ajax submit
               $.ajax({
                   method: 'GET',
                   url: urls[$('input[name="lang"]').val()],
                   data: values_raw+'&date='+getLocaleDateTime(),
                   error: function(jqXHR,textStatus,errorThrown){
                        $('#register_form').find('input').val("");
                       $('#register_form input').prop("disabled",false);
                       $('#register_form select').prop("disabled",false);
                       $('#register_form button[type="submit"]').text("Sent").prop("disabled",false);
                       gtag_report_conversion_1();
                       gtag_report_conversion_2();
                       gtag_report_conversion_3('thank-you.html');
                   },
                   success: function(response) {
                        $('#register_form').find('input').val("");
                       $('#register_form input').prop("disabled",false);
                       $('#register_form select').prop("disabled",false);
                       $('#register_form button[type="submit"]').text("Sent").prop("disabled",false);
                       gtag_report_conversion_1();
                       gtag_report_conversion_2();
                       gtag_report_conversion_3('thank-you.html');
                   }
               });
   $('#register_form button[type="submit"]').text("Wait...").prop("disabled",true);
}
$("#register_form").paminta(submit_fx);
});