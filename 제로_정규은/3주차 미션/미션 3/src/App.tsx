import './App.css';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';
import { Navbar } from "./components/Navbar";

// BrowserRouter v5
// createBrowserRouter v6


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> 
        <HomePage />
      </>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "movies/:category",
    element: (
      <>
        <Navbar />
        <MoviePage />
      </>
    ),
  },
  {
    path: "movie/:movieId",
    element: (
      <>
        <Navbar />
        <MovieDetailPage />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
