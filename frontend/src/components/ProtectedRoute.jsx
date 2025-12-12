import { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import axiosInstance from "../axios";
import { AuthContext } from "../context/auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkingAuth, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        dispatch({
          type: "LOGIN_START",
        });

        const res = await axiosInstance.get(
          "/api/v1/auth/isLoggedIn",
          { withCredentials: true }
        );


        if (res.data.success) {
          const { user, accessToken } = res.data.data;
          dispatch({
            type: "RESTORE_SESSION",
            payload: {
              user,
              token: accessToken,
            },
          });
        } else {
          const errMsg = res.data.message;
          dispatch({
            type: "LOGIN_FAILURE",
            payload: { errMsg },
          });
        }
      } catch (error) {
        const errMsg = error.res?.data?.message || error.message;
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { errMsg },
        });
      } finally {
        dispatch({ type: "FINISH_CHECK" });
      }
    };
    verifyUser();
  }, [dispatch]);

  if (checkingAuth) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
