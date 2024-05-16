import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage/>
  }
]); 


function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
