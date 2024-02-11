import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ToastProvider from "./components/toast/ToastProvider"
import Login from "./pages/student/Login"
import AdminLogin from "./pages/admin/Login"
import Examination from "./pages/student/Exam"
import Index from "./pages/admin/Index"
import ProtectedLayout from "./pages/admin/ProtectedLayout"
import Students from "./pages/admin/Students/Students"
import Student from "./pages/admin/Students/Student"
import Exams from "./pages/admin/Exams/Exams"
import Exam from "./pages/admin/Exams/Exam"
import Courses from "./pages/admin/Courses/Courses"
import Course from "./pages/admin/Courses/Course"
import Batches from "./pages/admin/Batches/Batches"
import Batch from "./pages/admin/Batches/Batch"


function App() {

  const router = createBrowserRouter([
    {
      path: "/admin/login",
      element: <AdminLogin />
    },

    
    // students
    {
      path: "/students",
      element: <ProtectedLayout component={<Students />} />
    },
    {
      path: "/students/new",
      element: <ProtectedLayout component={<Student type="Add" />} />
    },
    {
      path: "/students/:studentId",
      element: <ProtectedLayout component={<Student type="Update" />} />
    },


    // courses
    {
      path: "/courses",
      element: <ProtectedLayout component={<Courses />} />
    },
    {
      path: "/courses/new",
      element: <ProtectedLayout component={<Course type="Add" />} />
    },
    {
      path: "/courses/:courseId",
      element: <ProtectedLayout component={<Course type="Update" />} />
    },


    // batches
    {
      path: "/courses/:courseId/batches",
      element: <ProtectedLayout component={<Batches />} />
    },
    {
      path: "/courses/:courseId/batches/new",
      element: <ProtectedLayout component={<Batch type="Add" />} />
    },
    {
      path: "/courses/:courseId/batches/:batchId",
      element: <ProtectedLayout component={<Batch type="Update" />} />
    },

    // exams
    {
      path: "/exams",
      element: <ProtectedLayout component={<Exams />} />
    },
    {
      path: "/exams/new",
      element: <ProtectedLayout component={<Exam type="Add" />} />
    },
    {
      path: "/exams/:examId",
      element: <ProtectedLayout component={<Exam type="Update" />} />
    },
    
    
    // for student
    {
      path: "/",
      element: localStorage.getItem("token") ? <ProtectedLayout component={<Index />} /> : <Login />
    },
    {
      path: "/student/exam",
      element: <Examination />
    }
  ])

  

  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}

export default App
