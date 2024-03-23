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
import Questions from "./pages/admin/Questions/Questions"
import Question from "./pages/admin/Questions/Question"
import Results from "./pages/admin/Results/Results"
import SelectCourse from "./pages/admin/Batches/SelectCourse"
import SelectExam from "./pages/admin/Exams/SelectExam"
import Payment from "./pages/admin/Payments/Payment"


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

    // payment
    {
      path: "/students/:studentId/payments/:paymentId",
      element: <ProtectedLayout component={<Payment type="Update" />} />
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
      path: "/batches",
      element: <ProtectedLayout component={<SelectCourse />} />
    },
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
    


    // questions
    {
      path: "/questions",
      element: <ProtectedLayout component={<SelectExam path="questions" />} />
    },
    {
      path: "/exams/:examId/questions",
      element: <ProtectedLayout component={<Questions />} />
    },
    {
      path: "/exams/:examId/questions/new",
      element: <ProtectedLayout component={<Question type="Add" />} />
    },
    {
      path: "/exams/:examId/questions/:questionId",
      element: <ProtectedLayout component={<Question type="Update" />} />
    },

    // Results
    {
      path: "/results",
      element: <ProtectedLayout component={<SelectExam path="results" />} />
    },
    {
      path: "/exams/:examId/results",
      element: <ProtectedLayout component={<Results />} />
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
