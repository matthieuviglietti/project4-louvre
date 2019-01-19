$(function(){
   var $number = $('strong').text();
   console.log($number);

   for(var i=1 ;i<$number; i++){
       $('.containFormUser').append('coucou');
   };
});
