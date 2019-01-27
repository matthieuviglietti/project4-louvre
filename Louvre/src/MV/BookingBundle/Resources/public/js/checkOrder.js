$(function(){
    var cancelRoute = Routing.generate('mv_booking_homepage', {_locale: 'fr'});
    $('.cancel').attr("href", cancelRoute);

});