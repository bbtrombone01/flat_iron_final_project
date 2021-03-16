class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.integer :left
      t.integer :top
      t.integer :user_id
      t.integer :map_id
      t.string :height
      t.string :position
      t.string :width
      t.string :border
      t.string :cursor
      t.string :name
      t.string :description
      t.string :visibility
      t.timestamps
    end
  end
end
