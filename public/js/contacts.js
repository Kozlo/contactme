$( "#contact-us-form" ).submit(function( event ) {
    event.preventDefault();
    var form = this;
    if (!isFormValid(this)) {
        insertErrorMessage(form.id,'Lūdzu aizpildiet visus nepieciešamos laukus.');
        return;
    }
    // disable the order button so no multiple orders can be placed for one product and show the loading gif
    $('#contact-us-form #contact-submit').attr('disabled', true);
    $('#contact-us-form .loader-wrapper').css('visibility', 'visible');
    var data = {
        clientName: form.clientName.value,
        clientEmail: form.clientEmail.value,
        clientPhone: form.clientPhone.value,
        clientNote: form.clientNote.value
    }
    jQuery.ajax({
        type: 'post',
        url: '/new_client_message',
        data: data,
        success: function (data) {
            if (data.success == 1) {
                insertSuccessMessage(form.id,'Ziņa veiksmīgi nosūtīta!');
                form.reset();
                $('#contact-us-form .loader-wrapper').css('visibility', 'hidden');
                $('#contact-us-form #contact-submit').attr('disabled', false);
            } else {
                insertErrorMessage(form.id,data.error);
            }
        },
        failure: function () {
            insertErrorMessage(form.id,'Ir notikusi kļūme, lūdzu mēģiniet vēlreiz.');
        }
    })
});