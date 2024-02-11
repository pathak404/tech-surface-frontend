import { FC } from "react"
import { TableType } from "../types"
import { useNavigate } from "react-router-dom"
import NotFound from "./NotFound"

const Table: FC<TableType> = ({data, isClickable, primaryKey, initialPath, keyNameMapper}) => {
    const navigate = useNavigate()
    const keys = Array.from(Object.keys(keyNameMapper))
  return (
    data.length ? 
    <div className="overflow-x-auto">
        <table className="table">
            <thead>
                <tr>
                    {Object.keys(data[0]).map((head, index) => {
                            if(!keys.includes(head)) return; 
                            return (<th key={"tableHead"+index}>{keyNameMapper? keyNameMapper[head] : head}</th>) 
                        }
                    )}
                </tr>
            </thead>
            <tbody>
                { data.map((row, index1) => 
                    <tr 
                    key={'tableRow'+index1} 
                    onClick={isClickable ? ()=>navigate(initialPath+"/"+row[primaryKey as string], { state: {data: row}}) : undefined}
                    className="hover cursor-pointer"
                    >
                        {Object.keys(row).map((key, index2) => {
                                if(!keys.includes(key)) return; 
                                return <td key={'tableCol'+index1+''+index2}>{row[key]}</td>
                            }
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    </div>
    : <NotFound />
  )
}

export default Table