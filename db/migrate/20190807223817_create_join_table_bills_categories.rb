class CreateJoinTableBillsCategories < ActiveRecord::Migration[6.0]
  def change
    create_join_table :bills, :categories do |t|
      # t.index [:bill_id, :category_id]
      t.index [:category_id, :bill_id]
    end
  end
end
