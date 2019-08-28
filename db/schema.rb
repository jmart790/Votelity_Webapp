# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_13_185623) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "approvals", force: :cascade do |t|
    t.boolean "like"
    t.bigint "user_id", null: false
    t.bigint "bill_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bill_id"], name: "index_approvals_on_bill_id"
    t.index ["user_id"], name: "index_approvals_on_user_id"
  end

  create_table "bills", force: :cascade do |t|
    t.string "title"
    t.string "url"
    t.date "outcome_date"
    t.string "outcome"
    t.string "synopsis"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "level"
    t.integer "refid"
  end

  create_table "bills_categories", id: false, force: :cascade do |t|
    t.bigint "bill_id", null: false
    t.bigint "category_id", null: false
  end

  create_table "bills_categories_tmp2", id: false, force: :cascade do |t|
    t.bigint "bill_id", null: false
    t.bigint "category_id", null: false
    t.index ["category_id", "bill_id"], name: "index_bills_categories_on_category_id_and_bill_id"
  end

  create_table "candidates", force: :cascade do |t|
    t.string "ballot_name"
    t.string "election_office"
    t.string "party"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "current_office"
    t.integer "refid"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "refid"
  end

  create_table "profiles", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_profiles_on_email", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.bigint "bill_id", null: false
    t.string "like"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "candidate_id"
    t.index ["bill_id"], name: "index_votes_on_bill_id"
    t.index ["candidate_id"], name: "index_votes_on_candidate_id"
  end

  add_foreign_key "approvals", "bills"
  add_foreign_key "approvals", "profiles", column: "user_id"
  add_foreign_key "votes", "bills"
  add_foreign_key "votes", "candidates"
end
