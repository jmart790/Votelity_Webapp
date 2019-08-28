class Candidate < ApplicationRecord
  has_many :votes, dependent: :destroy
  has_many :bills, through: :votes
end
