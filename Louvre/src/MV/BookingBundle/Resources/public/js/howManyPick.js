$(function(){

    $("#number").on("change", function(){
        let selectedDateParam = 'date=' + $('.selectedDate').text();
        let selectedValue = parseInt($('#number').val());
        let checkIfDateIsBookable = Routing.generate('mv_booking_checkdate');
        $('#load').load(checkIfDateIsBookable, selectedDateParam, function (response, status, xhr) {
            let leftTickets = parseInt(xhr.getResponseHeader('leftTickets'));
            if (leftTickets < selectedValue) {
                $('.nextStep').css("visibility", "hidden");
                $('.nextStepEn').css("visibility", "hidden");
                $("#number").css("background-color", 'red').css('color', 'white').css('border', 'none');
                $("em").text(leftTickets);
                $('#error').css("visibility", "visible");
                $('em').css("visibility", "visible");
            }
            else {
                $('.nextStep').css("visibility", "visible");
                $('.nextStepEn').css("visibility", "visible");
                $("#number").css("background-color", 'white').css('color', 'black').css('border', 'none');
                $('#error').css("visibility", "hidden");
                $('em').css("visibility", "hidden");
            }
        });
    });

        var $numberOfPersons = $('#number option:selected').val();
        var $selectedDate = $('.selectedDate').text();
        $toUser = Routing.generate('mv_booking_users', {date: $selectedDate, nbr: $numberOfPersons});
        $toUserEn = Routing.generate('mv_booking_users', {_locale: 'en', date: $selectedDate, nbr: $numberOfPersons});
        $('.nextStep').attr('href', $toUser);
        $('.nextStepEn').attr('href', $toUserEn);

    $('select').on("change", function(){
        var $numberOfPersons = $('#number option:selected').val();
        var $selectedDate = $('.selectedDate').text();
        $toUser = Routing.generate('mv_booking_users', {date: $selectedDate, nbr: $numberOfPersons});
        $toUserEn = Routing.generate('mv_booking_users', {_locale: 'en', date: $selectedDate, nbr: $numberOfPersons});
        $('.nextStep').attr('href', $toUser);
        $('.nextStepEn').attr('href', $toUserEn);
    });
   
});