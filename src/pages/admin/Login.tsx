import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Button from "../../components/Button";
import { ToastContext } from "../../components/toast/ToastProvider";
import { ToastContextType } from "../../types";
import { fetchFromServer } from "../../utils";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<Record<string, string>>({
    email: "",
    password: "",
  })
  const navigate: NavigateFunction = useNavigate()
  const {addToast} = useContext(ToastContext) as ToastContextType

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target){
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }
  }

  const onSumbitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if(formData.email.length === 0 || formData.password.length === 0){
      setLoading(false)
      addToast("error", "Please fill all the fields")
      return;
    }
    try{
      const res = await fetchFromServer("/admin/login", "POST", formData, false, navigate)
      localStorage.setItem("token", res.token)
      localStorage.setItem("admin", JSON.stringify(res.admin))
      addToast("success", "Login successfull")
      navigate("/")
    }catch(error:any){
      addToast("error", error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="bg-base-200 min-h-[701px] text-center py-7">
      <div className="w-full h-auto inline-flex justify-center px-2 pb-3.5">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold px-3">Tech Surface Education</h1>
          <p className="pt-4 px-3">
            Login to admin panel to manage students, exams, corurses and much more
          </p>
        </div>
          <Button type="link" classNames="btn-ghost absolute right-4" path="/" arrow>Student Login</Button>
      </div>
      <div className="hero mt-7 lg:mt-0 h-auto">
        <div className="hero-content flex-col lg:flex-row-reverse gap-6">

            <video autoPlay loop muted className="max-w-lg hidden lg:block">
              <source src="/looking-through-resumes.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>

          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body min-w-[299px] sm:min-w-[384px]" onSubmit={onSumbitHandler}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                  name="email"
                  value={formData.email}
                  onInput={inputHandler}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                  name="password"
                  value={formData.password}
                  onInput={inputHandler}
                  required
                />
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              <div className="form-control mt-5">
                <Button type="submit" loading={loading} arrow>Login</Button>
              </div>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;
