class ChangeValueTypesInBill < ActiveRecord::Migration[6.0]
  def change
    change_column :bills, :outcome, :string 
    change_column :bills, :level, :string
  end
end
