import { ChangeEvent, FC, FormEvent, useContext, useState } from "react"
import InputGroup from "../../../components/InputGroup"
import PageHeader from "../../../components/PageHeader"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import Button from "../../../components/Button"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import SelectGroup from "../../../components/SelectGroup"

const Payment: FC<{studentId?: string, type: "Update" | "Add", updatePayments?: () => void}> = ({studentId, type, updatePayments}) => {

    const navigate = useNavigate()
    const {addToast} = useContext(ToastContext) as ToastContextType
    const prevPaymentData = (useLocation()).state.data
    const studentIdClone = studentId ?? useParams().studentId

    const formDataObject = {
        _id: prevPaymentData?._id ?? "not available",
        txnId: prevPaymentData?.txnId ?? "",
        amount: prevPaymentData?.amount ?? "",
        method: prevPaymentData?.method ?? "",
        description: prevPaymentData?.description ?? "",
        paidAt: prevPaymentData?.paidAt ?? "",
    }
    const [formData, setFormData] = useState<Record<string, string|undefined>>( {
        ...formDataObject
    })


    const typeMapper = {
        Add: {
            heading: "Add Payment",
            apiPath: `/students/${studentIdClone}/payments/new`,
            method: 'POST'
        },
        Update: {
            heading: "Payment Detail",
            apiPath: `/students/${studentIdClone}/payments/${formData._id}`,
            method: 'PUT'
        },
    }

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
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)




    const onMethodSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target){
            if(e.target.value === "online"){
                setFormData((prevData) => ({
                    ...prevData,
                    method: e.target.value,
                    txnId: prevData.txnId === "cash" ? "" : prevData.txnId,
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
            const res = await fetchFromServer(typeMapper[type].apiPath, typeMapper[type].method, formData, true)
            addToast("success", res.message)
            if(type==="Update"){
                navigate(-1)
            }else{
                (updatePayments as () => void)() 
                setFormData(formDataObject)
            }
        }catch(error: any){
            addToast("error", error.message)
        }finally{
            setLoading(false)
        }
    }


    const deletePayment = async () => {
        setDeleteLoading(true)
        const confirmDelete = confirm("Are you really sure you want to delete this payment?")
        if(confirmDelete){
            try{
                const res = await fetchFromServer(typeMapper[type].apiPath, "DELETE", {});
                addToast("success", res.message)
                navigate(-1);
            }catch(error: any){
                addToast("error", error.message)
            }finally {
                setDeleteLoading(false)
            }
        }else{
            setDeleteLoading(false)
        }
    }

    return (
        <div className={`w-full h-auto ${type==="Add" ? "mt-20" : ""}`}>
            <PageHeader type="button" isActionButton handler={deletePayment} loading={deleteLoading} arrow heading={typeMapper[type].heading} classNames={`btn-ghost ${type!=="Update" ? "hidden" : ""}`}> Delete Payment </PageHeader>

            <form className="flex flex-wrap flex-col gap-4" onSubmit={submitHandler}>
                <div className="basis-full inline-flex gap-4">
                    <SelectGroup name="method" options={options} value={(formData.method as string)?.length > 0 ? formData.method as string : "Select Payment Method"} label="Payment Method" placeholder="Select Payment Method" handler={onMethodSelect}/>
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
                    <Button type="submit" arrow loading={loading}>{type} Fee</Button>
                </div>
            </form>
        </div>
    )
}

export default Payment