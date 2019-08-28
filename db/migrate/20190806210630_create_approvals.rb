class CreateApprovals < ActiveRecord::Migration[6.0]
  def change
    create_table :approvals do |t|
      t.boolean :like
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :bill, null: false, foreign_key: true

      t.timestamps
    end
  end
end
