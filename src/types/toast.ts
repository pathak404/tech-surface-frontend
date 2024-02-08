
export type ToastType = "error" | "success" | "info"
export type ToastTypeMapper = {
    error: {
        className: string,
        icon: JSX.Element
    },
    success: {
        className: string,
        icon: JSX.Element
    },
    info: {
        className: string,
        icon: JSX.Element
    }
}
export type ToastItemProps = {
    type: ToastType;
    id: string;
    message: string;
    onClose: (id: string) => void;
}

export type ToastProps = {
    toasts: ToastItemProps[];
}

export type ToastContextType = {
    addToast: (type: ToastType, message: string, hideAfterSeconds?: number) => string
    removeToast: (id: string) => void
}