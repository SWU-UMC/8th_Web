import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';

//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지
//4. 마이페이지

const router=createBrowserRouter([
  {
    path:"/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage/>,
    children: [
      {index: true, element: <HomePage/> },
      {path: 'login', element:<LoginPage/> },
      {path: 'signup', element:<SignupPage/> },
      {path: 'mypage', element:<MyPage/>}
    ]
      
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
