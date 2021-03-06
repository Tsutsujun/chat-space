RSpec.describe MessagesController, type: :controller do

  let(:group)  { create(:group) }
  let(:user)   { create(:user) }
  let(:params)         { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
  let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: "", image: nil) } }

  describe 'GET #index' do
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
      it "ログイン画面にリダイレクトすること" do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context "ログインしている場合" do
      before do
        login user
      end

      context "保存に成功した場合" do
        it "メッセージ(message)を保存できること" do
          expect{ post :create, params: params }.to change(Message, :count).by(1)
        end

        it "チャット画面にリダイレクトすること" do
          post :create, params: params
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context "保存に失敗した場合" do
        it "メッセージ(message)を保存できないこと" do
          expect{ post :create, params: invalid_params }.not_to change(Message, :count)
        end

        it "index.html.hamlに遷移すること" do
          post :create, params: invalid_params
          expect(response).to render_template :index
        end
      end
    end
  end

end
