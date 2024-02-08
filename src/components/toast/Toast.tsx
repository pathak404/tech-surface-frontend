import { FC } from "react"
import { ToastProps } from "../../types"
import ToastItem from "./ToastItem"

const Toast:FC<ToastProps> = ({toasts}) => {
  return (
    <div className="toast toast-end toast-top">
        {toasts.map((toast) => 
            <ToastItem {...toast} key={toast.id}/>
        )}
    </div>
  )
}

export default Toast