export const chatListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CHAT":
      return {
        chatList: [
          ...state.chatList,
          {
            chatTitle: action.payload.chatTitle,
            chatId: action.payload.chatId,
          },
        ],
        currentChatId: action.payload.currentChatId,
      };

    case "DELETE_CHAT":
      return {
        ...state,
        chatList: state.chatList.filter(
          (chat) => chat.chatId !== action.payload.chatId
        ),
      };

    case "ADD_ALL_CHATS":
      return {
        chatList: action.payload.data.map((chat) => ({
          chatId: chat._id,
          chatTitle: chat.chatTitle,
        })),
      };

    case "SET_CURRENT_CHAT":
      return {
        ...state,
        currentChatId: action.payload?.chatId ?? null,
      };

    default:
      return state;
  }
};
