$(document).ready(function () {
  $('#btnLoginUser').on('click', loginForm);
  listGroups();
});

function listGroups() {
  var groups = '';

  $.getJSON('/groups/list', function (data) {
    $.each(data, function() {
      groups += '<div id="single-group">';
      groups += '<p> Subject: ' + this.subject + '</p>';
      groups += '<p> Group Owner: ' + this.owner + '</p>';
      groups += '<p> Number of members:' + this.numOfParticipants + '</p>';
      groups += '<p> Created:' + this.timeStamp + '</p>';
      groups += '<p> Description:' + this.description + '</p>';
      groups += '</div>';
    });
    $('#groups').html(groups);
  });
}

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
