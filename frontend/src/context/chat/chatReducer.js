export const chatReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MSG":
      return {
        messages: [
          ...state.messages,
          {
            msgId: action.payload.msgId,
            role: action.payload.role,
            content: action.payload.content,
            status: action.payload.status,
          },
        ],
      };

    case "APPEND_STREAMING_TEXT": {
      if (state.messages.length === 0) return state;

      const messages = [...state.messages];

      const last = messages[messages.length - 1];

      messages[messages.length - 1] = {
        ...last,
        content: (last.content || "") + action.payload.token,
        status: "streaming",
      };

      return {
        ...state,
        messages,
      };
    }

    case "STATUS_UPDATE": {
      const messages = [...state.messages];

      const lastMsg = messages[messages.length - 1];

      messages[messages.length - 1] = {
        ...lastMsg,
        status: action.payload.status,
      };

      return {
        messages,
      };
    }

    default:
      return state;
  }
};
