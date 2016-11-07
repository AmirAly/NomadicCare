var clientId = getParameterByName("clientId");;
// Upload image & convert to base64
var BaseImg64 = '';
function UploadImage() {
    $('#imgClient').attr('src', BaseImg64);
}

function convertImgToBase64URL(event) {
    var filesSelected = document.getElementById("uploadClientImage").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            BaseImg64 = fileLoadedEvent.target.result;
            UploadImage();
        };

        fileReader.readAsDataURL(fileToLoad);
    }
}

$(document).ready(function () {
    topBarView();
    footerView();
    if (clientId != "") //View - Edit mode needs data to be loaded first
    {
        $('.pageHeader').append('&nbsp;Mark Adam&nbsp;<img src="images/2.jpg">');
    }
    else { // create Mode
        $('.pageHeader').append('&nbsp;Create Client');
    }

});

function addClient() {
    if (clientId != "") // Edit mode
    {
        $("#frmAddClient").validate({
            rules: {
                txtEmail: {
                    required: true,
                    email: true,
                },
                txtClientName: {
                    required: true,
                },
                txtLastName: {
                    required: true,
                },
                txtPhone: {
                    required: true,
                },
                txtDob: {
                    required: true,
                },
                cmbGender: {
                    required: true,
                    //value:
                },
                txtBloodType: {
                    required: true
                }

            },
            messages: {
                txtEmail:
                    {
                        required: "Please enter email address",
                        email: "Please enter correct email"
                    },
                txtClientName: {
                    required: "Please enter client name",
                },
                txtLastName: {
                    required: "Please enter last name",
                },
                txtPhone: {
                    required: "Please enter mobile number",
                },
                txtDob: {
                    required: "Please enter date of bith",
                },
                cmbGender: {
                    required: "Please choose gender",
                },
                txtBloodType: {
                    required: "Please choose blood type",
                }

            },

            submitHandler: function (form) {
                if (BaseImg64 == '') {
                    BaseImg64 = 'images/unknown.png';
                }
                var _Gender
                if ($('#cmbGender').val() == 0) {
                    _Gender = "Male";
                }
                //var _Url = APILink + '/Patient/Create';
                //var _Type = "post";
                //var _Data = {
                //    'Firstname': $('#txtClientName').val(),
                //    'Lastname': $('#txtLastName').val(),
                //    'Photo': BaseImg64,
                //    'Gender': _Geder,
                //    'MobilePhone': $('#txtPhone').val(),
                //    'DateOfBirth': $('#txtDob').val(),
                //    'Email': $('#txtEmail').val(),
                //    'BloodType': $('#txtBloodType').val(),
                //    'Coordinator': '569ccfa67e07b150080c5da2'
                //};

            }
        });
    }

    else { // create Mode
        $("#frmAddClient").validate({
            rules: {
                txtEmail: {
                    required: true,
                    email: true,
                },
                txtClientName: {
                    required: true,
                },
                txtLastName: {
                    required: true,
                },
                txtPhone: {
                    required: true,
                },
                txtDob: {
                    required: true,
                },
                cmbGender: {
                    required: true,
                    //value:
                },
                txtBloodType: {
                    required: true
                }

            },
            messages: {
                txtEmail:
                    {
                        required: "Please enter email address",
                        email: "Please enter correct email"
                    },
                txtClientName: {
                    required: "Please enter client name",
                },
                txtLastName: {
                    required: "Please enter last name",
                },
                txtPhone: {
                    required: "Please enter mobile number",
                },
                txtDob: {
                    required: "Please enter date of bith",
                },
                cmbGender: {
                    required: "Please choose gender",
                },
                txtBloodType: {
                    required: "Please choose blood type",
                }

            },

            submitHandler: function (form) {
                if (BaseImg64 == '') {
                    BaseImg64 = 'images/unknown.png';
                }
                var _Gender
                if ($('#cmbGender').val() == 0) {
                    _Gender = "Male";
                }
                //var _Url = APILink + '/Patient/Create';
                //var _Type = "post";
                //var _Data = {
                //    'Firstname': $('#txtClientName').val(),
                //    'Lastname': $('#txtLastName').val(),
                //    'Photo': BaseImg64,
                //    'Gender': _Geder,
                //    'MobilePhone': $('#txtPhone').val(),
                //    'DateOfBirth': $('#txtDob').val(),
                //    'Email': $('#txtEmail').val(),
                //    'BloodType': $('#txtBloodType').val(),
                //    'Coordinator': '569ccfa67e07b150080c5da2'
                //};

            }
        });
    }
}

function clearClient() {
    // clear all text
    $('#txtClientName').val('');
    $('#txtLastName').val('');
    $('#txtDob').val('');
    $('#txtPhone').val('');
    $('#txtEmail').val('');
    $('#txtBloodType').val('');
    $('#cmbType').val(0);
    $('#imgClient').attr('src', 'images/unknown.png');
    $('#dvMSG').addClass('hideMe');
}

function cancelClient() {
    if (clientId != "") { // Edit mode
        var r = confirm("Are you sure you want to cancel editing client?");
        if (r == true) {
            var validator = $("#frmAddClient").validate();
            validator.resetForm();
            clearClient();
        }
        else {
        }
    }
    else {
        var r = confirm("Are you sure you want to cancel adding client?");
        if (r == true) {
            var validator = $("#frmAddClient").validate();
            validator.resetForm();
            clearClient();
        }
        else {
        }
    }

}