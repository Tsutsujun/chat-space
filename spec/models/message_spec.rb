describe Message do
  describe '#save' do

    describe "メッセージを保存できる場合" do
      it "テキストがあれば保存できる。" do
        message = build(:message, image: "")
        expect(message).to be_valid
      end

      it "画像があれば保存できる。" do
        message = build(:message, body: "")
        expect(message).to be_valid
      end
    end

    describe "メッセージを保存できない場合" do

    end

  end
end
