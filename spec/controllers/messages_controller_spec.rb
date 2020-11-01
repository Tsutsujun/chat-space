RSpec.describe MessagesController, type: :controller do
  describe 'GET #index' do

    let(:group) { create(:group) }
    let(:user)  { create(:user) }

    context "ログインしていない場合" do
      it "ログイン画面にリダイレクトすること" do
        get :index, params: { group_id: group.id }
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context "ログインしている場合" do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      describe "アクション内で定義しているインスタンス変数に正しい値が入っているか" do
        it "@groupに期待した値が入っていること" do
          expect(assigns(:group)).to eq group
        end

        it "@messageに期待した値が入っていること" do
          expect(assigns(:message)).to be_a_new(Message)
        end

        it "@messagesに期待した値が入っていること" do
          messages = create_list(:message, 3, group: group)
          expect(assigns(:messages)).to match(group.messages)
        end
      end

      it "index.html.hamlに遷移すること" do
        expect(response).to render_template :index
      end
    end

  end

  describe 'POST #create' do

    context "ログインしていない場合" do

    end

    context "ログインしている、且つ保存に成功した場合" do

    end

    context "ログインしている、且つ保存に失敗した場合" do

    end

  end
end
