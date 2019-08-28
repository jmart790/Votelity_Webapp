class CreateCandidates < ActiveRecord::Migration[6.0]
  def change
    create_table :candidates do |t|
      t.string :ballot_name
      t.string :election_office
      t.string :party
      t.string :status

      t.timestamps
    end
  end
end
