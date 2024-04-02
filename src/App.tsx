import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>
  }
]); 


function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
