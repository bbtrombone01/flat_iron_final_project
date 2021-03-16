class User < ApplicationRecord
    validates :username, presence: true
    has_many :characters
    has_many :maps
    has_many :notes
    has_secure_password
    has_many :notes 
    has_many :maps, through: :notes
end
