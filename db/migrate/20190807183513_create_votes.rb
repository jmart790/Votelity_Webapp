class CreateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :votes do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :bill, null: false, foreign_key: true
      t.integer :like

      t.timestamps
    end
  end
end
