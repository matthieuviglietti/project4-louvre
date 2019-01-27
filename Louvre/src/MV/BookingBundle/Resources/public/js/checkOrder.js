$(function(){

    var cancelRoute = Routing.generate('mv_booking_homepage', {_locale: 'fr'});
    $('.cancel').attr("href", cancelRoute);
    amount = total*100;
    console.log(amount);
    var formRoute = Routing.generate('mv_booking_stripe', {amount: amount});
    $('form').attr("action", formRoute);

});