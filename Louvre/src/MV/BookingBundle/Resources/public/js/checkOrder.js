$(function(){

    $("button.stripe-button-el").removeAttr('style').css({
        "display":"block",
        "width":"250px",
        "height": "45px",
        "background":"#2C1DEB",
        "color":"white",
        "border-radius": "20px",
        "text-transform": "uppercase",
        "font-family": "'Poppins', sans-serif",
        "margin":"100px auto 0 auto",
        "font-size":"1em" });
    $("button.stripe-button-el").text($(".stripe-button-el span").text());
    $(".stripe-button-el span").remove();

    amount = total*100;
    console.log(amount);
    var formRoute = Routing.generate('mv_booking_stripe', {_locale: 'fr', amount: amount, date: visit});
    var formRouteEn = Routing.generate('mv_booking_stripe', {_locale: 'en', amount: amount, date: visit});
    $('#formfrstripe').attr("action", formRoute);
    $('#formenstripe').attr("action", formRouteEn);

});