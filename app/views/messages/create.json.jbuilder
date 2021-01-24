json.name  @message.user.name
json.date  @message.created_at.strftime("%Y/%m/%d(%a) %T")
json.text  @message.body
json.image @message.image.url
