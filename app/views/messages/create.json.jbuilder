json.id    @message.id
json.name  @message.user.name
json.text  @message.body
json.image @message.image.url
json.date  @message.created_at.strftime("%Y/%m/%d(%a) %T")
