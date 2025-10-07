import React from "react";
import { useGetCurrentUserQuery } from "../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials, logout, setInitialized } from "../redux/authSlice";
import type { AppDispatch } from "../redux/store";
import { Spin } from "antd";

interface Props {
  children: React.ReactNode;
}

const AppInitializer: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, error, isLoading } = useGetCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true, // завжди отримуємо свіжі дані
  });

  React.useEffect(() => {
    if (data) {
      dispatch(setCredentials({ ...data, id: data._id }));
    } else if (error && "status" in error && error.status === 401) {
      dispatch(logout());
    }

    if (!isLoading) {
      dispatch(setInitialized(true));
    }
  }, [data, error, isLoading, dispatch]);

  if (isLoading) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AppInitializer;






