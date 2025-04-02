import './App.css'
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';

//BrowserRouter v5
//createBrowswerRouter v6
//react-router-dom v7(next.js, remix)

const router=createBrowserRouter ([
 {
  path:'/',
  element: <HomePage/>,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: 'movies/:category',
      element: <MoviePage />,
    }
  ]
 },
]);


//movie?category=upcoming
//movie/category/{movie_id}


function App(): React.ReactElement {
  return <RouterProvider router={router} />
  
}
export default App
