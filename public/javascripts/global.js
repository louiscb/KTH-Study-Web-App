$(document).ready(function () {
  $('#btnLoginUser').on('click', loginForm);
  $('#btnCreateGroup').on('click', createGroup);
  $('#btnDeleteGroup').on('click', deleteGroup);
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
      groups += '<p> location:' + this.location + '</p>';
      groups += '<p> Description:' + this.description + '</p>';
      groups += '<p> <a href="/groups/list/' + this._id + '"> Click </a></p>';
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

function createGroup() {
  event.preventDefault();

  var newGroup = {
    'subject' : $('#createGroup fieldset input#inputSubject').val(),
    'location' : $('#createGroup fieldset input#inputLocation').val(),
    'description' : $('#createGroup fieldset input#inputDescription').val()
  };

  $.ajax({
    type: 'POST',
    data: newGroup,
    url: '/groups/create',
    dataType: 'JSON'
  }).done(function(response) {
      if (response.msg === 'success') {
        window.location = '/groups/list/' + response.link;
      } else {
        printLoginError(response.msg);
      }
  });
}

function deleteGroup() {
  event.preventDefault();
  var groupId = location.href.substr(location.href.lastIndexOf('/') + 1);

  $.ajax({
    type: 'DELETE',
    url: '/groups/delete/' + groupId
  }).done(function(response) {
      if (response.msg === 'success') {
        window.alert('Group Deleted');
        window.location = '/';
      } else {
        window.alert('You do not have the permissions to delete this group');
      }
  })
}
