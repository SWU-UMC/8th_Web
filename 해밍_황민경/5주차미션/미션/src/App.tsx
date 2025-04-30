import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage.tsx";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "vq/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter([publicRoutes]);

function App() {
  <AuthProvider>
    return <RouterProvider router={router} />;
  </AuthProvider>;
}

export default App;
