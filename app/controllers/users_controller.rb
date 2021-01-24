class UsersController < ApplicationController

  def index
    return nil if (params[:keyword] == "")
    @users = User.search(params[:keyword], current_user)
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end


  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

end
