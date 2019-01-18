$(function(){
    $.datepicker.setDefaults( $.datepicker.regional[ "fr" ] );
    $('#date').datepicker({
        dateFormat : 'dd-mm-yy',
        minDate : 0,
        appendText: "format attendu : jj-mm-aaaa",
        firstDay: 1,
        beforeShowDay: DisableDates,
    });

    $('#dateen').datepicker( $.datepicker.regional[""]);
    $('#dateen').datepicker({
        dateFormat : 'M-D-Y',
        minDate: 0,
        appendText: "date format : mm-dd-yyyy",
        firstDay: 1,
        beforeShowDay: DisableDates,
    })

function DisableDates(date) {

     /** Days to be disabled as an array */
    let disableddates = ["5-1-2019", "12-25-2019", "11-1-2019"];
 
    var day = date.getDay();
    var m = date.getMonth();
    var d = date.getDate();
    var y = date.getFullYear();

 for (var i = 0; i < disableddates.length; i++) {
        // First convert the date in to the mm-dd-yyyy format 
        // Take note that we will increment the month count by 1 
        var currentdate = (m + 1) + '-' + d + '-' + y ;
   // If day == 1 then it is MOnday
   if (day == 2) {
   
    return [false] ; {
    }
}
    else if ($.inArray(currentdate, disableddates) != -1 ){
        return [false];
   
   } else { 
   return [true] ;
   }
}}
});