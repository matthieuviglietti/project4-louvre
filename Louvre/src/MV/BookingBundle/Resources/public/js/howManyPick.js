$(function(){

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