$(function () {

  function buildHTML(message) {
    if (message.image) {
      return
        `<div class="MessageInfo">
          <div class="MessageInfo__TopBox">
            <p class="MessageInfo__TopBox--Name">
              ${message.name}
            </p>
            <p class="MessageInfo__TopBox--Date">
              ${message.time}
            </p>
          </div>
          <p class="MessageInfo--Text">
            ${message.text}
          </p>
          <img src=${message.image} class="MessageInfo--Img">
        </div>`;
    } else {
      return
        `<div class="MessageInfo">
          <div class="MessageInfo__TopBox">
            <p class="MessageInfo__TopBox--Name">
              ${message.name}
            </p>
            <p class="MessageInfo__TopBox--Date">
              ${message.time}
            </p>
          </div>
          <p class="MessageInfo--Text">
            ${message.text}
          </p>
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
  });
});
