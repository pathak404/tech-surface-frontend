import { FC } from "react"
import { TableType } from "../types"
import { useNavigate } from "react-router-dom"
import NotFound from "./NotFound"
import Button from "./Button"
import { downloadCSV } from "../utils"

const Table: FC<TableType> = ({data, isClickable, primaryKey, initialPath, keyNameMapper, isDownloadble, filename}) => {
    const navigate = useNavigate()
    const keys = Array.from(Object.keys(keyNameMapper))
  return (
    data.length ? 
    <div className="overflow-x-auto">
        {/* {isDownloadble && <Button type="submit" classNames="btn-link btn-xs relative right-0 bottom-0 my-1" handler={() => downloadCSV(data, filename)}>Download CSV</Button>} */}
        {isDownloadble && <Button type="submit" classNames="btn-ghost btn-sm absolute left-[15rem] top-[9.5rem] md:left-[31rem] md:top-[6.5rem]" handler={() => downloadCSV(data, filename)}>Download CSV</Button>}
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