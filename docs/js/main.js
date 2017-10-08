$(document).ready(function () {
    $("#numberVerification").hide();
    $("#successAlert").hide();
    $("#verifiedAlert").hide();
    $("#errorVerifiedAlert").hide();
    $(".alert").alert();
})

var verificationNumber = 0;

function sendVerificationMessage() {
    var SID = "ACfcc6c7984be14c54414ae757245fe958"
    var Key = "52652fda5d5b996ccbed5f4e2534d588"

    var numberTo = $("#phoneNum").val();
    verificationNumber = genRand();

    $.ajax({
        type: 'POST',
        url: 'https://api.twilio.com/2010-04-01/Accounts/' + SID + '/Messages.json',
        data: {
            "To": numberTo,
            "From": "+441877221043",
            "Body": "You have just logged on through our GrassRoots platform.\nPlease enter the following number to verify your account: " + verificationNumber
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(SID + ':' + Key));
        },
        success: function (data) {
            console.log(data);
            hidePhoneDisplayVerification();
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function hidePhoneDisplayVerification() {
    $("#registration").hide();
    $("#successAlert").show();
    $("#numberVerification").show();
}

function validate() {
    var enteredValue = $("#number").val();

    if (enteredValue == verificationNumber)
    {
        $("#successAlert").hide();
        $("#verifiedAlert").show();
    }
    else {
        $("#successAlert").hide();
        $("#verifiedAlert").hide();
        $("#errorVerifiedAlert").show();
    }
}

function genRand() {
      return Math.floor(Math.random()*89999+10000);
}