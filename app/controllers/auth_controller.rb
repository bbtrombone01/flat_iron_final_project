class AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]
    
   # have to make username or password unique and check by that param 
    def create
        user = User.find_by(username: params[:username])
            if user.authenticate(params[:password])
                my_token = encode_token({user_id: user.id})
                render json: {token: my_token}
            else 
                # byebug
                render json: {error: 'That user could not be found'}, status: 401
            end 
    end 
end
