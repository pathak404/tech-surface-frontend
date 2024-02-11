import { ChangeEvent, useContext, useEffect, useState } from "react"
import InputGroup from "../../../components/InputGroup"
import PageHeader from "../../../components/PageHeader"
import SelectGroup from "../../../components/SelectGroup"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"

const AddStudent = () => {

    const {addToast} = useContext(ToastContext) as ToastContextType
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [coursesData, setCoursesData] = useState<Record<string, string>[]>([])
    const [batchesData, setBatchesData] = useState<Record<string, string>[]>([])


    useEffect(() => {
        getCourses()
    }, [])

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target){
            setFormData((prevData) => ({
                [e.target.name]: e.target.value,
                ...prevData
            }))
        }
    }

    const getCourses = async () => {
        try{
            const res = await fetchFromServer("/courses")
            setCoursesData(res.courses)
        }catch(error: any){
            addToast("error", error.message)
        }
    }

    const getBatches = async () => {
        try{
            const res = await fetchFromServer(`/courses/${formData.courseId}/batches`)
            setBatchesData(res.batches)
        }catch(error: any){
            addToast("error", error.message)
        }
    }

    const onCourseSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target){
            setFormData((prevData) => ({
                courseId: e.target.value,
                ...prevData
            }))
            getBatches()
        }
    }

    return (
        <div className="w-full h-auto">
            <PageHeader isActionButton={false} heading="Add Student" />

            <form>
                <InputGroup type="text" name="name" value={formData.name} label="Student Name" placeholder="Enter Student Name" handler={inputHandler} />
                <InputGroup type="number" name="phone" value={formData.phone} label="Phone Number" placeholder="Enter Phone Number" handler={inputHandler} />
                <InputGroup type="number" name="totalFee" value={formData.totalFee} label="Total Fee" placeholder="Enter Total Fee" handler={inputHandler} />
                <InputGroup type="date" name="joiningDate" value={formData.joiningDate} label="Joining Date" placeholder="Enter Joining Date" handler={inputHandler} />

                <SelectGroup name="courseId" label="Choose Course" placeholder="Select a course" options={coursesData} handler={onCourseSelect} disabled={coursesData.length == 0} />
                <SelectGroup name="batchId" label="Choose Batch" placeholder="Select a batch" options={batchesData} disabled={batchesData.length == 0} />
                
            </form>
        </div>
    )
}

export default AddStudent