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

    default:
      return state;
  }
};
