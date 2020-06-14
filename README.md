# README

## ChatSpace データベース設計

### usersテーブル
|Column  |Type  |Options                               |
|--------|------|--------------------------------------|
|username|string|null: false, unique: true, index: true|
|email   |string|null: false, unique: true, index: true|
|password|string|null: false                           |
#### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
