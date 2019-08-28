class EditVote < ActiveRecord::Migration[6.0]
  def change
    add_reference :votes, :candidate, index: true, foreign_key: true
    remove_reference :votes, :user, index: true, foreign_key: true
  end
end
