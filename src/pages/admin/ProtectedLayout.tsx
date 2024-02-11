import { FC, ReactElement, useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


const ProtectedLayout:FC<{component: ReactElement}> = ({component}) => {
  const isloggedIn = localStorage.getItem("token")
  const [sidebarState, setSidebarState] = useState<boolean>(false)
  const sidebarRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isloggedIn){
      navigate("/")
    }
    const handleSidebarClick = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement
      if(target && target.tagName === "ASIDE"){
        setSBStatus()
      }
    };
    sidebarRef.current?.addEventListener("click", handleSidebarClick)
    return ()=> {
      sidebarRef.current?.removeEventListener("click", handleSidebarClick)
    }
  }, [sidebarRef])


  const setSBStatus = () => {
    setSidebarState((prev) => !prev)
  }
  return (
    isloggedIn && 
    <>
      <Sidebar state={sidebarState} sidebarRef={sidebarRef} />
      <div className="md:ml-64 min-h-screen p-5">
        <div className="md:hidden">
          <HiOutlineMenuAlt2 onClick={setSBStatus}/>
        </div>
        {component}
      </div>
    </>
    
  )
}

export default ProtectedLayout;
