import { ChangeEvent, FormEvent, MouseEvent, useContext, useEffect, useRef, useState } from 'react'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'
import { fetchFromServer, logout } from '../../utils'
import { useLocation } from 'react-router-dom'
import { ToastContext } from '../../components/toast/ToastProvider'
import { ToastContextType } from '../../types'

const Exam = () => {
  const exam = (useLocation()).state.data?.exam || null
  const student = (useLocation()).state.data?.student || null
  const examId = exam?.examId || null
  const studentId = student?.studentId || null

  const examInfoDiv = useRef<HTMLDivElement>(null)
  const questionParentDiv = useRef<HTMLDivElement>(null)
  const questionDiv = useRef<HTMLDivElement>(null)
  const afterAllQuestionDiv = useRef<HTMLDivElement>(null)

  const {addToast} = useContext(ToastContext) as ToastContextType
  const [questions, setQuestions] = useState<Record<string, any>[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Record<string, any>>({})
  const questionState= useRef({
    currentIndex: 0,
    totalLen: 0,
  })

  const [submittedData, setSubmittedData] = useState({})
  const [result, setResult] = useState({
    correctAnswers: undefined,
    incorrectAnswers: undefined,
    message2: "Please Wait ...",
  })

  useEffect(() => {
    if(!examId || !localStorage.getItem("student-token")){
      logout("student")
    }
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try{
      const res = await fetchFromServer(`/exams/${examId}/questions`)
      setQuestions(res.questions)
      setCurrentQuestion(res.questions[0])
      questionState.current.totalLen = res.questions.length
    }catch(error: any){
      addToast("error", error.message)
      logout("student")
    }
  }


  const onExamStart = (e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => {
    examInfoDiv.current?.classList.add("animate-compress")
    questionParentDiv.current?.classList.add("animate-shrink")
    if(e.target){
      (e.target as HTMLElement).classList.add("animate-fade-out")
    }
  }


  const setSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmittedData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const onAnswerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentIndex = questionState.current.currentIndex === questionState.current.totalLen ? questionState.current.currentIndex - 1 : questionState.current.currentIndex;
    if(!Object.keys(submittedData).includes(questions[currentIndex].questionId)) return;

    if(questionState.current.currentIndex < questionState.current.totalLen - 1){
      questionDiv.current?.classList.add("animate-out");
      questionState.current.currentIndex++;
      setCurrentQuestion(questions[questionState.current.currentIndex]);
      questionDiv.current?.classList.add("animate-in");
    }else{
      questionDiv.current?.classList.add("hidden")
      afterAllQuestionDiv.current?.classList.remove("hidden")
      afterAllQuestionDiv.current?.classList.add("flex")


      try{
        const res = await fetchFromServer(`/exams/${examId}/results/new`, "POST", {answers: submittedData, studentId}, true)
        setResult((prev) => ({...prev, ...res.result, message2: "Thank you for participating in the exam"}))
      }catch(error: any){
        setResult((prev) => ({...prev, message2: error.message}))
        addToast("error", error.message)
      }finally {
        localStorage.removeItem("student-token")
        localStorage.removeItem("student")
        setTimeout(() => {
          logout("student")
        }, 10000)
      }
    }
  }


  return (
    <div className='bg-slate-50 w-full min-h-screen overflow-hidden'>

      <div className="fixed top-0 left-0 w-full h-full p-5 flex flex-col items-center justify-center transition-all" ref={examInfoDiv}>
        <div className="flex flex-col">
        <p className="text-2xl text-justify mb-4 max-w-2xl font-semibold">Hello 👋, {student.name} <span className='text-base'>( {studentId} )</span></p>
        <p className="text-xl text-justify mb-4 max-w-2xl">Welcome to the Tech Surface Exam platform! There is no penalty for incorrect answers, so feel free to attempt all questions. Below, you'll find essential information about the exam</p>
        <p className="text-xl text-justify mb-4 max-w-2xl"><span className='font-bold'>CourseID:</span> {student.courseId}</p>
        <p className="text-xl text-justify mb-4 max-w-2xl"><span className='font-bold'>BatchID:</span> {student.batchId}</p>
        {questions.length && <p className="text-xl text-justify mb-4 max-w-2xl"><span className='font-bold'>Total number of questions:</span> {questions.length}</p>}
        <p className="text-xl text-justify mb-10 max-w-2xl"><span className='font-bold'>Points for Each Question:</span> 1 Point</p>

        </div>
        <Button type='submit' handler={onExamStart} arrow>Start Exam</Button>
      </div>

      <div className="ml-[33%] w-full inline-flex p-5 transition-all translate-x-full" ref={questionParentDiv}>
          <div className="h-[650px] divider divider-horizontal"></div>

        <div className="flex flex-col items-center justify-center ms-3" ref={questionDiv}>
          <form onSubmit={onAnswerSubmit} className='space-y-4'>
            <p className='text-lg font-semibold'>{currentQuestion && Object.keys(currentQuestion).length && currentQuestion.question}</p>
            <div>
              {currentQuestion && Object.keys(currentQuestion).length && currentQuestion.options.map((option: string, index: string) => <InputGroup key={currentQuestion.questionId+index} label={option} type='radio' name={currentQuestion.questionId} value={index} handler={setSubmit} />)}
            </div>
            <Button type='submit' arrow>Submit</Button>
          </form>
        </div>
        <div className="flex-col items-center justify-center ms-3 gap-3 hidden" ref={afterAllQuestionDiv}>
            <h2 className='text-3xl font-semibold'>{result.message2}</h2>
            {result.correctAnswers != undefined && <p className='text-lg font-semibold'>Total correct answers: {result.correctAnswers}</p>}
            {result.incorrectAnswers != undefined && <p className='text-lg font-semibold'>Total incorrect answers: {result.incorrectAnswers}</p>}
            {result.message2.length > 16 && <p className='text-sm'>Logging you out in 10 seconds ...</p>}
        </div>

      </div>
    </div>
  )
}

export default Exam