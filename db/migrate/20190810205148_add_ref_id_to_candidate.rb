class AddRefIdToCandidate < ActiveRecord::Migration[6.0]
  def change
    add_column :candidates, :refid, :integer

  end
end
