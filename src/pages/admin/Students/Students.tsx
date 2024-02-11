import { useEffect, useState } from "react"
import TableSkeleton from "../../../components/TableSkeleton"
import Table from "../../../components/Table"

const Students = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<{[Key: string]: any}[]>([])

  const keyNameMapper: {[key: string]: string} = {
    studentId: "Student ID",
    name: "Name",
    phone: "Phone",
    totalFee: "Total Fee",
    courseId: "Course ID",
    batchId: "Batch ID"
  }

  useEffect(()=> {
    fetch("http://localhost:3000/students")
    .then((res) => res.json())
    .then((res) => setData(res.student))
    .then(() => setLoading(false))
    .catch((err) => console.log(err))
  }, [])
  
  return (
    loading 
    ? <TableSkeleton rows={30} cols={5} />
    : <Table data={data} isClickable primaryKey="studentId" initialPath="/students" keyNameMapper={keyNameMapper} />
  )
}

export default Students