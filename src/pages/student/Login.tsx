import { ChangeEvent, FormEvent, useRef, useState } from "react"
import InputGroup from "../../components/InputGroup"
import Button from "../../components/Button"

const Login = () => {
  const [formData, setFormData] = useState<{ examcode: string, phone: string }>({
    examcode: "",
    phone: ""
  })

  const [loading, setLoading] = useState<boolean>(false)
  const loginRef = useRef<HTMLFormElement>(null)
  const examInfoRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef<HTMLUListElement>(null)

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target && e.target.name){
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }
  }

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    loginRef.current?.classList.add("animate-swap-out")
    setTimeout(()=> {
      loginRef.current?.classList.add("hidden");
      examInfoRef.current?.classList.remove("hidden");
      examInfoRef.current?.classList.add("animate-swap-in");
      (stepRef.current?.childNodes[1] as HTMLElement)?.classList.add("step-primary");
    }, 500)
  }

  return (
    <div className="w-full min-h-[701px] bg-slate-50 p-5 lg:p-10 space-y-4">
      <h1 className="font-bold text-5xl text-center">Tech Surface Education</h1>
      <div className="w-full h-auto flex gap-10 flex-col md:flex-row items-center justify-center">
        <div className="basis-1/2 hidden md:block">
          <img src="/3d-writing-notes.png" className="w-10/12" />
        </div>

        <div className="basis-1/2 space-y-7 overflow-hidden">
          <p className="font-bold text-lg">Welcome to online exam center</p>
          <ul ref={stepRef} className="steps -translate-x-3">
            <li className="step step-primary">Exam Code</li>
            <li className="step">Exam Information</li>
            <li className="step">Start Exam</li>
          </ul>

          <form ref={loginRef} className="space-y-4" onSubmit={formSubmit}>
              <InputGroup
                type="text"
                name="examcode"
                value={formData.examcode}
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

          <div ref={examInfoRef} className="hidden max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quae. Iure aperiam quod nobis explicabo culpa, dignissimos fugiat quaerat voluptatum neque dolorem et quidem voluptatibus optio saepe voluptatem laborum. Omnis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus dolorem, officiis tempora voluptatem a magnam atque, vero aut harum quam assumenda enim ad vitae officia rem quidem reprehenderit quasi repellat!
            <div className="block mt-4">
              <Button type="link" path="/examination" arrow>Start Exam</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
