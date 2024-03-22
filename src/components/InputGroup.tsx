import { ChangeEvent, FC, useId } from "react";
import { InputGroupType } from "../types";



const InputGroup: FC<InputGroupType> = ({ type, name, value, label, placeholder, pattern, maxLength, disabled, handler }) => {
  const id = useId()
  const classMapper = {
    "text": "input input-bordered w-full",
    "number": "input input-bordered w-full",
    "datetime-local": "input input-bordered w-full",
    "date": "input input-bordered w-full",
    "password": "input input-bordered w-full",
    "email": "input input-bordered w-full",
    "file": "file-input w-full max-w-xs",
    "radio": "radio",
    "checkbox": "checkbox",
    "hidden": "hidden"
  }

  const classNames = classMapper[type]


  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(maxLength && e.target.value.length > maxLength){
      return;
    }else{
      if(handler) handler(e);
    }
  }

  const inputElement: JSX.Element = (
    <input
    type={type}
    placeholder={placeholder}
    className={classNames}
    name={name}
    value={value}
    onInput={inputHandler}
    maxLength={maxLength}
    pattern={pattern}
    id={id}
    disabled={disabled}
  />
  )

  return (
    type !='radio' && type !='checkbox'
    ? <label className="form-control w-full max-w-xs" htmlFor={id}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {inputElement}
    </label>
    : <div className="flex gap-3 my-6">{inputElement} <label className="label-text" htmlFor={id}>{label}</label></div>
  );
};

export default InputGroup;
