describe Message do
  describe '#save' do

    describe "メッセージ(message)を保存できる場合" do
      it "テキスト(body)があれば保存できること" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end

      it "画像(image)があれば保存できること" do
        message = build(:message, body: "")
        expect(message).to be_valid
      end

      it "テキスト(body)と画像(image)が両方あれば保存できること" do
        message = build(:message)
        expect(message).to be_valid
      end
    end

    describe "メッセージ(message)を保存できない場合" do
      it "テキスト(body)と画像(image)が両方とも無かったら保存できないこと" do
        message = build(:message, body: "", image: nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end
    end

  end
end
