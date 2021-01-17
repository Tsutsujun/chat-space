$(function () {

  function appendUser(user) {
    var html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
    return html;
  };

  function appendErrMsg(msg) {
    var html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`;
    return html;
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
          var html = appendUser(user);
          console.log(html);
        });
      } else {
        var html = appendErrMsg("一致するユーザーが見つかりません");
        console.log(html);
      };
    })
    .fail(function () {
      console.log("失敗です。");
    });
  });
});
