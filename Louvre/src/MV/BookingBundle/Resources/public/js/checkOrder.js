$(function(){

    amount = total*100;
    console.log(amount);
    var formRoute = Routing.generate('mv_booking_stripe', {_locale: 'fr', amount: amount});
    var formRouteEn = Routing.generate('mv_booking_stripe', {_locale: 'en', amount: amount});
    $('#formfrstripe').attr("action", formRoute);
    $('#formenstripe').attr("action", formRouteEn);

});