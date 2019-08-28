class AddLevelToBills < ActiveRecord::Migration[6.0]
  def change
    add_column :bills, :level, :integer
  end
end
