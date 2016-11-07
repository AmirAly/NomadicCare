$(document).ready(function () {
    topBarView();
    footerView();

    //topbar
    $('.pageHeader').append('&nbsp;Mark Adam&nbsp;<img src="images/2.jpg">');

    //footer
    $('.txtPageFooter').append('Health Record > Care Plan');
});

//Add new tab
function addNewTab() {
    $('.tab-content').append('<div class="row tab-pane active" id="Tab10">\
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                                <button type="button" class="close" data-dismiss="">&times;</button>\
                                <div class="row">\
                                    <div class=" input-group-lg col-md-12 col-sm-12 col-xs-12">\
                                        <input type="text" name="txtClientName" id="txtClientName" class="input-form" placeholder="What to improve">\
                                    </div>\
                                </div>\
                                <div class="row">\
                                    <div class="col-md-6 col-sm-6 col-xs-6">\
                                        <div class="row">\
                                            <div class=" input-group-lg col-md-12 col-sm-12 col-xs-12">\
                                                <input type="text" name="txtClientName" id="txtClientName" class="input-form" placeholder="What to acheive">\
                                            </div>\
                                        </div>\
                                        <div class="row">\
                                            <div class="input-group-lg col-md-12 col-sm-12 col-xs-12">\
                                                <input type="text" name="txtLastName" id="txtLastName" class="input-form" placeholder="Actions to take">\
                                            </div>\
                                        </div>\
                                        <div class="row">\
                                            <div class=" input-group-lg col-md-12 col-sm-12 col-xs-12">\
                                                <input type="text" name="txtClientName" id="txtClientName" class="input-form" placeholder="By who">\
                                            </div>\
                                        </div>\
                                        <div class="row">\
                                            <div class="input-group-lg col-md-12 col-sm-12 col-xs-12">\
                                                <input type="text" name="txtLastName" id="txtLastName" class="input-form" placeholder="By when">\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="col-md-6 col-sm-6 col-xs-6">\
                                        <div class="row">\
                                            <div class=" input-group-lg col-md-12 col-sm-12 col-xs-12">\
                                                <input type="text" name="txtClientName" id="txtClientName" class="input-form" placeholder="What to acheive">\
                                            </div>\
                                        </div>\
                                        <div class="row">\
                                            <div class="input-group-lg col-md-12 col-sm-12 col-xs-12">\
                                                <input type="text" name="txtLastName" id="txtLastName" class="input-form" placeholder="Actions to take">\
                                            </div>\
                                        </div>\
                                        <div class="row">\
                                            <div class=" input-group-lg col-md-12 col-sm-12 col-xs-12">\
                                                <input type="text" name="txtClientName" id="txtClientName" class="input-form" placeholder="By who">\
                                            </div>\
                                        </div>\
                                        <div class="row">\
                                            <div class="input-group-lg col-md-12 col-sm-12 col-xs-12">\
                                                <input type="text" name="txtLastName" id="txtLastName" class="input-form" placeholder="By when">\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>');
}

//Delete Plan
function deletePlan(_id) {
    var r = confirm("Are you sure you want to delete plan?");
    if (r == true) {
        //content
        $('#Tab1').hide();

    }
    else {
    }
}