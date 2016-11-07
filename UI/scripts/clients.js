function filter() {
    $('#dvNoResult').addClass('hide');
    var phrase = $('.txtSearchClients').val();
    var count = 0;
    $('.filterable .clientName').each(function () {
        if ($(this).html().toLowerCase().indexOf(phrase) < 0) {
            $(this).parent().parent().hide();
        }
        else {
            $(this).parent().parent().show(200);
            count++;
        }
    });
    if (count==0) {
        $('#dvNoResult').removeClass('hide');
    }
}

$(document).ready(function () {
    topBarView();
    footerView();
});