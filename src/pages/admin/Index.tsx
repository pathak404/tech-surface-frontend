import { useContext, useEffect, useState } from "react"
import PageHeader from "../../components/PageHeader"
import { fetchFromServer } from "../../utils"
import { ToastContext } from "../../components/toast/ToastProvider"
import { ToastContextType } from "../../types"

const Index = () => {
  const cardTitles = ["Students", "Courses", "Batches"]
  const [statistic, setStattistic] = useState([])
  const [loading, setLoading] = useState(true)
  const {addToast} = useContext(ToastContext) as ToastContextType

  useEffect(() => {
    getStatistic()
  }, [])


  const getStatistic = async () => {
    try{
      const res = await fetchFromServer("/statistic", "GET", {}, true)
      setStattistic(res.statistic)
    }catch(error: any){
      addToast("error", error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader isActionButton={false} heading="Home" />
      <h1 className="text-2xl font-semibold py-4 mb-2">Hello 👋, Admin</h1>
      <div className="w-full flex flex-col sm:flex-row flex-warp gap-4">
        {!loading ? statistic.map((stx, index) => (
          <div className="card sm:w-72 bg-slate-200" key={"statistic-card-"+index}>
          <div className="card-body">
            <p className="font-medium">Total {cardTitles[index]}</p>
            <h2 className="text-5xl font-black">{stx}</h2>
          </div>
        </div>
        ))
      
        : Array.from({length: 3}, (_, index) => (
          <div key={"skeleton-card-"+index} className="w-72 h-32 skeleton"></div>
        ))
      
      }

      </div>
    </>
  )
}

export default Index