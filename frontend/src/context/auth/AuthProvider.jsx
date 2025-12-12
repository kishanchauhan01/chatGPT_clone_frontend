import { useReducer } from "react";
import { authReducer } from "./authReducer";
import axiosInstance from "../../axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    checkingAuth: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (values) => {
    try {
      dispatch({
        type: "LOGIN_START",
      });

      const response = await axiosInstance.post(
        "/api/v1/auth/login",
        values,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        const { user, accessToken: token } = response.data.data;
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token },
        });

        return { success: true, msg: response.data.message };
      } else {
        const errMsg = response.data.message;
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { errMsg },
        });

        return { success: false, msg: response.data.message };
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;

      dispatch({
        type: "LOGIN_FAILURE",
        payload: { errMsg },
      });

      return { success: false, msg: errMsg };
    } finally {
      dispatch({ type: "FINISH_CHECK" });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
