import { FC } from "react"
import { TableSkeletonType } from "../types"

const TableSkeleton: FC<TableSkeletonType> = ({rows, cols}) => {
  return (
    <div className="overflow-x-auto">
        <table className="table skeleton">
            <thead>
                <tr>
                    {Array.from({length: cols}, (_, index) => (<th key={"skeletonHead"+index}></th>) )}
                </tr>
            </thead>
            <tbody>
                { Array.from({length: rows}, (_, index1) => 
                  <tr key={'skeletonRow'+index1}>
                    {Array.from({length: cols}, (_, index2) => 
                      <td key={'skeletonCol'+index1+''+index2}></td>
                    )}
                  </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default TableSkeleton