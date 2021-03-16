class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def create
    # byebug
    user = User.create(user_params)
    if user.valid?
      my_token = encode_token({user_id: user.id})
      render json: {id: user.id, token: my_token}
    else 
      # render json: {error: "please try another user and password" }
    end
    
  end

  private

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.permit(:username, :password)
    end
end
