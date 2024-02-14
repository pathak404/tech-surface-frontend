import { ChangeEvent, useContext, useEffect, useState } from "react"
import TableSkeleton from "../../../components/TableSkeleton"
import Table from "../../../components/Table"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import PageHeader from "../../../components/PageHeader"
import Search from "../../../components/Search"

const Courses = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [examData, setExamData] = useState<{[Key: string]: any}[]>([])
  const {addToast} = useContext(ToastContext) as ToastContextType

  const keyNameMapper: {[key: string]: string} = {
    courseId: "Course ID",
    name: "Course Name",
    description: "Description",
    createdAt: "Created At",
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try{
      const res = await fetchFromServer("/courses", "GET", {}, true)
      setExamData(res.courses)
      setLoading(false) // if error then donts show the table, instead show skeleton
    }catch(error: any){
      addToast("error", error.message)
    }
  }

  const [searchValue, setSearchValue] = useState<string>("")
  const [filteredData, setFilteredData] = useState<Record<string, string>[]>([])

  const searchCourses = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase())
    setFilteredData(examData.filter((dataObj) => {
      return (
        dataObj.name.toLowerCase().includes(searchValue) ||
        dataObj.courseId.toLowerCase().includes(searchValue) ||
        dataObj.description.toLowerCase().includes(searchValue) ||
        dataObj.batchId.toLowerCase().includes(searchValue)
      )
    }))
  }
  
  return (
    <>
      <PageHeader heading="Courses" type="link" path="/courses/new" isActionButton classNames="btn-ghost" arrow>Add Course</PageHeader>
      <div className="space-y-5 mt-3">
        <Search placeholder="Find in Courses" value={searchValue} handler={searchCourses} />
        {loading
        ? <TableSkeleton rows={30} cols={5} />
        : <Table 
        data={searchValue.length ? filteredData : examData}
        isClickable 
        primaryKey="courseId" 
        initialPath="/courses" 
        keyNameMapper={keyNameMapper} 
        isDownloadble
        filename="Courses.csv"
        />
        }
      </div>
    </>
  )
}

export default Courses