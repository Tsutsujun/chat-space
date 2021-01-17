$(function () {

  function appendUser(user) {
    var html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
  };

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
      if (users.length !== 0) {
        users.forEach(function (user) {

        });
      } else {

      };
    })
    .fail(function () {
      console.log("失敗です。");
    });
  });
});
