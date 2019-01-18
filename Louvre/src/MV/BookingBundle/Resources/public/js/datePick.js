$(function(){
    $.datepicker.setDefaults( $.datepicker.regional[ "fr" ] );
    $('#date').datepicker({
        minDate      : 0,
        appendText   : "format attendu: jj-mm-aaaa",
        beforeShowDay: DisableDates
    });

    $('#dateen').datepicker($.extend({
        firstDay     : 1,
        minDate      : 0,
        appendText   : "date format: mm-dd-yyyy",
        beforeShowDay: DisableDates
        }, 
        $.datepicker.regional['']
    ));

    function DisableDates(date) {

        /** Days to be disabled as an array */
        let disableddates = ["5-1-2019", "12-25-2019", "11-1-2019"];
    
        var day = date.getDay();
        var m   = date.getMonth();
        var d   = date.getDate();
        var y   = date.getFullYear();

    for (var i = 0; i < disableddates.length; i++) {
        var currentdate = (m + 1) + '-' + d + '-' + y;
        if (day == 2) {

            return [false];
        }

        else if ($.inArray(currentdate, disableddates) != -1) {
            return [false];
        }

        else {
            return [true];
        }
    }}
});