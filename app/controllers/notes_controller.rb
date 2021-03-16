class NotesController < ApplicationController
 

  # GET /notes
  def index
    # byebug
    @notes = Note.all
    render json: @notes
  end 

  # GET /notes/1
  def show
    noteArray = Note.all.find_all{ |e| e.map_id == params["id"].to_i}
    render json: noteArray
  end

  # POST /notes
  def create
    #  byebug
    params[:user_id] = decoded_token[0]["user_id"]
    @note = Note.new(note_params)

    if @note.save
      render json: @note, status: :created, location: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /notes/1
  def update
    note = Note.all.find_by(id: note_params["id"])
    # byebug

    if note.update(name: params["name"], description: params["description"], visibility: params["visibility"])
      render json: note
    else
      render json: note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes/1
  def destroy
     note = Note.all.find(params["id"].to_i)
     note.destroy
      if note.destroy
          render json: {succes: "remove this note from state"}
      else 
        render json: {error: "the delete was not succesful"} 
     end 
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_note
    #   @note = Note.find(params[:id])
    # end

    # Only allow a trusted parameter "white list" through.
    def note_params
      params.permit(:border, :cursor, :description, :height, :left, :map_id, :name, :position, :top, :width, :user_id, :visibility, :id)
      # params[:user_id] = decoded_token[0]["user_id"]
    end
end
