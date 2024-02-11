import { ChangeEvent, MouseEvent, ReactElement, ReactNode } from "react";
import { ToastItemProps, ToastProps, ToastContextType, ToastTypeMapper } from "./toast"
export type {ToastItemProps, ToastProps, ToastContextType, ToastTypeMapper}


export type SidebarItem = {
    icon: JSX.Element;
    name: string;
    path: string;
}

export type UserType = "admin" | "student";

export type SidebarItemsType = {
    topList: SidebarItem[];
    bottomList: SidebarItem[];
}

export type InputGroupType = {
    type: "hidden" | "text" | "checkbox" | "radio" | "number" | "email" | "password" | "datetime-local" | "date";
    name: string;
    value?: string;
    label?: string;
    placeholder?: string;
    handler?: (e: ChangeEvent<HTMLInputElement>) => void;
    pattern?: string;
    maxLength?: number;
    disabled?: boolean;
}

export type SelectGroupType = {
    options: {[key: string] : string}[];
    name: string;
    label: string;
    placeholder: string;
    disabled?: boolean;
    handler?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export type ButtonTypeMapper = {
    link: ReactElement;
    submit: ReactElement;
}


type CommonButtonType = {
    children: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    arrow?: boolean;
    classNames?: string;
    handler?: (e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => void
}

type SubmitButtonType = {
    type: "submit";
    path?: never;
}

type LinkButtonType = {
    type: "link";
    path: string;
}

export type ButtonType = (SubmitButtonType | LinkButtonType) & CommonButtonType

export type SearchType = {
    value?: string;
    handler: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    loading?: boolean;
}


export type TableSkeletonType = {
    rows: number;
    cols: number;
    // header: string[];
}

export type TableType = {
    data: {[key: string]: any}[];
    isClickable?: boolean;
    primaryKey?: string;
    initialPath?: string;
    keyNameMapper?: {
        [key: string]: string
    };
}

export type PageHeaderAction = { heading: string; isActionButton: true } & LinkButtonType & CommonButtonType;
type PageHeaderDefault = { heading: string; isActionButton: false };
export type PageHeaderType = PageHeaderAction | PageHeaderDefault;

export type FetchFromServer = {
    success: boolean;
    message: string;
    [key: string]: any
}