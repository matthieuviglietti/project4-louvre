$(function() {
    $.datepicker.setDefaults($.datepicker.regional["fr"]);
    $('#date').datepicker({
        minDate: 0,
        appendText: "format attendu: jj-mm-aaaa",
        beforeShowDay: DisableDates,
        altFormat: "yy-mm-dd",
        altField: "#datealt"
    });

    $('#dateen').datepicker($.extend({
            firstDay: 1,
            minDate: 0,
            appendText: "date format: mm-dd-yyyy",
            beforeShowDay: DisableDates,
            altFormat: "yy-mm-dd",
            altField: "#datealt"
        },
        $.datepicker.regional['']
    ));

    function DisableDates(date) {

        /** Days to be disabled as an array */
        let disableddates = ["5-1-2019", "12-25-2019", "11-1-2019"];

        let day = date.getDay();
        let m = date.getMonth();
        let d = date.getDate();
        let y = date.getFullYear();

        for (let i = 0; i < disableddates.length; i++) {
            let currentdate = (m + 1) + '-' + d + '-' + y;
            if (day == 2) {

                return [false];
            } else if ($.inArray(currentdate, disableddates) != -1) {
                return [false];
            } else {
                return [true];
            }
        }
    }

    $('#date').change(function () {
        let selectedDate = $('#datealt').val();
        let selectedDateParam = 'date=' + $('#datealt').val();
        let checkIfDateIsBookable = Routing.generate('mv_booking_checkdate');
        $('#load').load(checkIfDateIsBookable, selectedDateParam, function (response, status, xhr) {
            let leftTickets = xhr.getResponseHeader('leftTickets');
            if (response == "true") {
                $('#valid').css("visibility", "visible");
                $('#info').text(leftTickets);
                $('#tickets').css("visibility", "visible");
            } else {
                $('#novalid').css("visibility", "visible").css("float", "right");
                $("#infoTicket").css("visibility", "visible");
                $("a").css("visibility", "hidden");
            }
        });
        let routeToMany = Routing.generate('mv_booking_howmany', {_locale: 'fr', date: selectedDate});
        $("a").attr('href', routeToMany);
    });

    $('#dateen').on("change", function () {
       let selectedDate = $('#datealt').val();
       let selectedDateParam = 'date=' + $('#datealt').val();
       let checkIfDateIsBookable = Routing.generate('mv_booking_checkdate');
        $('#load').load(checkIfDateIsBookable, selectedDateParam, function (response, status, xhr) {
            let leftTickets = xhr.getResponseHeader('leftTickets');
            if (response == "true") {
                $('#valid').css("visibility", "visible");
                $('#info').text(leftTickets);
                $('#tickets').css("visibility", "visible");
            } else {
                $('#novalid').css("visibility", "visible").css("float", "right");
                $("#infoTicket").css("visibility", "visible");
                $("a").css("visibility", "hidden");
            }
        });
        let routeToManyEn = Routing.generate('mv_booking_howmany', {_locale: 'en', date: selectedDate});
        $("a").attr('href', routeToManyEn);
    });
});