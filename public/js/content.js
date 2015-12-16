(function($){
    function fillMainContentFields(content) {
        $('#mainContentId').val(content._id);
        $('#mainPageHeader').val(content.header);
        $('#mainPageText').val(content.pageText);
        $('#companyId').val(content.companyId);
        $('#companyName').val(content.companyName);
        $('#ourPhone').val(content.phone);
        $('#ourEmail').val(content.email);
    }
    // get main content
    $.ajax({
        type: 'post',
        url: '/get_main_content',
        success: function (content) {
            fillMainContentFields(content);
        },
        failure: function () {
            alert('Ir notikusi kļūme ievadod galvenās lapas datus.');
        }
    });
    // change password form
    $("#changePasswordForm" ).submit(function( event ) {
        event.preventDefault();
        var form = this;
        if (!isFormValid(this)) {
            insertErrorMessage(form.id,'Lūdzu aizpildiet visus nepieciešamos laukus.');
            return;
        }
        // disable the order button so no multiple orders can be placed for one product and show the loading gif
        $('#changePasswordForm input:submit').attr('disabled', true);
        $('#changePasswordForm .loader-wrapper').css('visibility', 'visible');
        var data = {
            oldPassword: $(form).find('#oldPassword')[0].value,
            newPassword1: $(form).find('#newPassword1')[0].value,
            newPassword2: $(form).find('#newPassword2')[0].value
        }
        jQuery.ajax({
            type: 'post',
            url: 'change_password',
            data: data,
            success: function (data) {
                if (data.success == 1) {
                    insertSuccessMessage(form.id,'Parole veiksmīgi nomainīta!');
                    $(form).trigger('reset');
                } else {
                    insertErrorMessage(form.id,data.error);
                }
                // enable button and remove loader
                $(form).find('.loader-wrapper').css('visibility', 'hidden');
                $(form).find('input:submit').attr('disabled', false);
            },
            failure: function () {
                insertErrorMessage(form.id,'Ir notikusi kļūme, lūdzu mēģiniet vēlreiz.');
                $(form).find('.loader-wrapper').css('visibility', 'hidden');
                $(form).find('input:submit').attr('disabled', false);
            }
        })
    });
})(jQuery);