import { ChangeEvent, useContext, useEffect, useState } from "react"
import TableSkeleton from "../../../components/TableSkeleton"
import Table from "../../../components/Table"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import PageHeader from "../../../components/PageHeader"
import Search from "../../../components/Search"

const Students = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [studentData, setStudentData] = useState<{[Key: string]: any}[]>([])
  const {addToast} = useContext(ToastContext) as ToastContextType

  const keyNameMapper: {[key: string]: string} = {
    studentId: "Student ID",
    name: "Student Name",
    phone: "Phone",
    totalFee: "Total Fee",
    courseId: "Course ID",
    batchId: "Batch ID"
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try{
      const res = await fetchFromServer("/students", "GET", {}, true)
      setStudentData(res.students)
      setLoading(false) // if error then donts show the table, instead show skeleton
    }catch(error: any){
      addToast("error", error.message)
    }
  }

  const [searchValue, setSearchValue] = useState<string>("")
  const [filteredData, setFilteredData] = useState<Record<string, string>[]>([])

  const searchStudents = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase())
    setFilteredData(studentData.filter((dataObj) => {
      return (
        dataObj.phone.toString().includes(searchValue) ||
        dataObj.studentId.toLowerCase().includes(searchValue) ||
        dataObj.name.toLowerCase().includes(searchValue) ||
        dataObj.courseId.toLowerCase().includes(searchValue) ||
        dataObj.batchId.toLowerCase().includes(searchValue)
      )
    }))
  }
  
  return (
    <>
      <PageHeader heading="Students" type="link" path="/students/new" isActionButton classNames="btn-ghost" arrow>Add Student</PageHeader>
      <div className="space-y-5 mt-3">
        <Search placeholder="Find in Students" value={searchValue} handler={searchStudents} />
        {loading
        ? <TableSkeleton rows={30} cols={5} />
        : <Table 
        data={searchValue.length ? filteredData : studentData}
        isClickable 
        primaryKey="studentId" 
        initialPath="/students" 
        keyNameMapper={keyNameMapper} 
        />
        }
      </div>
    </>
  )
}

export default Students