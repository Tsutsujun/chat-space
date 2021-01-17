$(function () {

  $('#user_search').on('keyup', function () {
    var input = $(this).val();
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function (users) {
      $('#user-search-result').empty();
    })
    .fail(function () {
      console.log("失敗です。");
    });
  });
});
