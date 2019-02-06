$(function(){

    $("button.stripe-button-el").removeAttr('style').css({
        "display":"block",
        "width":"250px",
        "height": "45px",
        "background":"transparent",
        "color":"white",
        "border": "3px solid white",
        "text-transform": "uppercase",
        "font-family": "'Poppins', sans-serif",
        "margin":"100px auto 0 auto",
        "font-size":"1em" });
    $("button.stripe-button-el").attr('class', 'stripe-button-el hvr-sweep-to-right');
    $("button.stripe-button-el").text($(".stripe-button-el span").text());
    $(".stripe-button-el span").remove();

    $('hr:last-child').remove();

    amount = total*100;
    console.log(amount);
    let brutDate =  $('#date').text();
    brutDate= brutDate.split('-').join(","); // for Firefox
    let date = new Date(brutDate);
    date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    console.log(date);
    var formRoute = Routing.generate('mv_booking_stripe', {_locale: 'fr', amount: amount, date: date });
    var formRouteEn = Routing.generate('mv_booking_stripe', {_locale: 'en', amount: amount, date: date });
    $('#formfrstripe').attr("action", formRoute);
    $('#formenstripe').attr("action", formRouteEn);

});