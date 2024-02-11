import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ToastProvider from "./components/toast/ToastProvider"
import Login from "./pages/student/Login"
import AdminLogin from "./pages/admin/Login"
import Exam from "./pages/student/Exam"
import Index from "./pages/admin/Index"
import ProtectedLayout from "./pages/admin/ProtectedLayout"


function App() {

  const router = createBrowserRouter([
    {
      path: "/admin/login",
      element: <AdminLogin />
    },

    // for student
    {
      path: "/",
      element: localStorage.getItem("token") ? <ProtectedLayout component={<Index />} /> : <Login />
    },
    {
      path: "/student/exam",
      element: <Exam />
    }
  ])

  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}

export default App
