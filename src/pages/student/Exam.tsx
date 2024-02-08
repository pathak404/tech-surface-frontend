import { FormEvent, MouseEvent, useRef } from 'react'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'

const Exam = () => {

  const examInfoDiv = useRef<HTMLDivElement>(null)
  const questionDiv = useRef<HTMLDivElement>(null)
  const options = ["a", "b", "c"]

  const onExamStart = (e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => {
    examInfoDiv.current?.classList.add("animate-compress")
    questionDiv.current?.classList.add("animate-shrink")
    if(e.target){
      (e.target as HTMLElement).classList.add("animate-fade-out")
    }
  }
  const onAnswerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }


  return (
    <div className='bg-slate-50 w-full min-h-screen overflow-hidden'>

      <div className="fixed top-0 left-0 w-full h-full p-5 flex flex-col items-center justify-center transition-all" ref={examInfoDiv}>
        <p className="text-xl text-justify mb-6 max-w-2xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo similique ducimus commodi voluptas obcaecati, expedita error debitis sequi minima eos, recusandae accusantium perspiciatis voluptatibus hic repudiandae deserunt a alias ut! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, necessitatibus. Fugit impedit at provident odio aliquam harum blanditiis quos iure, delectus odit voluptates, nobis veniam corrupti quisquam, omnis aspernatur repellat.</p>
        <Button type='submit' handler={onExamStart} arrow>Start Exam</Button>
      </div>

      <div className="ml-[33%] w-full inline-flex p-5 transition-all translate-x-full" ref={questionDiv}>
          <div className="h-[650px] divider divider-horizontal"></div>

        <div className="flex flex-col items-center justify-center ms-3">
          <form onSubmit={onAnswerSubmit} className='space-y-4'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum tenetur earum sint unde libero labore nobis</p>
            <div>
              {options.map((option, index) => <InputGroup key={index} label={option} type='radio' name='option' value={option} />)}
            </div>
            <Button type='submit' arrow>Submit</Button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Exam