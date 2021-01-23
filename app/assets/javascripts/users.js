$(function () {

  function addUser(user) {
    var html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
    $('#user-search-result').append(html);
  };

  function addNoUser(msg) {
    var html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`;
    $('#user-search-result').append(html);
  };

  function addChatMember(user_id, user_name) {
    var html = `<div class="chat-group-user">
                  <input name="group[user_ids][]" type="hidden" value="${user_id}">
                  <p class="chat-group-user__name">${user_name}</p>
                  <a class="chat-group-user__btn chat-group-user__btn--remove">削除</a>
                </div>`;
    $('#chat-group-users').append(html);
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
          addUser(user);
        });
      } else if (input.length !== 0) {
        addNoUser("一致するユーザーが見つかりません");
      } else {
        return false;
      };
    })
    .fail(function () {
      alert("ユーザー検索に失敗しました");
    });
  });

  $('#user-search-result').on('click', '.chat-group-user__btn--add', function () {
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    $(this).parent().remove();
    addChatMember(user_id, user_name);
  });

  $('#chat-group-users').on('click', '.chat-group-user__btn--remove', function () {
    console.log("イベント発火成功");
  });

});
