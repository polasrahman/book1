$(document).ready(function(){
  var submit_fx = function(){

   // Process First name
   var full_name = $.trim($("#full_name").val());
   var name_parts = full_name.split(' ');
   var last_index = name_parts.length - 1;
   var fname, lname;
   fname = name_parts[0];
   lname = name_parts[last_index];
   if(name_parts.length > 2){
       for(var i in name_parts){
           if(i != 0 && i !=last_index){
               fname += ' ' + name_parts[i];
           }
       }
   }
   $('#register_form input[name="fname"]').val(fname);
   $('#register_form input[name="lname"]').val(lname);
   
   var values_raw = $('#register_form').serialize();
   var values = $('#register_form').serializeArray();
   var values_array = [];
   var values_final;

   for(var n in values){
       values_array.push('"'+values[n].name+'":"'+values[n].value+'"');
   }

   values_final = '{'+values_array.join(',')+'}';
   values_final = JSON.stringify(JSON.parse(values_final));
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
                   url: 'https://script.google.com/macros/s/AKfycbxQGaO8WWO578Tr9nw6NrWWOQ6F3ZC8xRjmyVOwr3_TEZOEsAq9/exec',
                   data: values_raw+'&date='+getLocaleDateTime(),
                   error: function(jqXHR,textStatus,errorThrown){
                       //console.log("Failed to load content.", "Error "+jqXHR.status);
                       console.log('OCA started, OCA Id: ' + data.result);
                       $('#register_form input').prop("disabled",false);
                       $('#register_form select').prop("disabled",false);
                       $('#register_form button[type="submit"]').text("Wait...").prop("disabled",false);
                       goog_report_conversion_1();
                       goog_report_conversion_2();
                       goog_report_conversion_3('https://dianeticsboek.nl/thank-you-extract/');
                   },
                   success: function(response) {
                       console.log('OCA started, OCA Id: ' + data.result);
                       $('#register_form input').prop("disabled",false);
                       $('#register_form select').prop("disabled",false);
                       $('#register_form button[type="submit"]').text("Wait...").prop("disabled",false);
                       goog_report_conversion_1();
                       goog_report_conversion_2();
                       goog_report_conversion_3('https://dianeticsboek.nl/thank-you-extract/');
                   }
               });
   $('#register_form button[type="submit"]').text("Wait...").prop("disabled",true);
}
$("#register_form").paminta(submit_fx);
});