function showMenu() {
    $('.content').addClass('hide');
    $('.menu').empty();
    $('.menu').append('<div class="text-center">\
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 dvMenuItem">\
                    <a href="clients.html"><img src="images/1.jpg" class="imgMenuItem" />\
                    <h6 class="txtMenuItem">Clients</h6></a>\
                </div>\
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 dvMenuItem">\
                    <a href="#"><img src="images/1.jpg" class="imgMenuItem" />\
                    <h6 class="txtMenuItem">Providers</h6></a>\
                </div>\
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 dvMenuItem">\
                    <a href="#"><img src="images/1.jpg" class="imgMenuItem" />\
                    <h6 class="txtMenuItem">Plans</h6></a>\
                </div>\
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 dvMenuItem">\
                    <a href="#"><img src="images/1.jpg" class="imgMenuItem" />\
                    <h6 class="txtMenuItem">Calender</h6></a>\
                </div>\
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 dvMenuItem">\
                    <a href="#"><img src="images/1.jpg" class="imgMenuItem" />\
                    <h6 class="txtMenuItem">Settings</h6></a>\
                </div>\
            </div>');
}