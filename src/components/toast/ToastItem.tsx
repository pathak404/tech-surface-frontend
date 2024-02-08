import { FC, memo } from "react"
import { ToastItemProps, ToastTypeMapper } from "../../types"
import { MdCancel, MdCheckCircle, MdWarning, MdClose } from "react-icons/md"

const ToastItem:FC<ToastItemProps> = ({onClose, message, type, id}) => {

    const ToastTypeMapper: ToastTypeMapper = {
        error: {
            icon: <MdCancel />,
            className: "alert-error"
        },
        success: {
            icon: <MdCheckCircle />,
            className: "alert-success"
        },
        info: {
            icon: <MdWarning />,
            className: "alert-info"
        }
    }
    const TypeData = ToastTypeMapper[type] ?? ToastTypeMapper.info

  return (

        <div className={"alert "+ TypeData.className}>
            {TypeData.icon} &nbsp; {message}
            <MdClose onClick={() => onClose(id)} />
        </div>
  )
}

export default memo(ToastItem, (prevToastItem, nextToastItem) => prevToastItem.id !== nextToastItem.id)