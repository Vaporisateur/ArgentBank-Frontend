import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "../store/userSlice";
import { useEffect } from "react";

function Layout() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token) || localStorage.getItem("token");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, user, dispatch]);

  return (
    <>
      <Header
        isAuthenticated={!!user}
        userName={user?.userName}
        onLogout={() => dispatch(logout())}
      />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;