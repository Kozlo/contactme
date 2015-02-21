(function($){
    function MessageRow(message) {
        this.messageId = message._id;
        this.name = message.name;
        this.email = message.email;
        this.phone = message.phone;
        this.note = message.note;
        this.status = message.status;
    }
    MessageRow.prototype = {
        generateRowHtml: function() {
            var html = '';
            if (this.status) {
                html += '<tr class="success">';
            } else {
                html += '<tr class="danger">';
            }
                html += '<td>' + this.name + '</td>';
                html += '<td>' + this.email + '</td>';
                html += '<td>' + this.phone + '</td>';
                html += '<td>' + this.note + '</td>';
                html += '<td>';
                if (this.status) {
                    html += 'atbildēts';
                } else {
                    html += '<form action="/process_message" method="post" role="form">';
                        html += '<input style="display:none" type="text" name="messageId" value="' + this.messageId + '">';
                        html += '<input class="btn btn-success" type="submit" value="Apstiprināt"/>';
                    html += '</form>';
                }
                html += '</td>';

                html += '<td>';
                    html += '<form action="/delete_message" method="post" role="form">';
                        // might replace with with 'cancel' to see all orders
                        html += '<input style="display:none" type="text" name="messageId" value="' + this.messageId + '">';
                        html += '<input class="btn btn-danger" type="submit" value="Izdzēst"/>';
                    html += '</form>';
                html += '</td>';
            html += '</tr>';

            return html;
        }
    }
    // get all orders
    $.ajax({
        type: 'post',
        url: '/get_all_messages',
        success: function (messages) {
            for (var i=messages.length; i > 0; i--) {
                var messageRow = new MessageRow(messages[i-1]);
                // insert the order row after the last table row
                $(messageRow.generateRowHtml()).insertAfter($('#messages-table tr').last());
            }
        },
        failure: function () {
            alert('Ir notikusi kļūme.');
        }
    })
})(jQuery);