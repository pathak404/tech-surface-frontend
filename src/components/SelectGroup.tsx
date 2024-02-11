import { FC } from "react"
import { SelectGroupType } from "../types"

const SelectGroup: FC<SelectGroupType> = ({options, name, label, placeholder, disabled, value, handler}) => {

  return (
    <label className="form-control w-full max-w-xs">
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
        <select className="select select-bordered" name={name} onChange={handler} disabled={disabled} value={value}>
            <option disabled>{placeholder}</option>
            {options.map((option, index) => (
                <option value={option[name]} key={name+index}>{option.name}</option>
            ))}
        </select>
    </label>
  )
}

export default SelectGroup