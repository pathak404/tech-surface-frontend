import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react"
import InputGroup from "../../../components/InputGroup"
import PageHeader from "../../../components/PageHeader"
import SelectGroup from "../../../components/SelectGroup"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import Button from "../../../components/Button"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const Batch: FC<{type: "Update" | "Add"}> = ({type}) => {

    const {courseId, batchId} = useParams()
    const navigate = useNavigate()
    const prevBatchData = (useLocation()).state?.data
    const {addToast} = useContext(ToastContext) as ToastContextType
    const [formData, setFormData] = useState<Record<string, string|undefined>>( prevBatchData || {
        name: "",
        description: "",
        courseId: "",
        startDate: "",
        endDate: "",
    })
    const [coursesData, setCoursesData] = useState<Record<string, string>[]>([])


    const typeMapper = {
        Update: {
            heading: "Batch Details",
            btnText: "Update batch",
            apiPath: `/courses/${courseId}/batches/${batchId}`,
            method: "PUT",
        },
        Add: {
            heading: "New Batch",
            btnText: "Add Batch",
            apiPath: `/courses/${courseId}/batches/new`,
            method: "POST",
        }
    }

    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        if(courseId){
            getCourse(courseId)
        }
        getCourses()
    }, [])

    const getCourses = async () => {
        try{
            const res = await fetchFromServer("/courses", "GET", {}, true)
            setCoursesData(res.courses)
        }catch(error: any){
            addToast("error", error.message)
        }
    }

    const getCourse = async (courseId: string) => {
        if(!courseId.length) return;
        try{
            const res = await fetchFromServer(`/courses/${courseId}`, "GET", {}, true)
            setCoursesData((prev) => [...prev, res.course])
        }catch(error: any){
            addToast("error", error.message)
        }
    }


    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target){
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }))
        }
    }

    const onCourseSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target){
            setFormData((prevData) => ({
                ...prevData,
                courseId: e.target.value,
            }))
        }
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        Object.keys(formData).map((key) => {
            if(!formData[key]?.toString().length){
                addToast("error", "Please fill all details")
                setLoading(false)
                return;
            }
        })

        try{
            const res = await fetchFromServer(typeMapper[type].apiPath, typeMapper[type].method, formData, true)
            addToast("success", res.message)
            navigate(`/courses/${courseId}/batches`)
        }catch(error: any){
            addToast("error", error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-auto">
            <PageHeader isActionButton={false} heading={typeMapper[type].heading} />

            <form className="flex flex-wrap flex-col gap-4" onSubmit={submitHandler}>
                <div className="basis-full inline-flex gap-4">
                    <InputGroup type="text" name="name" value={formData.name} label="Batch Name" placeholder="Enter Batch Name" handler={inputHandler} />
                    <InputGroup type="text" name="description" value={formData.description} label="Batch Description" placeholder="Enter batch description" handler={inputHandler} />
                </div>
                <div className="basis-full inline-flex gap-4">
                    <InputGroup type="datetime-local" name="startDate" value={formData.startDate} label="Start Date" placeholder="Enter start date" handler={inputHandler} />
                    <InputGroup type="datetime-local" name="endDate" value={formData.endDate} label="End Date" placeholder="Enter end date" handler={inputHandler} />
                </div>
                <div className="basis-full inline-flex gap-4">
                    <SelectGroup name="courseId" label="Choose Course" placeholder="Select a course" options={coursesData} value={formData.courseId?.length ? formData.courseId as string : "Select a course" } handler={onCourseSelect} disabled={coursesData.length == 0} />
                </div>
                <div className="w-auto mt-4">
                    <Button type="submit" arrow loading={loading}>{typeMapper[type].btnText}</Button>
                </div>
            </form>
        </div>
    )
}

export default Batch