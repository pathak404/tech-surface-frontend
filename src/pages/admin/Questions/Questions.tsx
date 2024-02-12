import {useContext, useEffect, useState } from "react"
import TableSkeleton from "../../../components/TableSkeleton"
import Table from "../../../components/Table"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import PageHeader from "../../../components/PageHeader"
import { useParams } from "react-router-dom"

const Questions = () => {
  const {examId} = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [questionData, setQuestionData] = useState<{[Key: string]: any}[]>([])
  const {addToast} = useContext(ToastContext) as ToastContextType

  const keyNameMapper: {[key: string]: string} = {
    questionId: "Question ID",
    question: "Question",
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try{
      const res = await fetchFromServer(`/exams/${examId}/questions`, "GET", {}, true)
      setQuestionData(res.questions)
      setLoading(false)
    }catch(error: any){
      addToast("error", error.message)
    }
  }
  
  return (
    <>
      <PageHeader heading={`Questions of ${examId}`} type="link" path={`/exams/${examId}/questions/new`} isActionButton classNames="btn-ghost" arrow>Add Question</PageHeader>
      <div className="space-y-5 mt-3">
        {loading
        ? <TableSkeleton rows={30} cols={5} />
        : <Table 
        data={questionData}
        isClickable 
        primaryKey="questionId" 
        initialPath={`/exams/${examId}/questions`} 
        keyNameMapper={keyNameMapper} 
        />
        }
      </div>
    </>
  )
}

export default Questions