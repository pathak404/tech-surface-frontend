import { FC, ReactElement, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { HiOutlineMenuAlt2 } from "react-icons/hi";


const ProtectedLayout:FC<{component: ReactElement}> = ({component}) => {
  // const isloggedIn = localStorage.getItem("token") ?? 
  const isloggedIn = true
  const [sidebarState, setSidebarState] = useState<boolean>(false)
  const sidebarRef = useRef<HTMLElement>(null)

  return (
    
    isloggedIn && 
    <>
      <Sidebar state={sidebarState} sidebarRef={sidebarRef} />
      <div className="md:ml-64 min-h-screen p-5">
        <div className="md:hidden">
          <HiOutlineMenuAlt2 />
        </div>
        {component}
      </div>
    </>
    
  )
}

export default ProtectedLayout;
