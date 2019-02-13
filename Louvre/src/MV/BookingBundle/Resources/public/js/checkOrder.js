$(function(){

    let regex = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/); //coresponding new TLD

    $(".email").on("change", function () {
        let email=  $(".email").val();
        console.log(regex.test(email));
        if(regex.test(email) == true){
            $('button').css('visibility', 'visible');
            $('#emailerror').css('visibility', 'hidden');
        }
        else{
            $('#emailerror').css('visibility', 'visible');
        }

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

    if(typeof total == "undefined"){
        total = parseInt(0);
    }

    let amount = total*100;
    console.log(amount);
    let brutDate =  $('#date').text();
    brutDate= brutDate.split('-').join(","); // for Firefox
    let date = new Date(brutDate);
    date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    console.log(date);
    let formRoute = Routing.generate('mv_booking_stripe', {_locale: 'fr', amount: amount, date: date });
    let formRouteEn = Routing.generate('mv_booking_stripe', {_locale: 'en', amount: amount, date: date });
    $('#formfrstripe').attr("action", formRoute);
    $('#formenstripe').attr("action", formRouteEn);

    //for checking email


    });


});