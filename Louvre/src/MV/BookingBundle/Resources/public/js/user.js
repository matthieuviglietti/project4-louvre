$(function(){
    var sessionKey = $('.sessionKey').text();
    $('.session').val(sessionKey).hide();
    $('.session ~ label').hide();
    var nbr = $('strong').text();
    nbr = parseInt(nbr);

    var day ="";
    var month ='';
    var year = '';

    var dateUrl = $('#dateofvisit').text();
    var dateOfVisit = new Date(dateUrl);
    $('#dateofvisit').hide();
   
    var dateOfTheDay = new Date();
    var yearOfTheDay = dateOfTheDay.getFullYear();
    var monthOfTheDay = dateOfTheDay.getMonth()+1;
    var dayOfTheDay = dateOfTheDay.getDate();
    
    console.log(dateOfVisit);
    var limitHalfTicket = dateOfTheDay.getHours();

        $('select').slice(0, nbr).each(function(index){

            $('.date').attr('value', dateUrl);

            //Hide date
            $('#mv_bookingbundle_form_user_'+ index +'_date').hide();
            $('label[for="mv_bookingbundle_form_user_'+ index +'_date"]').hide();

            //Hide ticket choice before changing birthdate
            $('#mv_bookingbundle_form_user_'+ index +'_ticket').hide();
            $('label[for="mv_bookingbundle_form_user_'+ index +'_ticket"]').hide();    
            $('#mv_bookingbundle_form_user_'+ index +'_birthDate_year').on("change",function(){
                $('#mv_bookingbundle_form_user_'+ index +'_ticket').val('');
                $('label[for= "mv_bookingbundle_form_user_'+ index +'_ticket"]').show(); 
                $('#mv_bookingbundle_form_user_'+ index +'_ticket').show();
            });
        
                $('#mv_bookingbundle_form_user_'+ index +'_birthDate').on("change", function(){
                    day = parseInt($('#mv_bookingbundle_form_user_'+ index +'_birthDate_day').val());
                    month = parseInt($('#mv_bookingbundle_form_user_'+ index +'_birthDate_month').val());
                    year = parseInt($('#mv_bookingbundle_form_user_'+ index +'_birthDate_year').val());

                    console.log(day, month, year);
                    var visitYear = dateOfVisit.getFullYear();
                    var visitMonth = dateOfVisit.getMonth()+1;
                    if(visitMonth<10){
                        visitMonth = parseInt(0 + visitMonth);
                    }
                    var visitDay = dateOfVisit.getDate();
                    console.log(visitDay, visitMonth, visitYear);

                    var yearDiff = visitYear - year;
                    var monthDiff = visitMonth - month;
                    var dayDiff = visitDay - day;
                    console.log(dayDiff, monthDiff, yearDiff);

                    if((yearDiff < 4) || ((yearDiff === 4) && (monthDiff<0)) || ((yearDiff === 4) && (monthDiff === 0) && (dayDiff<0))) {
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                        if ((yearOfTheDay === visitYear) && (monthOfTheDay === visitMonth) && (dayOfTheDay === visitDay) && (limitHalfTicket>14)){
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
                        }
                    }
                    if(((yearDiff === 4) && (monthDiff>0)) || ((yearDiff === 4) && (monthDiff === 0) && (dayDiff>0)) || ((yearDiff === 4) && (monthDiff === 0) && (dayDiff === 0))) {
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                        if ((yearOfTheDay === visitYear) && (monthOfTheDay === visitMonth) && (dayOfTheDay === visitDay) && (limitHalfTicket>14)){
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                        }
                    }

                // 12 years conditions
                    if(((yearDiff<12) && (yearDiff > 4)) || ((yearDiff === 12) && (monthDiff<0)) || ((yearDiff === 12) && (monthDiff === 0) && (dayDiff<0))) {
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                        if ((yearOfTheDay === visitYear) && (monthOfTheDay === visitMonth) && (dayOfTheDay === visitDay) && (limitHalfTicket>14)){
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                        }
                    }
                    if((((yearDiff === 12) && (monthDiff>0)) || ((yearDiff === 12) && (monthDiff === 0) && (dayDiff>0))) || ((yearDiff === 12) && (monthDiff === 0) && (dayDiff === 0))){
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').show();
                        if ((yearOfTheDay === visitYear) && (monthOfTheDay === visitMonth) && (dayOfTheDay === visitDay) && (limitHalfTicket>14)){
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                        }
                    }
                    //adult and senior conditions
                    if(((yearDiff<60) && (yearDiff > 12)) || ((yearDiff === 60) && (monthDiff<0)) || ((yearDiff === 60) && (monthDiff === 0) && (dayDiff<0))) {
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').show();
                        if ((yearOfTheDay === visitYear) && (monthOfTheDay === visitMonth) && (dayOfTheDay === visitDay) && (limitHalfTicket>14)){
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                        }
                    }
                    if(((yearDiff>60) || ((yearDiff === 60) && (monthDiff>0)) || ((yearDiff === 60) && (monthDiff === 0) && (dayDiff>0)))|| ((yearDiff === 60) && (monthDiff === 0) && (dayDiff === 0))) {
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').show();
                        if ((yearOfTheDay === visitYear) && (monthOfTheDay === visitMonth) && (dayOfTheDay === visitDay) && (limitHalfTicket>14)){
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                        }
                    }
                });
            });

        //generating Routes for nextButton
        var toUser = Routing.generate('mv_booking_check', {date: dateUrl, nbr: nbr});
        var toUserEn = Routing.generate('mv_booking_check', {_locale: 'en', date: dateUrl, nbr: nbr});
        $('.nextStep').attr('href', toUser);
        $('.nextStepEn').attr('href', toUserEn);
});
