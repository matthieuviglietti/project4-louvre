$(function(){
    let sessionKey = $('.sessionKey').text();
    $('.session').val(sessionKey).hide();
    $('.session ~ label').hide();
    let nbr = $('strong').text();
    nbr = parseInt(nbr);

    $('#mv_bookingbundle_form_submit').attr('class', 'hvr-sweep-to-right');

    let day ="";
    let month ='';
    let year = '';

    let dateUrl = $('#dateofvisit').text();
    let dateOfVisit = new Date(dateUrl);
    $('#dateofvisit').hide();

    let dateOfTheDay = new Date();
    let yearOfTheDay = dateOfTheDay.getFullYear();
    let monthOfTheDay = dateOfTheDay.getMonth()+1;
    let dayOfTheDay = dateOfTheDay.getDate();

    let limitHalfTicket = dateOfTheDay.getHours();

        $('select').slice(0, nbr).each(function(index){

            //Verify length of Name and First Name
            $('#mv_bookingbundle_form_user_'+ index +'_name').on('change', function () {
                let inputFirst = $('#mv_bookingbundle_form_user_'+ index +'_firstName').val();
                let inputName = $('#mv_bookingbundle_form_user_'+ index +'_name').val();
                if(inputName.length == 1) {
                    $("#errorName").css('visibility', 'visible');
                    $('#mv_bookingbundle_form_submit').css('visibility', 'hidden');
                }
                else if ((inputName.length >1) && (inputFirst.length >1)){
                    $('#mv_bookingbundle_form_submit').css('visibility', 'visible');
                    $("#errorName").css('visibility', 'hidden');
                }
                else if (inputName.length == 0){
                    $('#mv_bookingbundle_form_submit').css('visibility', 'hidden');
                    $("#errorName").css('visibility', 'visible');
                }
                else{
                    $("#errorName").css('visibility', 'hidden');
                    $('#mv_bookingbundle_form_submit').css('visibility', 'hidden');
                }
            });

            $('#mv_bookingbundle_form_user_'+ index +'_firstName').on('change', function () {
                let inputFirstEn = $('#mv_bookingbundle_form_user_'+ index +'_firstName').val();
                let inputNameEn = $('#mv_bookingbundle_form_user_'+ index +'_name').val();
                if(inputFirstEn.length == 1) {
                    $("#errorFirst").css('visibility', 'visible');
                    $('#mv_bookingbundle_form_submit').css('visibility', 'hidden');
                }
                else if ((inputNameEn.length >1)&& (inputFirstEn.length >1)){
                    $('#mv_bookingbundle_form_submit').css('visibility', 'visible');
                    $("#errorFirst").css('visibility', 'hidden');
                }
                else if (inputFirstEn.length == 0){
                    $('#mv_bookingbundle_form_submit').css('visibility', 'hidden');
                    $("#errorFirst").css('visibility', 'visible');
                }
                else{
                    $("#errorFirst").css('visibility', 'hidden');
                    $('#mv_bookingbundle_form_submit').css('visibility', 'hidden');
                }
            });

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

                    let visitYear = dateOfVisit.getFullYear();
                    let visitMonth = dateOfVisit.getMonth()+1;
                    if(visitMonth<10){
                        visitMonth = parseInt(0 + visitMonth);
                    }
                    let visitDay = dateOfVisit.getDate();

                    let yearDiff = visitYear - year;
                    let monthDiff = visitMonth - month;
                    let dayDiff = visitDay - day;

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
        let toUser = Routing.generate('mv_booking_check', {date: dateUrl});
        let toUserEn = Routing.generate('mv_booking_check', {_locale: 'en', date: dateUrl});
        $('.nextStep').attr('href', toUser);
        $('.nextStepEn').attr('href', toUserEn);
});
