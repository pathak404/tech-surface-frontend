import { ChangeEvent, FC, FormEvent, useContext, useState } from "react"
import InputGroup from "../../../components/InputGroup"
import PageHeader from "../../../components/PageHeader"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import Button from "../../../components/Button"
import { useLocation, useNavigate } from "react-router-dom"

const Course: FC<{type: "Update" | "Add"}> = ({type}) => {

    const navigate = useNavigate()
    const prevCourseData = (useLocation()).state?.data
    const {addToast} = useContext(ToastContext) as ToastContextType
    const [formData, setFormData] = useState<Record<string, string|undefined>>( prevCourseData || {
        name: "",
        description: "",
    })


    const typeMapper = {
        Update: {
            heading: "Course Details",
            apiPath: `/courses/${formData.courseId}`,
            method: "PUT",
        },
        Add: {
            heading: "New Course",
            apiPath: "/courses/new",
            method: "POST",
        }
    }
    const [editToggle, setEditToggle] = useState({
        isEdit: false,
        btnText: type==="Add" ? "Add Course" : "Edit Course"
    })
    const isDisabled = () => type === "Update" && !editToggle.isEdit

    const [loading, setLoading] = useState<boolean>(false)





    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target){
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }))
        }
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(type==="Update" && !editToggle.isEdit){
            setEditToggle({isEdit: true, btnText: "Update Course"})
            return;
        }
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
            navigate("/courses")
        }catch(error: any){
            addToast("error", error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-auto">

            {formData.courseId 
            ? <PageHeader isActionButton={true} type="link" classNames="btn-ghost" arrow path={`/courses/${formData.courseId}/batches`} heading={typeMapper[type].heading}>View Batches</PageHeader>
            : <PageHeader isActionButton={false} heading={typeMapper[type].heading} />
            }

            <form className="flex flex-wrap flex-col gap-4" onSubmit={submitHandler}>
                <div className="basis-full inline-flex gap-4">
                    <InputGroup type="text" name="name" value={formData.name} label="Course Name" placeholder="Enter Course Name" handler={inputHandler} disabled={isDisabled()} />

                </div>
                <div className="basis-full inline-flex gap-4">
                    <InputGroup type="text" name="description" value={formData.description} label="Course Description" placeholder="Enter course description" handler={inputHandler} disabled={isDisabled()} />
                </div>
                <div className="w-auto mt-4">
                    <Button type="submit" arrow loading={loading}>{editToggle.btnText}</Button>
                </div>
            </form>
        </div>
    )
}

export default Course