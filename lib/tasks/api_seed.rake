# lib/tasks/seed.rake
desc "Run all files in db/seeds directory"

namespace :db do
  task api_seed: :environment do
    # Dir[File.join(Rails.root, 'db', 'api_seed.rb')].each do |filename|
    #   p "seeding #{filename}"
    load("#{Rails.root}/db/api_seed.rb")
    # end
  end
end