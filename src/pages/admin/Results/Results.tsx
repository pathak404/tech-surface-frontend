import {useContext, useEffect, useState } from "react"
import TableSkeleton from "../../../components/TableSkeleton"
import Table from "../../../components/Table"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import PageHeader from "../../../components/PageHeader"
import { useParams } from "react-router-dom"

const Results = () => {
  const {examId} = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [resultData, setResultData] = useState<{[Key: string]: any}[]>([])
  const {addToast} = useContext(ToastContext) as ToastContextType

  const keyNameMapper: {[key: string]: string} = {
    resultId: "Result ID",
    studentId: "Student ID",
    correctAnswers: "Correct Answers",
    incorrectAnswers: "Incorrect Answers",
    submittedAt: "Submitted At"
  }

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try{
      const res = await fetchFromServer(`/exams/${examId}/results`, "GET", {}, true)
      setResultData(res.results)
      setLoading(false)
    }catch(error: any){
      addToast("error", error.message)
    }
  }
  
  return (
    <>
      <PageHeader heading={`Results of ${examId}`} isActionButton={false}></PageHeader>
      <div className="space-y-5 mt-3">
        {loading
        ? <TableSkeleton rows={30} cols={5} />
        : <Table 
        data={resultData}
        primaryKey="resultId" 
        initialPath={`/exams/${examId}/results`} 
        keyNameMapper={keyNameMapper} 
        />
        }
      </div>
    </>
  )
}

export default Results