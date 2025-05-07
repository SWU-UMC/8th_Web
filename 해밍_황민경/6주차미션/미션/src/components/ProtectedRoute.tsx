import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { login } = useAuth();
  const location = useLocation();

  if (!login) {
    // 로그인 안 되어 있으면 로그인 페이지로 리디렉션
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 로그인 되어 있으면 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
