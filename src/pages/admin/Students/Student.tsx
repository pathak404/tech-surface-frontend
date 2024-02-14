import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react"
import InputGroup from "../../../components/InputGroup"
import PageHeader from "../../../components/PageHeader"
import SelectGroup from "../../../components/SelectGroup"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import Button from "../../../components/Button"
import { useLocation, useNavigate } from "react-router-dom"
import Payments from "../Payments/Payments"
import Payment from "../Payments/Payment"

const Student: FC<{type: "Update" | "Add"}> = ({type}) => {

    const navigate = useNavigate()
    const prevStudentData = (useLocation()).state?.data
    const {addToast} = useContext(ToastContext) as ToastContextType
    const [formData, setFormData] = useState<Record<string, string|undefined>>( prevStudentData || {
        name: "",
        joiningDate: "",
        totalFee: undefined,
        phone: undefined,
        courseId: "",
        batchId: "",
    })
    const [coursesData, setCoursesData] = useState<Record<string, string>[]>([])
    const [batchesData, setBatchesData] = useState<Record<string, string>[]>([])

    const typeMapper = {
        Update: {
            heading: "Student Details",
            apiPath: `/students/${formData.studentId}`,
            method: "PUT",
        },
        Add: {
            heading: "New Student",
            apiPath: "/students/new",
            method: "POST",
        }
    }

    const [editToggle, setEditToggle] = useState({
        isEdit: false,
        btnText: type==="Add" ? "Add Student" : "Edit Student"
    })
    const isDisabled = () => type === "Update" && !editToggle.isEdit

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        getCourses()
        if(formData.courseId && formData.batchId){
            getBatch(formData.courseId, formData.batchId)
        }
    }, [])

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target){
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }))
        }
    }

    const getCourses = async () => {
        try{
            const res = await fetchFromServer("/courses", "GET", {}, true)
            setCoursesData(res.courses)
        }catch(error: any){
            addToast("error", error.message)
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

    const onBatchSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target){
            setFormData((prevData) => ({
                ...prevData,
                batchId: e.target.value,
            }))
        }
    }



    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(type==="Update" && !editToggle.isEdit){
            setEditToggle({isEdit: true, btnText: "Update Student"})
            return;
        }

        setLoading(true)
        if(formData.phone?.toString().length !== 10) {
            addToast("error", "Phone number must be 10 digit long")
            setLoading(false)
            return;
        }
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
            navigate("/students")
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
                    <InputGroup type="text" name="name" value={formData.name} label="Student Name" placeholder="Enter Student Name" handler={inputHandler} disabled={isDisabled()} />
                    <InputGroup type="number" name="phone" value={formData.phone} label="Phone Number" placeholder="Enter Phone Number" handler={inputHandler} disabled={isDisabled()} />
                </div>
                <div className="basis-full inline-flex gap-4">
                    <InputGroup type="number" name="totalFee" value={formData.totalFee} label="Total Fee" placeholder="Enter Total Fee" handler={inputHandler} disabled={isDisabled()} />
                    <InputGroup type="date" name="joiningDate" value={formData.joiningDate} label="Joining Date" placeholder="Enter Joining Date" handler={inputHandler} disabled={isDisabled()} />
                </div>
                <div className="basis-full inline-flex gap-4">
                    <SelectGroup name="courseId" label="Choose Course" placeholder="Select a course" options={coursesData} value={formData.courseId?.length ? formData.courseId as string : "Select a course" } handler={onCourseSelect} disabled={isDisabled() ? true : coursesData.length == 0} />
                    <SelectGroup name="batchId" label="Choose Batch" placeholder="Select a batch" options={batchesData} value={formData.batchId?.length ? formData.batchId as string : "Select a batch"} handler={onBatchSelect} disabled={isDisabled() ? true : batchesData.length == 0} />
                </div>
                <div className="w-auto mt-4">
                    <Button type="submit" arrow loading={loading}>{editToggle.btnText}</Button>
                </div>
            </form>

            {type === "Update" && <Payment studentId={formData.studentId as string} />}
            {type === "Update" && <Payments studentId={formData.studentId as string} />}
        </div>
    )
}

export default Student