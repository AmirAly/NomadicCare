function topBarView() {
    $('.header').append('<div class=" col-lg-6 col-md-6 col-sm-6 col-xs-6 noPaddingRight" onclick="showMenu()">\
            <span class="glyphicon glyphicon-th listIcon cursorPointer"></span>\
            <span class="pageHeader"></span>\
        </div>\
        <div class="rightHeader col-lg-6 col-md-6 col-sm-6 col-xs-6">\
            <b><span class="userName">Adam Mark</span>&nbsp;|&nbsp;<a href="#">Logout</a></b>\
        </div>');
}

function footerView() {
    $('.footer').append('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left">\
               <h6>© 2016 – 2017</h6>\
          </div>\
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">\
              <h6 class="txtPageFooter"></h6>\
         </div>\
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-right">\
            <img src="images/logo2.png" />\
        </div>');
}
