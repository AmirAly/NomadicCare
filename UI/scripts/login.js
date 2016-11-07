
$(document).ready(function () {
    footerView();
    $("#frmLogin").validate({
        rules: {
            txtEmail: {
                required: true,
                email: true,
            },
            txtPassword: {
                required: true,
            },

        },
        messages: {
            txtEmail:
                {
                    required: "Please enter your email address",
                    email: "Please enter correct email"
                },
            txtPassword: {
                required: "Please enter your password",
            },

        },
        tooltip_options: {
            psuusername: { placement: 'top' }
        },
        submitHandler: function (form) {
            showMessage("success", "Login ...", "dvLogin");

            navigateTo('clients.html');
        }
    });

});