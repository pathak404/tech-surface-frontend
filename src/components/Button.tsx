import { FC, MouseEvent, ReactElement } from 'react'
import { ButtonType } from '../types'
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { Link } from 'react-router-dom'

const Button: FC<ButtonType> = ({children, loading, arrow, disabled, type, path, classNames, handler}) => {

    const innerElement: ReactElement = (
        loading 
        ? <><span className="loading loading-spinner text-slate-300"></span><span className='text-slate-300'>Please Wait ...</span></>
        : <>{ children }{ arrow && <HiOutlineArrowNarrowRight className="w-5 h-5"/> }</>
    )

  return (
    type!=="link"
    ? <button className={`btn btn-primary inline-flex gap-3 items-center ${classNames}`} disabled={disabled} onClick={handler as (e: MouseEvent<HTMLButtonElement>) => void}>
        {innerElement}
    </button>
    : <Link to={path} className={`btn btn-neutral inline-flex gap-3 items-center ${classNames}`} onClick={handler as (e: MouseEvent<HTMLAnchorElement>) => void}>
        {innerElement}
    </Link>
  )
}

export default Button