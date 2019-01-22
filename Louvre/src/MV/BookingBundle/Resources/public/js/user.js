$(function(){
console.log($('#mv_bookingbundle_user_birthDate').val());
   var number = $('strong').text();
   number = parseInt(number);
   number = number +1;
   console.log(number);

   var contentUser = $('.containFormUser').html();
   $('.selectedDate').hide();

   $(contentUser).ready(function(){
    for(var i=1 ;i<number; i++){
        $('.containFormUser').hide();
        var cloneElts = $(contentUser).clone().appendTo('.addUser');  
        cloneElts.attr({class: 'user'+i});
        };
    });
    
});
