class Vote < ApplicationRecord
  belongs_to :candidate
  belongs_to :bill
  
  # enum likes: ["Y", "N", "D", "P", "V", "S", "C"]
end
