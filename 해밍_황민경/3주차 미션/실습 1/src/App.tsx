import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 만든 페이지들을 import 하기
import HomePage from "./pages/home.tsx";
import NotFound from "./pages/not-found.tsx";
import Movies from "./pages/movies.tsx";
import RootLayout from "./layout/root-layout.tsx";

const router = createBrowserRouter([
  {
    //현재 vite로 프로젝트를 세팅했을 경우의 경로 -> localhost: 5173의미
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    // Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 children 활용
    children: [
      {
        // index: true는 위의 path: '/' 즉, 홈 경로를 의미함.
        index: true,
        element: <HomePage />,
      },
      {
        //부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작함.
        // /:를 활용해서 동적으로 바뀌는 부분의 이름 정의해주기
        path: "movies/:movieId",
        element: <Movies />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
