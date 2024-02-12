import { ChangeEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SelectGroup from "../../../components/SelectGroup"
import { fetchFromServer } from "../../../utils"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"

const SelectCourse = () => {
    const [coursesData, setCoursesData] = useState([])
    const navigate = useNavigate()
    const {addToast} = useContext(ToastContext) as ToastContextType

    useEffect(() => {
        getCourses()
    }, [])

    const onCourseSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target){
            navigate(`/courses/${e.target.value}/batches`)
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

    return (
        <div className="w-full h-auto">
            <SelectGroup name="courseId" label="Select a course to continue" placeholder="Select a course" options={coursesData} value="Select a course" handler={onCourseSelect} />
        </div>
    )
}

export default SelectCourse