import { ChangeEvent, useContext, useEffect, useState } from "react"
import TableSkeleton from "../../../components/TableSkeleton"
import Table from "../../../components/Table"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import PageHeader from "../../../components/PageHeader"
import Search from "../../../components/Search"
import { useParams } from "react-router-dom"

const Batches = () => {
const {courseId} = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [batchData, setBatchData] = useState<{[Key: string]: any}[]>([])
  const {addToast} = useContext(ToastContext) as ToastContextType

  const keyNameMapper: {[key: string]: string} = {
    batchId: "Batch ID",
    name: "Batch Name",
    courseId: "Course ID",
    description: "Description",
    // startDate: "Start Date",
    // endDate: "End Date",
  }

  useEffect(() => {
    fetchBatches()
  }, [])

  const fetchBatches = async () => {
    try{
      const res = await fetchFromServer(`/courses/${courseId}/batches`, "GET", {}, true)
      setBatchData(res.batches)
      setLoading(false) // if error then donts show the table, instead show skeleton
    }catch(error: any){
      addToast("error", error.message)
    }
  }

  const [searchValue, setSearchValue] = useState<string>("")
  const [filteredData, setFilteredData] = useState<Record<string, string>[]>([])

  const searchBatches = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase())
    setFilteredData(batchData.filter((dataObj) => {
      return (
        // dataObj.startDate.toLowerCase().includes(searchValue) ||
        // dataObj.endDate.toLowerCase().includes(searchValue) ||
        dataObj.batchId.toLowerCase().includes(searchValue) ||
        dataObj.name.toLowerCase().includes(searchValue) ||
        dataObj.courseId.toLowerCase().includes(searchValue) ||
        dataObj.description.toLowerCase().includes(searchValue)
      )
    }))
  }
  
  return (
    <>
      <PageHeader heading={`Batches of ${courseId}`} type="link" path={`/courses/${courseId}/batches/new`} isActionButton classNames="btn-ghost" arrow>Add Batch</PageHeader>
      <div className="space-y-5 mt-3">
        <Search placeholder="Find in Batches" value={searchValue} handler={searchBatches} />
        {loading
        ? <TableSkeleton rows={30} cols={5} />
        : <Table 
        data={searchValue.length ? filteredData : batchData}
        isClickable 
        primaryKey="batchId" 
        initialPath={`/courses/${courseId}/batches`} 
        keyNameMapper={keyNameMapper} 
        isDownloadble
        filename={`Batches-of-${courseId}.csv`}
        />
        }
      </div>
    </>
  )
}

export default Batches