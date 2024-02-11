import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react"
import InputGroup from "../../../components/InputGroup"
import PageHeader from "../../../components/PageHeader"
import SelectGroup from "../../../components/SelectGroup"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import Button from "../../../components/Button"
import { useLocation, useNavigate } from "react-router-dom"

const Exam: FC<{type: "Update" | "Add"}> = ({type}) => {

    const navigate = useNavigate()
    const prevExamData = (useLocation()).state?.data
    const {addToast} = useContext(ToastContext) as ToastContextType
    const [formData, setFormData] = useState<Record<string, string|undefined>>( prevExamData || {
        name: "",
        examDate: "",
        courseId: "",
        batchId: "",
    })
    const [coursesData, setCoursesData] = useState<Record<string, string>[]>([])
    const [batchesData, setBatchesData] = useState<Record<string, string>[]>([])


    const typeMapper = {
        Update: {
            heading: "Exam Details",
            btnText: "Update exam",
            apiPath: `/exams/${formData.examId}`,
            method: "PUT",
        },
        Add: {
            heading: "New Exam",
            btnText: "Add Exam",
            apiPath: "/exams/new",
            method: "POST",
        }
    }

    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        if(formData.courseId){
            getCourse(formData.courseId)
        }
        if(formData.courseId && formData.batchId){
            getBatch(formData.courseId, formData.batchId)
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

    const getBatches = async (courseId: string|undefined) => {
        try{
            const res = await fetchFromServer(`/courses/${courseId}/batches`, "GET", {}, true)
            setBatchesData(res.batches)
        }catch(error: any){
            addToast("error", error.message)
        }
    }

    const getBatch = async (courseId: string, batchId: string) => {
        if(!courseId.length || !batchId.length) return;
        try{
            const res = await fetchFromServer(`/courses/${courseId}/batches/${batchId}`, "GET", {}, true)
            setBatchesData((prev) => [...prev, res.batch])
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

    const onBatchSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target){
            setFormData((prevData) => ({
                ...prevData,
                batchId: e.target.value,
            }))
        }
    }

    const onCourseSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target){
            setFormData((prevData) => ({
                ...prevData,
                courseId: e.target.value,
            }))
            getBatches(e.target.value)
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
            navigate("/exams")
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
                    <InputGroup type="text" name="name" value={formData.name} label="Exam Name" placeholder="Enter Exam Name" handler={inputHandler} />
                    <InputGroup type="datetime-local" name="examDate" value={formData.examData} label="Exam Date" placeholder="Enter date and time" handler={inputHandler} />
                </div>
                <div className="basis-full inline-flex gap-4">
                    <SelectGroup name="courseId" label="Choose Course" placeholder="Select a course" options={coursesData} value={formData.courseId?.length ? formData.courseId as string : "Select a course" } handler={onCourseSelect} disabled={coursesData.length == 0} />
                    <SelectGroup name="batchId" label="Choose Batch" placeholder="Select a batch" options={batchesData} value={formData.batchId?.length ? formData.batchId as string : "Select a batch"} handler={onBatchSelect} disabled={batchesData.length == 0} />
                </div>
                <div className="w-auto mt-4">
                    <Button type="submit" arrow loading={loading}>{typeMapper[type].btnText}</Button>
                </div>
            </form>
        </div>
    )
}

export default Exam