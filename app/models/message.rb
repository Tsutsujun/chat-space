class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :body, presence: true, unless: :image?

  mount_uploader :image, ImageUploader

  def show_datetime
    created_at.strftime("%Y/%m/%d(%a) %T")
  end
end
