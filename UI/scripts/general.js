// general js file

var currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
var userType = localStorage.getItem('UserType');

jQuery(document).on("mobileinit", function () {
    jQuery.mobile.autoInitializePage = false;
});
$(document).ready(function () {
    $('body').fadeIn(400);
    $('#btnLogout').click(function () {
        localStorage.clear();
        navigateTo('index.html');
    });
});
function navigateTo(_url) {
    $("body").fadeOut(400, function () {
        window.location.href = _url;
    });
    return;
}
function showMessage(_Type, _Text, _TabId) {
    $('#' + _TabId).find('#dvMSG:first').removeClass('alert-warning');
    $('#' + _TabId).find('#dvMSG:first').removeClass('alert-danger');
    $('#' + _TabId).find('#dvMSG:first').removeClass('alert-success');
    $('#' + _TabId).find('#dvMSG:first').removeClass('hideMe');
    $('#' + _TabId).find('#dvMSG:first').addClass('alert-' + _Type);
    $('#' + _TabId).find('#spTXT:first').text(_Text);
    $('html, body').animate({
        scrollTop: $("#spTXT").offset().top
    }, 1000);
}

//Get URL Parameters
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
