import { FC } from "react"
import Button from "./Button"
import { SearchType } from "../types"


const Search: FC<SearchType> = ({value, placeholder, handler, loading}) => {
  return (
    <div className="join join-horizontal">
      <div className="inline-flex">
        <input 
        type="text" 
        name="search" 
        value={value}
        placeholder={placeholder}
        onInput={handler}
        className="input input-bordered w-full max-w-xs join-item"
        />
        <Button type="submit" arrow loading={loading} classNames="join-item no-animation btn-neutral"> </Button>
      </div>
    </div>
  )
}

export default Search