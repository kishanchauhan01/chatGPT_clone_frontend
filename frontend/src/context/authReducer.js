export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      console.log(action);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        checkingAuth: false,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    case "  ":
      return {
        ...state,
        checkingAuth: false,
      };

    case "RESTORE_SESSION":
      return {
        ...state,
        isAuthenticated: true,
        checkingAuth: false,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };

    default:
      return state;
  }
};
