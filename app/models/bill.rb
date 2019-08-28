class Bill < ApplicationRecord
  has_and_belongs_to_many :categories
  has_many :votes, dependent: :destroy
  has_many :candidate, through: :votes
  # enum levels: ['executive', 'senate', 'house']
end
