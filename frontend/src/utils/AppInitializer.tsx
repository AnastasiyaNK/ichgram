import { useEffect, useState } from "react";
import { useGetCurrentUserQuery } from "../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "../redux/authSlice";
import type { AppDispatch } from "../redux/store";

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [initialized, setInitialized] = useState(false);
  const { data: user, error, isLoading } = useGetCurrentUserQuery();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        dispatch(setCredentials(user));
      } else if (error) {
        dispatch(logout());
      }
      setInitialized(true);
    }
  }, [user, error, isLoading, dispatch]);

  if (!initialized) return <p>Loading...</p>;

  return <>{children}</>;
};

export default AppInitializer;
