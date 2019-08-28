class RenameUsersToProfiles < ActiveRecord::Migration[6.0]
  def change
    rename_table :users, :profiles
  end
end
