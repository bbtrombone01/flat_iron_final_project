class Map < ApplicationRecord
    belongs_to :user
    has_many :notes
    has_one_attached :image
end
