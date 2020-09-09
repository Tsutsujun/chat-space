class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages

  validates :title, presence: true, uniqueness: true

  def show_last_message
    - unless group.messages.empty?
      = group.messages.last.body.presence || "画像が投稿されています。"
    - else
      まだメッセージはありません。
  end
end
