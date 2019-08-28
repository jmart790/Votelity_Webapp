class Category < ApplicationRecord
  has_and_belongs_to_many :bills
  POPULAR = [
    'Abortion',
    'Education',
    'Energy & Environment',
    'Foreign Affairs',
    'Guns',
    'Health and Health Care',
    'Immigration',
    'Marijuana Legalization',
    'Sexual Orientation and Gender Identity',
    'Unemployed and Low-Income'
  ]
end
