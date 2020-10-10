FactoryBot.define do
  factory :user do
    name                  {Faker::Name.last_name}
    email
    password
    password_confirmation
  end
end
