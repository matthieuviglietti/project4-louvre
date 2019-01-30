$(function(){
    $.datepicker.setDefaults( $.datepicker.regional[ "fr" ] );
    $('#date').datepicker({
        minDate      : 0,
        appendText   : "format attendu: jj-mm-aaaa",
        beforeShowDay: DisableDates,
        altFormat: "yy-mm-dd",
        altField: "#datealt"
    });

    $('#dateen').datepicker($.extend({
        firstDay     : 1,
        minDate      : 0,
        appendText   : "date format: mm-dd-yyyy",
        beforeShowDay: DisableDates,
        altFormat: "yy-mm-dd",
        altField: "#datealt"
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

    $('#date').change(function(){
        var selectedDate = $('#datealt').val();
        var selectedDateParam = 'date='+$('#datealt').val();
        var checkIfDateIsBookable = Routing.generate('mv_booking_checkdate');
        $('#check').load(checkIfDateIsBookable,selectedDateParam);
        var routeToMany= Routing.generate('mv_booking_howmany', {_locale: 'fr', date: selectedDate});
        $("a").attr('href', routeToMany);
    });
   
    $('#dateen').on("change", function(){
        selectedDate = 'date='+$('#dateen').val();
        var checkIfDateIsBookable = Routing.generate('mv_booking_checkdate');
        $('#check').load(checkIfDateIsBookable,selectedDate);
        var routeToManyEn= Routing.generate('mv_booking_howmany', {_locale: 'en', date: selectedDate});
        $("a").attr('href', routeToManyEn);
    });

    $('#check').on("click", '#valid', function(){
        $("a").attr('class', 'noUse');
    });
    
    

    
});
