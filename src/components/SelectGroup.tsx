import { FC } from "react"
import { SelectGroupType } from "../types"

const SelectGroup: FC<SelectGroupType> = ({options, name, label, placeholder, disabled, handler}) => {

  return (
    <label className="form-control w-full max-w-xs">
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
        <select className="select select-bordered" name={name} onSelect={handler} disabled={disabled}>
            <option disabled selected>{placeholder}</option>
            {options.map((option, index) => (
                <option value={option[name]} key={name+index}>{option.name}</option>
            ))}
        </select>
    </label>
  )
}

export default SelectGroup