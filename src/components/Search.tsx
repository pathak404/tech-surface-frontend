import { FC } from "react"
import { SearchType } from "../types"


const Search: FC<SearchType> = ({value, placeholder, handler}) => {
  return (
      <div className="inline-flex">
        <input 
        type="text" 
        name="search" 
        value={value}
        placeholder={placeholder}
        onInput={handler}
        className="input input-bordered w-full max-w-xs"
        />
      </div>
  )
}

export default Search