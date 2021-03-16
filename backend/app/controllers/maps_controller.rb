class MapsController < ApplicationController

  # GET /maps
  def index
    maps = Map.all
    render json: maps
  end

  # GET /maps/1
  def show
    # byebug
   map = Map.all.find_by(:id == params["id"].to_i)
   render json:{image: rails_blob_path(map.image, only_path: true), name: map.name}
  end

  # POST /maps
  def create
    @map = Map.create(user_id: decoded_token[0]["user_id"], image: params["image"], name: params["name"])
    if @map.save
      render json: {image: rails_blob_path(@map.image, only_path: true), map: @map}, status: :created
    else
      render json: @map.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /maps/1
  def update
    if @map.update(map_params)
      render json: @map
    else
      render json: @map.errors, status: :unprocessable_entity
    end
  end

  # DELETE /maps/1
  def destroy
    @map.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_map
      @map = Map.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def map_params
      params.permit(:user_id, :image, :name)
    end
end
