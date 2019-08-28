class RenameColumnInCandidates < ActiveRecord::Migration[6.0]
  def change
    add_column :candidates, :current_office, :string
  end
end
