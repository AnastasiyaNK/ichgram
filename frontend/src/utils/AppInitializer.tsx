

import { useGetCurrentUserQuery } from "../redux/apiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, logout, setInitialized } from "../redux/authSlice";
import type { AppDispatch } from "../redux/store";

interface Props {
  children: React.ReactNode;
}

const AppInitializer: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, error, isLoading } = useGetCurrentUserQuery(undefined, {
    skip:
      window.location.pathname === "/login" ||
      window.location.pathname === "/register",
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
      dispatch(setInitialized(true));
    } else if (error && "status" in error && error.status === 401) {
      dispatch(logout());
      dispatch(setInitialized(true));
    }
  }, [data, error, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // можна показати спінер
  }

  return <>{children}</>;
};

export default AppInitializer;





