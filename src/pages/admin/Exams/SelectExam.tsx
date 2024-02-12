import { ChangeEvent, FC, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SelectGroup from "../../../components/SelectGroup"
import { fetchFromServer } from "../../../utils"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"

const SelectExam: FC<{path: string}> = ({path}) => {
    const [examsData, setExamsData] = useState([])
    const navigate = useNavigate()
    const {addToast} = useContext(ToastContext) as ToastContextType

    useEffect(() => {
        getExams()
    }, [])

    const onExamSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target){
            navigate(`/exams/${e.target.value}/${path}`)
        }
    }

    const getExams = async () => {
        try{
            const res = await fetchFromServer("/exams", "GET", {}, true)
            setExamsData(res.exams)
        }catch(error: any){
            addToast("error", error.message)
        }
    }

    return (
        <div className="w-full h-auto">
            <SelectGroup name="examId" label="Select an exam to continue" placeholder="Select an exam" options={examsData} value="Select an exam" handler={onExamSelect} />
        </div>
    )
}

export default SelectExam