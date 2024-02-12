import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react"
import InputGroup from "../../../components/InputGroup"
import SelectGroup from "../../../components/SelectGroup"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import Button from "../../../components/Button"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const Question: FC<{type: "Update" | "Add"}> = ({type}) => {
    const {examId, questionId} = useParams()
    const navigate = useNavigate()
    const prevQuestionData = (useLocation()).state?.data
    const {addToast} = useContext(ToastContext) as ToastContextType
    const [formData, setFormData] = useState<Record<string, string|undefined>>({
        question: prevQuestionData?.question ?? "",
        answer: prevQuestionData?.answer ?? "",
        optionA: prevQuestionData?.options[0] ?? "",
        optionB: prevQuestionData?.options[1] ?? "",
        optionC: prevQuestionData?.options[2] ?? "",
        optionD: prevQuestionData?.options[3] ?? "",
    })

    useEffect(()=> {
        if(type==="Update"){
            formData["questionId"] = prevQuestionData.questionId
        }
    }, [])

    const answerOptions = [
        {
            answer: "0",
            name: "Option A"
        },
        {
            answer: "1",
            name: "Option B"
        },
        {
            answer: "2",
            name: "Option C"
        },
        {
            answer: "3",
            name: "Option D"
        },
    ]

    const typeMapper = {
        Update: {
            heading: "Question Details",
            btnText: "Update question",
            apiPath: `/exams/${examId}/questions/${formData.questionId || questionId}`,
            method: "PUT",
        },
        Add: {
            heading: "New Question",
            btnText: "Add Question",
            apiPath: `/exams/${examId}/questions/new`,
            method: "POST",
        }
    }

    const [loading, setLoading] = useState<boolean>(false)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)



    const deleteQuestion = async () => {
        setDeleteLoading(true)
        try{
            const res = await fetchFromServer(typeMapper[type].apiPath, "DELETE", {}, true)
            addToast("success", res.message)
            navigate(`/exams/${examId}/questions/`)
        }catch(error: any){
            addToast("error", error.message)
        }finally{
            setDeleteLoading(false)
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


    const onAnswerSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target){
            setFormData((prevData) => ({
                ...prevData,
                answer: e.target.value,
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
        const newFormData = {
            options: [formData.optionA, formData.optionB, formData.optionC, formData.optionD],
            ...formData
        }
        try{
            const res = await fetchFromServer(typeMapper[type].apiPath, typeMapper[type].method, newFormData, true)
            addToast("success", res.message)
            navigate(`/exams/${examId}/questions`)
        }catch(error: any){
            addToast("error", error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-auto">
            <div className="w-full h-auto inline-flex justify-between px-2">
                <div className="self-start">
                    <h1 className="text-2xl font-bold">{typeMapper[type].heading}</h1>
                </div>
                <div className="self-end">
                    {type === "Update" && <Button type="submit" loading={deleteLoading} arrow classNames="btn-ghost" handler={deleteQuestion}>Delete Question</Button>}
                </div>
            </div>
            <div className="divider divider-vertical"></div>

            <form className="flex flex-wrap flex-col gap-4" onSubmit={submitHandler}>
                <div className="basis-full inline-flex gap-4">
                    <InputGroup type="text" name="question" value={formData.question} label="Question" placeholder="Enter The Question" handler={inputHandler} />
                    <SelectGroup name="answer" label="Choose Answer" placeholder="Select an answer" options={answerOptions} value={formData.answer?.length ? formData.answer as string : "Select an answer" } handler={onAnswerSelect} />
                </div>
                <div className="basis-full inline-flex gap-4">
                    <InputGroup type="text" name="optionA" value={formData.optionA} label="Option A" placeholder="Enter The Option A" handler={inputHandler} />
                    <InputGroup type="text" name="optionB" value={formData.optionB} label="Option B" placeholder="Enter The Option B" handler={inputHandler} />
                </div>
                <div className="basis-full inline-flex gap-4">
                    <InputGroup type="text" name="optionC" value={formData.optionC} label="Option C" placeholder="Enter The Option C" handler={inputHandler} />
                    <InputGroup type="text" name="optionD" value={formData.optionD} label="Option D" placeholder="Enter The Option D" handler={inputHandler} />
                </div>
                <div className="w-auto mt-4">
                    <Button type="submit" arrow loading={loading}>{typeMapper[type].btnText}</Button>
                </div>
            </form>
        </div>
    )
}

export default Question