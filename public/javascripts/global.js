$(document).ready(function () {
  $('#btnLoginUser').on('click', loginForm);
});

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
  });
}
