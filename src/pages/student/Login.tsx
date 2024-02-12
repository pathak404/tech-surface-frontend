import { ChangeEvent, FormEvent, useContext, useState } from "react"
import InputGroup from "../../components/InputGroup"
import Button from "../../components/Button"
import { ToastContext } from "../../components/toast/ToastProvider";
import { ToastContextType } from "../../types";
import { fetchFromServer } from "../../utils";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState<{ examId: string, phone: string }>({
    examId: "",
    phone: ""
  })

  const navigate = useNavigate()
  const {addToast} = useContext(ToastContext) as ToastContextType
  const [loading, setLoading] = useState<boolean>(false)

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target && e.target.name){
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }
  }

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if(formData.examId.length === 0 || formData.phone.length !== 10){
      addToast("error", "Please fill all the fields correctly")
      setLoading(false)
      return;
    }

    try{
      const res = await fetchFromServer("/student/login", "POST", formData, false)
      if(res.student){
        localStorage.setItem("student", JSON.stringify(res.student))
        localStorage.setItem("student-token", res.token)
        addToast("success", "Successfully Validated")
        navigate("/student/exam", {state: {data: {exam: res.exam, student: res.student}}})
      }
    }catch(error: any){
      addToast("error", error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-[701px] bg-slate-50 p-5 lg:p-10 space-y-4">
      <div className="w-full h-auto inline-flex justify-center px-2 pb-8">
            <h1 className="font-bold text-5xl text-center">Tech Surface Education</h1>
            <Button type="link" classNames="btn-ghost absolute right-4" path="/admin/login" arrow>Admin Login</Button>
      </div>
      <div className="w-full h-auto flex gap-10 flex-col md:flex-row items-center justify-center">
        <div className="basis-1/2 hidden md:block">
          <img src="/3d-writing-notes.png" className="w-10/12" />
        </div>

        <div className="basis-1/2 space-y-7">
          <p className="font-bold text-lg">Welcome to online exam center</p>
          <form className="space-y-4" onSubmit={formSubmit}>
              <InputGroup
                type="text"
                name="examId"
                value={formData.examId}
                label="Your Exam Code"
                placeholder="eghdgVYT&*6554GfGG"
                handler={handler}
              />
              <InputGroup
                type="number"
                name="phone"
                value={formData.phone}
                label="Phone Number (+91)"
                placeholder="Registered Phone Number"
                handler={handler}
                maxLength={10}
              />
              <Button loading={loading} type="submit" disabled={loading} arrow>
                View Exam Info
              </Button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
