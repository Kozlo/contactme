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
    })
})(jQuery);