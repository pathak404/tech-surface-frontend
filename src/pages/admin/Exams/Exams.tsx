import { ChangeEvent, useContext, useEffect, useState } from "react"
import TableSkeleton from "../../../components/TableSkeleton"
import Table from "../../../components/Table"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import PageHeader from "../../../components/PageHeader"
import Search from "../../../components/Search"

const Exams = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [examData, setExamData] = useState<{[Key: string]: any}[]>([])
  const {addToast} = useContext(ToastContext) as ToastContextType

  const keyNameMapper: {[key: string]: string} = {
    examId: "Exam ID",
    name: "Exam Name",
    courseId: "Course ID",
    batchId: "Batch ID",
    examDate: "Exam Date",
  }

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try{
      const res = await fetchFromServer("/exams", "GET", {}, true)
      setExamData(res.exams)
      setLoading(false) // if error then donts show the table, instead show skeleton
    }catch(error: any){
      addToast("error", error.message)
    }
  }

  const [searchValue, setSearchValue] = useState<string>("")
  const [filteredData, setFilteredData] = useState<Record<string, string>[]>([])

  const searchExams = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase())
    setFilteredData(examData.filter((dataObj) => {
      return (
        dataObj.examDate.toLowerCase().includes(searchValue) ||
        dataObj.examId.toLowerCase().includes(searchValue) ||
        dataObj.name.toLowerCase().includes(searchValue) ||
        dataObj.courseId.toLowerCase().includes(searchValue) ||
        dataObj.batchId.toLowerCase().includes(searchValue)
      )
    }))
  }
  
  return (
    <>
      <PageHeader heading="Exams" type="link" path="/exams/new" isActionButton classNames="btn-ghost" arrow>Add Exam</PageHeader>
      <div className="space-y-5 mt-3">
        <Search placeholder="Find in Exams" value={searchValue} handler={searchExams} />
        {loading
        ? <TableSkeleton rows={30} cols={5} />
        : <Table 
        data={searchValue.length ? filteredData : examData}
        isClickable 
        primaryKey="examId" 
        initialPath="/exams" 
        keyNameMapper={keyNameMapper} 
        />
        }
      </div>
    </>
  )
}

export default Exams