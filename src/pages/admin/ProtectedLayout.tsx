import { FC, ReactElement, useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { HiOutlineMenuAlt2 } from "react-icons/hi";


const ProtectedLayout:FC<{component: ReactElement}> = ({component}) => {
  const isloggedIn = localStorage.getItem("token")
  const [sidebarState, setSidebarState] = useState<boolean>(false)
  const sidebarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if(!isloggedIn){
      window.location.pathname = "/"
    }
    const handleSidebarClick = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement
      if(target && target.tagName === "ASIDE" || target.closest("a")){
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
          <HiOutlineMenuAlt2 onClick={setSBStatus} className="w-8 h-8 mb-5"/>
        </div>
        {component}
      </div>
    </>
    
  )
}

export default ProtectedLayout;
