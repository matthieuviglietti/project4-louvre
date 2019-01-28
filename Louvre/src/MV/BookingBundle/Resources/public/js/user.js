$(function(){
    var sessionKey = $('.sessionKey').text();
    $('.session').val(sessionKey).hide();
    $('.session ~ label').hide();
    var nbr = $('strong').text();
    nbr = parseInt(nbr);

    var day ="";
    var month ='';
    var year = '';
   
    var dateOfTheDay = new Date();
    var limitHalfTicket = dateOfTheDay.getHours();
   
    var dateUrl = $('#dateofvisit').text();
    var dateOfVisit = new Date(dateUrl);
    $('#dateofvisit').hide();
    
    console.log(dateOfVisit);

        $('select').slice(0, nbr).each(function(index){

        $('.date').attr('value', dateUrl);//.attr('disabled', 'disabled');

        //Hide ticket choice before changing birthdate
        $('#mv_bookingbundle_form_user_'+ index +'_ticket').hide();
        $('label[for="mv_bookingbundle_form_user_'+ index +'_ticket"]').hide();    
        $('#mv_bookingbundle_form_user_'+ index +'_birthDate_year').on("change",function(){
            $('#mv_bookingbundle_form_user_'+ index +'_ticket').val('');
            $('label[for= "mv_bookingbundle_form_user_'+ index +'_ticket"]').show(); 
            $('#mv_bookingbundle_form_user_'+ index +'_ticket').show();
        });

        //All ages conditions
           
            if(limitHalfTicket>14){
               $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
               $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
               $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
               $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
               $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
            }

            $('#mv_bookingbundle_form_user_'+ index +'_birthDate').on("change", function(){
                day = parseInt($('#mv_bookingbundle_form_user_'+ index +'_birthDate_day').val());
                month = parseInt($('#mv_bookingbundle_form_user_'+ index +'_birthDate_month').val());
                year = parseInt($('#mv_bookingbundle_form_user_'+ index +'_birthDate_year').val());

                var selectedDate = new Date(month +'-'+ day +'-'+ year);
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
                
                //4years conditions

                    if((yearDiff < 4) && (limitHalfTicket>14)){ //under 4 and limit halfDay past
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                    }
                    if((yearDiff < 4) && (limitHalfTicket<14)){ //under 4 and limit halfDay not past
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
                    }
                    if((yearDiff === 4) && (limitHalfTicket<14)){ //on his 4th year and limit halfDay not past
                        if(monthDiff<0){ // is under 4
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
                        }
                        else if(monthDiff>0) // is under 12
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
                    }
                    if((yearDiff === 4) && (limitHalfTicket>14)){ // on his 4th year and limit past
                        if(monthDiff<0){ // is under 4
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                        }
                        else if(monthDiff>0){ //is under 12
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                        }
                    }
                    if((yearDiff === 4) && (monthDiff === 0) && (limitHalfTicket>14)){ // on his 4th year and limit past
                        if(dayDiff<0){ // is under 4
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                        }
                        else if(dayDiff>0){ //is under 12
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                        }
                    }
                    else if((yearDiff === 4) && (monthDiff === 0) && (limitHalfTicket<14)){ //on his 4th year and limit halfDay not past
                        if(dayDiff<0){ // is under 4
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
                        }
                        else if(monthDiff>0) // is under 12
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
                    }


                    //12 years conditions

                    if((yearDiff < 12) && (yearDiff >4) && (limitHalfTicket>14)){
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                    }
                    if((yearDiff < 12) && (yearDiff >4) && (limitHalfTicket<14)){
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
                    }
                    if((yearDiff === 12) && (limitHalfTicket<14)){ //on his 12ve year and limit halfDay not past
                        if(monthDiff<0){ // is under 12
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                        }
                        else if(monthDiff>0){ // is adult
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
                        }
                    }
                    if((yearDiff === 12) && (limitHalfTicket>14)){ // on his 4th year and limit past
                        if(monthDiff<0){ // is under 12
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                        }
                        else if(monthDiff>0){ //is an adult
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').show();
                        }
                    }
                    if((yearDiff === 12) &&(monthDiff === 0) && (limitHalfTicket<14)){ //on his 12ve year and limit halfDay not past
                        if(dayDiff<0){ // is under 12
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                        }
                        else if(dayDiff>0){ // is adult
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
                        }
                    }
                    if((yearDiff === 12) && (monthDiff === 0) && (limitHalfTicket>14)){ // on his 4th year and limit past
                        if(dayDiff<0){ // is under 12
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').hide();
                        }
                        else if(dayDiff>0){ //is an adult
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').show();
                        }
                    }

                    //adult conditions

                    if((yearDiff < 60) && (yearDiff >12) && (limitHalfTicket>14)){
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').show();
                    }
                    if((yearDiff < 60) && (yearDiff >12) && (limitHalfTicket<14)){
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
                    }
                    //60 years conditions

                    if((yearDiff > 60) && (limitHalfTicket>14)){
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').show();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                        $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').show();
                    }
                    if((yearDiff > 60) && (limitHalfTicket<14)){
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
                    }
                    if((yearDiff === 60) && (limitHalfTicket<14)){ //on his 12ve year and limit halfDay not past
                        if(monthDiff<0){ // is under 60
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
                        }
                        else if(monthDiff>0){ // is over 60
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
                        }
                    }
                    if((yearDiff === 60) && (limitHalfTicket>14)){ // on his 4th year and limit past
                        if(monthDiff<0){ // is under 60
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').show();
                        }
                        else if(monthDiff>0){ //is over 60
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').show();
                        }
                    }
                    if((yearDiff === 12) && (monthDiff === 0) && (limitHalfTicket<14)){ //on his 12ve year and limit halfDay not past
                        if(dayDiff<0){ // is under 60
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
                        }
                        else if(dayDiff>0){ // is over 60
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
                        }
                    }
                    if((yearDiff === 12) && (monthDiff === 0) && (limitHalfTicket>14)){ // on his 4th year and limit past
                        if(dayDiff<0){ // is under 60
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').show();
                        }
                        else if(dayDiff>0){ //is over 60
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=1]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=2]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=3]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=4]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=5]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=6]').show();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=7]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=8]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=9]').hide();
                            $('#mv_bookingbundle_form_user_'+ index +'_ticket option[value=10]').show();
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
