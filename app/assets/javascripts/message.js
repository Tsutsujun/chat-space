$(function () {

  function buildTopBox_and_Text(message) {
    return `<div class="MessageInfo__TopBox">
              <p class="MessageInfo__TopBox--Name">
                ${message.name}
              </p>
              <p class="MessageInfo__TopBox--Date">
                ${message.date}
              </p>
            </div>
            <p class="MessageInfo--Text">
              ${message.text}
            </p>`;
  };

  function buildHTML(message) {
    if (message.image) {
      // data-message-idが反映されるようにしている
      return `<div class="MessageInfo" data-message-id=${message.id}>
                ${buildTopBox_and_Text(message)}
                <img src=${message.image} class="MessageInfo--Img">
              </div>`;
    } else {
      // 同様にdata-message-idが反映されるようにしている
      return `<div class="MessageInfo" data-message-id=${message.id}>
                ${buildTopBox_and_Text(message)}
              </div>`;
    };
  };

  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data) {
      var html = buildHTML(data);
      $('.MainChat__MessageList').append(html);
      $('.MainChat__MessageList').animate({ scrollTop: $('.MainChat__MessageList')[0].scrollHeight }, 'fast');
      $('form')[0].reset();
    })
    .fail(function () {
      alert("メッセージを入力してください。");
    });
    return false;
  });

  var reloadMessages = function () {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるように文字列を書く
      url: 'api/messages',
      //ルーティングで設定した通りhttpメソッドをGETに指定
      type: 'GET',
      //dataオプションでリクエストに値を含める
      data: { id: last_message_id },
      dataType: 'json'
    })
    .done(function (messages) {
      // 追加するHTMLの入れ物を作る
      var insertHTML = "";
      // 配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物insertHTMLに足し合わせる
      messages.forEach(function (message) {
        insertHTML += buildHTML(message);
      });
    })
    .fail(function () {
      alert("error");
    });
  };

});
