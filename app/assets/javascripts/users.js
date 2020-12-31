$(function () {

  $('#user_search').on('keyup', function () {
    var input = $(this).val();
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json'
    })
  });
});
