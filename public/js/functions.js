// Check for required fields and add error class is they are empty
function isFormValid(form) {
    var isValid = true;
    var requiredFields = jQuery(form).find('.is-required');
    for (var i=0; i<requiredFields.length; i++) {
        var fieldValue = requiredFields[i].value;
        if (fieldValue.length <= 0) {
            isValid = false;
            jQuery(requiredFields[i]).closest('.form-group').addClass('has-error');
        }
    }
    return isValid;
}
// insert error message in the closes error-success message holder
function insertErrorMessage(formId, errorMsg) {
    var errorContainer =
        '<div class="alert alert-danger alert-dismissible" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            errorMsg +
        '</div>';
    jQuery('#'+formId).find('.success-error-msg-holder').append(jQuery.parseHTML(errorContainer));
}
// insert success message in the closes error-success message holder
function insertSuccessMessage(formId, successMsg) {
    var errorContainer =
        '<div class="alert alert-success alert-dismissible" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            successMsg +
        '</div>';
    jQuery('#'+formId).find('.success-error-msg-holder').append(jQuery.parseHTML(errorContainer));
}
// listen when a required input is typed into, remove the error class if it has it
jQuery('.is-required').on( 'keypress', function() {
    jQuery(this).closest('.form-group').removeClass('has-error');
});
// replace all line breaks with br tags and carriage returns with paragraphs
function createTextHtml(text) {
    var result = "<p>" + text + "</p>";
    result = result.replace(/\r\n\r\n/g, "</p><p>").replace(/\n\n/g, "</p><p>");
    result = result.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />");
    return result;
}