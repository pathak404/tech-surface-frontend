import NotFoundImg from "../assets/not-found.svg"

const NotFound = () => {
  return (
    <div className="w-full -h-auto flex flex-col justify-center items-center gap-3">
        <img src={NotFoundImg} alt="not found" className="max-w-72 max-h-72"/>
        <p className="text-xl font-semibold">Sorry, No Data available to show</p>
    </div>
  )
}

export default NotFound