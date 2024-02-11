import { FC, memo } from "react"
import { ToastItemProps, ToastTypeMapper } from "../../types"
import { MdCancel, MdCheckCircle, MdWarning, MdClose } from "react-icons/md"

const ToastItem:FC<ToastItemProps> = ({onClose, message, type, id}) => {

    const ToastTypeMapper: ToastTypeMapper = {
        error: {
            icon: <MdCancel className="w-6 h-6" />,
            className: "alert-error"
        },
        success: {
            icon: <MdCheckCircle className="w-6 h-6" />,
            className: "alert-success"
        },
        info: {
            icon: <MdWarning className="w-6 h-6" />,
            className: "alert-info"
        }
    }
    const TypeData = ToastTypeMapper[type] ?? ToastTypeMapper.info

  return (

        <div className={"alert gap-1 "+ TypeData.className}>
            {TypeData.icon} {message}
            <MdClose className="w-4 h-4" onClick={() => onClose(id)} />
        </div>
  )
}

export default memo(ToastItem, (prevToastItem, nextToastItem) => prevToastItem.id !== nextToastItem.id)