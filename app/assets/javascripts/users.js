$(function () {

  function appendUser(user) {
    var html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
    $('#user-search-result').append(html);
  };

  function appendErrMsg(msg) {
    var html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`;
    $('#user-search-result').append(html);
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
          appendUser(user);
        });
      } else if (input !== "") {
        appendErrMsg("一致するユーザーが見つかりません");
      };
    })
    .fail(function () {
      alert("ユーザー検索に失敗しました");
    });
  });
});
