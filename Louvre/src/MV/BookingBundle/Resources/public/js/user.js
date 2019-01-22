$(function(){
    var sessionKey = $('.sessionKey').text();
    $('.session').val(sessionKey).hide();

    $('.session ~ label').hide();
});
