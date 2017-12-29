$(document).ready(function () {
  $('#btnLoginUser').on('click', loginForm);
});

function printLoginError(msg) {
  $('#errorMsg h2').html(msg);
}

function loginForm() {
  event.preventDefault();

  var loginUser = {
    'email' : $('#loginForm fieldset input#inputUserEmail').val(),
    'password' : $('#loginForm fieldset input#inputUserPassword').val()
  };

  $.ajax({
    type: 'POST',
    data: loginUser,
    url: '/login',
    dataType: 'JSON'
  }).done(function(response) {
      if (response.msg === 'success') {
        window.location = '/';
      } else {
        printLoginError(response.msg);
      }
  });
}
