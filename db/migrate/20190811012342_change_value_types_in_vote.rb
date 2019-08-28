class ChangeValueTypesInVote < ActiveRecord::Migration[6.0]
  def change
    change_column :votes, :like, :string
  end
end
