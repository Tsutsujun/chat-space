# README

## ChatSpace データベース設計

### groupsテーブル
|Column|Type  |Options                  |
|------|------|-------------------------|
|name  |string|null: false, unique: true|
#### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages

### usersテーブル
|Column  |Type  |Options                               |
|--------|------|--------------------------------------|
|name    |string|null: false, unique: true, index: true|
|email   |string|null: false, unique: true, index: true|
|password|string|null: false                           |
#### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

### groups_usersテーブル
|Column|Type      |Options                       |
|------|----------|------------------------------|
|group |references|null: false, foreign_key: true|
|user  |references|null: false, foreign_key: true|
#### Association
- belongs_to :group
- belongs_to :user

### messagesテーブル
|Column       |Type      |Options                                    |
|-------------|----------|-------------------------------------------|
|body         |text      |                                           |
|image        |string    |                                           |
|group_id     |references|null: false, foreign_key: true             |
|group_user_id|references|null: false, foreign_key: true, index: true|
#### Association
- belongs_to :group
- belongs_to :user
