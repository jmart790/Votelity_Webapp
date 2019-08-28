class CreateBills < ActiveRecord::Migration[6.0]
  def change
    create_table :bills do |t|
      t.string :title
      t.string :url
      t.date :outcome_date
      t.boolean :outcome
      t.string :synopsis

      t.timestamps
    end
  end
end
