# README

## ChatSpace データベース設計

### groupsテーブル
|Column|Type  |Options                  |
|------|------|-------------------------|
|title |string|null: false, unique: true|
#### Association
- has_many :group_users
- has_many :users, through: :group_users
- has_many :messages

### usersテーブル
|Column            |Type  |Options                               |
|------------------|------|--------------------------------------|
|name              |string|null: false, unique: true, index: true|
|email             |string|null: false, unique: true, index: true|
|encrypted_password|string|null: false                           |
#### Association
- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

### group_usersテーブル
|Column|Type      |Options                       |
|------|----------|------------------------------|
|group |references|null: false, foreign_key: true|
|user  |references|null: false, foreign_key: true|
#### Association
- belongs_to :group
- belongs_to :user

### messagesテーブル
|Column|Type      |Options                       |
|------|----------|------------------------------|
|body  |text      |                              |
|image |string    |                              |
|group |references|null: false, foreign_key: true|
|user  |references|null: false, foreign_key: true|
#### Association
- belongs_to :group
- belongs_to :user
