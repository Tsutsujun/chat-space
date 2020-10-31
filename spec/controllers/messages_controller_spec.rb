RSpec.describe MessagesController, type: :controller do
  describe 'GET #index' do

    context "ログインしている場合" do
      describe "アクション内で定義しているインスタンス変数に正しい値が入っているか" do
        it "@groupに期待した値が入っていること" do
          user  = create(:user)
          group = create(:group)
          login user
          get :index, params: { group_id: group.id }
          expect(assigns(:group)).to eq group
        end

        it "@messageに期待した値が入っていること" do
          user  = create(:user)
          group = create(:group)
          login user
          get :index, params: { group_id: group.id }
          expect(assigns(:message)).to be_a_new(Message)
        end

        it "@messagesに期待した値が入っていること" do
          user  = create(:user)
          group = create(:group)
          messages = create_list(:message, 3, group: group)
          login user
          get :index, params: { group_id: group.id }
          expect(assigns(:messages)).to match(group.messages)
        end
      end

      it "index.html.hamlに遷移すること" do
        user  = create(:user)
        group = create(:group)
        login user
        get :index, params: { group_id: group.id }
        expect(response).to render_template :index
      end
    end

    context "ログインしていない場合" do

    end

  end
end
