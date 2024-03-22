import { ChangeEvent, FC, FormEvent, useContext, useState } from "react"
import InputGroup from "../../../components/InputGroup"
import PageHeader from "../../../components/PageHeader"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import Button from "../../../components/Button"
import { useNavigate } from "react-router-dom"
import SelectGroup from "../../../components/SelectGroup"

const Payment: FC<{studentId: string}> = ({studentId}) => {

    const navigate = useNavigate()
    const {addToast} = useContext(ToastContext) as ToastContextType
    const [formData, setFormData] = useState<Record<string, string|undefined>>({
        txnId: "",
        amount: "",
        method: "",
        description: "",
        paidAt: "",
    })

    const options = [
        {
            method: "cash",
            name: "Cash"
        },
        {
            method: "online",
            name: "Online (UPI/Bank Transfer)"
        },
    ]

    const [loading, setLoading] = useState<boolean>(false)




    const onMethodSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target){
            if(e.target.value === "online"){
                setFormData((prevData) => ({
                    ...prevData,
                    method: e.target.value,
                    txnId: "",
                }))
            }else{
                setFormData((prevData) => ({
                    ...prevData,
                    method: e.target.value,
                    txnId: "cash",
                }))
            }
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
            const res = await fetchFromServer(`/students/${studentId}/payments/new`, "POST", formData, true)
            addToast("success", res.message)
            navigate("/students")
        }catch(error: any){
            addToast("error", error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-auto mt-20">
            <PageHeader isActionButton={false} heading="Add Payment" />

            <form className="flex flex-wrap flex-col gap-4" onSubmit={submitHandler}>
                <div className="basis-full inline-flex gap-4">
                    <SelectGroup name="method" options={options} value={(formData.method as string).length > 0 ? formData.method as string : "Select Payment Method"} label="Payment Method" placeholder="Select Payment Method" handler={onMethodSelect}/>
                </div>
                {formData.method === "online" && <div className="basis-full inline-flex gap-4">
                    <InputGroup type="text" name="txnId" value={formData.txnId} label="Transaction ID" placeholder="Enter Transaction ID" handler={inputHandler} />
                </div>}
                <div className="basis-full inline-flex gap-4">
                    <InputGroup type="number" name="amount" value={formData.amount} label="Payment Amount" placeholder="Enter Payment Amount" handler={inputHandler} />
                </div>
                <div className="basis-full inline-flex gap-4">
                    <InputGroup type="text" name="description" value={formData.description} label="Remarks" placeholder="Anything about the payment ..." handler={inputHandler} maxLength={50} />
                </div>
                <div className="basis-full inline-flex gap-4">
                    <InputGroup type="datetime-local" name="paidAt" value={formData.paidAt} label="Transaction Date" placeholder="Select Payment Date" handler={inputHandler} />
                </div>
                <div className="w-auto mt-4">
                    <Button type="submit" arrow loading={loading}>Add Fee</Button>
                </div>
            </form>
        </div>
    )
}

export default Payment