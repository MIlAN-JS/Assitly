import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
  const { user, loading , initialized} = useSelector((state) => state.auth);

  if (!initialized) {
    return <h1>Loading...</h1>;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}