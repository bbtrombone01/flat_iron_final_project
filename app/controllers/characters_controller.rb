class CharactersController < ApplicationController
before_action :character_params 

  # GET /characters
  def index
    users_character_array = Character.all.find_all{ |c| c.user_id == decoded_token[0]["user_id"]}
    render json: users_character_array
  end

  def show 
    character = Character.all.find_all{ |c| c.id  == params[:id].to_i}
    # byebug
    render json: character[0]
  end 

  # POST /characters
  def create

    newCharacter = Character.create(name: character_params["name"], description: character_params["description"], user_id: decoded_token[0]["user_id"] )
    # byebug
    if newCharacter.save
      render json: newCharacter, status: :created, location: newCharacter
    else
      render json: newCharacter.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /characters/1
  def update
    character = Character.all.find(params["user_id"])
   

    if character.update(description: character_params["description"], name: character_params["name"])
      render json: character
    else
      render json: character.errors, status: :unprocessable_entity
    end
  end

  # DELETE /characters/1
  def destroy
    character =Character.all.find(params["id"].to_i)
    character.destroy
      if character.destroy
        render json: {succes: "push to view page"}
      else
        render json: {error: "do not push to view page"}
      end 
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_character
    #   newCharacter = Character.find(params[:id])
    # end

    # Only allow a trusted parameter "white list" through.
    def character_params
      params.permit(:user_id, :name, :description)
    end
end
