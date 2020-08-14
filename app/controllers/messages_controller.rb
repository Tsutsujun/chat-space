class MessagesController < ApplicationController

  def index
  end

  def create
    @group = Group.find(params[:group_id])
    Message.create(message_params)
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

end
