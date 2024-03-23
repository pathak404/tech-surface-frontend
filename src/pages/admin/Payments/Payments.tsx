import { FC, useContext, useEffect, useState } from "react"
import { ToastContext } from "../../../components/toast/ToastProvider"
import { ToastContextType } from "../../../types"
import { fetchFromServer } from "../../../utils"
import PageHeader from "../../../components/PageHeader"
import TableSkeleton from "../../../components/TableSkeleton"
import Table from "../../../components/Table"

const Payments: FC<{studentId: string}> = ({studentId}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [paymentsData, setPaymentsData] = useState<{[Key: string]: any}[]>([])
    const {addToast} = useContext(ToastContext) as ToastContextType
    const [totalPaid, setTotalPaid] = useState<number|undefined>(undefined)

    const keyNameMapper: {[key: string]: string} = {
        txnId: "Transaction ID",
        amount: "Amount",
        method: "Payment Method",
        description: "Remarks",
        paidAt: "Paid At"
    }

    
    useEffect(() => {
      fetchPayments()
    }, [])

    const fetchPayments = async () => {
      try{
        const res = await fetchFromServer(`/students/${studentId}/payments`, "GET", {}, true)
        setPaymentsData(res.payments)
        setLoading(false)
        let amount = 0;
        res.payments.map((payment: any) => {
          amount += payment.amount
        })
        setTotalPaid(amount)
      }catch(error: any){
        addToast("error", error.message)
      }
    }


    return (
        <div className="my-20">
        <PageHeader 
        heading={totalPaid==undefined ? "Payments" : <>Payments <span className="text-sm">( Paid till now: {totalPaid} )</span></>} 
        isActionButton={false}>
        </PageHeader>
        <div className="space-y-5 mt-3">
          {loading
          ? <TableSkeleton rows={30} cols={5} />
          : <Table 
          data={paymentsData}
          isClickable
          initialPath={`/students/${studentId}/payments`}
          primaryKey="_id"
          keyNameMapper={keyNameMapper} 
          />
          }
        </div>
      </div>
    )
}

export default Payments