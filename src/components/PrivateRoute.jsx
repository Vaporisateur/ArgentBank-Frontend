import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.user.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;