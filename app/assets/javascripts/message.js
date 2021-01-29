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
      return `<div class="MessageInfo" data-message-id=${message.id}>
                ${buildTopBox_and_Text(message)}
                <img src=${message.image} class="MessageInfo--Img">
              </div>`;
    } else {
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
    var last_message_id = $('.MessageInfo:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      data: { id: last_message_id },
      dataType: 'json'
    })
    .done(function (messages) {
      if (messages.length !== 0) {
        var insertHTML = "";
        messages.forEach(function (message) {
          insertHTML += buildHTML(message);
        });
        $('.MainChat__MessageList').append(insertHTML);
        $('.MainChat__MessageList').animate({ scrollTop: $('.MainChat__MessageList')[0].scrollHeight }, 'fast');
      };
    })
    .fail(function () {
      alert("error");
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  };
});
