import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ToastProvider from "./components/toast/ToastProvider"
import ProtectedLayout from "./pages/admin/ProtectedLayout"
import Students from "./pages/admin/Students"


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedLayout component={<Students />} />
    }
  ])

  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}

export default App
