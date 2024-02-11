import { FC } from "react"
import { TableType } from "../types"
import { useNavigate } from "react-router-dom"

const Table: FC<TableType> = ({data, isClickable, primaryKey, initialPath, keyNameMapper}) => {
    const navigate = useNavigate()
  return (
    <div className="overflow-x-auto">
    <table className="table">
        <thead>
            <tr>
                {Object.keys(data[0]).map((head, index) => (<th key={"tableHead"+index}>{keyNameMapper? keyNameMapper[head] : head}</th>) )}
            </tr>
        </thead>
        <tbody>
            { data.map((row, index1) => 
                <tr 
                key={'tableRow'+index1} 
                onClick={isClickable ? ()=>navigate(initialPath+"/"+row[primaryKey as string]) : undefined}
                className="hover cursor-pointer"
                >
                    {Object.keys(row).map((key, index2) => 
                    <td key={'tableCol'+index1+''+index2}>{row[key]}</td>
                    )}
                </tr>
            )}
        </tbody>
    </table>
</div>
  )
}

export default Table