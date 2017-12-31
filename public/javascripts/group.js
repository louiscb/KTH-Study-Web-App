$(document).ready(function () {
  displayComments();
});

function displayComments() {
  var comments = '';
  var groupId = location.href.substr(location.href.lastIndexOf('/') + 1);

  $.getJSON('/groups/comments/' + groupId, function (data) {
    $.each(data, function() {
      comments += '<div id="single-comment">';
      comments += '<p>' + this.subject + ': ' + this.msg + '</p>';
      comments += '</div>';
    });

    $('#comments').html(groups);
  });
}
