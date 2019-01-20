$(function(){
   var $number = $('strong').text();
   console.log($number);

   for(var i=1 ;i<$number; i++){
       var $contentUser = $('.containFormUser').html();
       $($contentUser).clone().appendTo('.addUser').attr({class: 'user'+i});           
   };
});
