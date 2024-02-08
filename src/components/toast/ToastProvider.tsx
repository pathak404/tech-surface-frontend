import { FC, ReactNode, createContext, useState } from 'react'
import { ToastContextType } from '../../types';
import Toast from './Toast';
import { ToastItemProps, ToastType } from '../../types/toast';

export const ToastContext = createContext<ToastContextType | null>(null);

const ToastProvider:FC<{children: ReactNode}> = ({children}) => {
  const [toasts, setToasts] = useState<ToastItemProps[]>([]);

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  const addToast = (type : ToastType, message: string, hideAfterSeconds: number = 5) : string => {
    const id: string = "toast_"+ (Math.random() + 1).toString(36).substring(7)
    const newToast: ToastItemProps = {id, type, message, onClose: removeToast}
    setToasts((prevToasts) => [...prevToasts, newToast])
    setTimeout(() => {
      removeToast(id)
    }, hideAfterSeconds*1000)
    return id;
  }


  return (
      <ToastContext.Provider value={{addToast, removeToast}} >
        {children}
        <Toast toasts={toasts} />
      </ToastContext.Provider>
  )
}

export default ToastProvider