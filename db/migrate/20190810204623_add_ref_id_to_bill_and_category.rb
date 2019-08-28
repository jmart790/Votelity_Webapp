class AddRefIdToBillAndCategory < ActiveRecord::Migration[6.0]
  def change
    add_column :categories, :refid, :integer
    add_column :bills, :refid, :integer

  end
end
