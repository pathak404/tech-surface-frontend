import { FC, RefObject } from "react"
import { SidebarItemsType } from "../types"

import { MdHome } from "react-icons/md"
import { FaUserGraduate, FaClipboardList } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { HiRectangleGroup } from "react-icons/hi2";
import { GrScorecard } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { logout } from "../utils";

const navItems: SidebarItemsType = {
  topList: [
    {
      name: "Home",
      path: "/",
      icon: <MdHome className="w-6 h-6" />,
    },
    {
        name: "Students",
        path: "/students",
        icon: <FaUserGraduate className="w-6 h-6" />,
    },
    {
        name: "Courses",
        path: "/courses",
        icon: <FaBookOpen className="w-6 h-6" />,
    },
    {
        name: "Batches",
        path: "/batches",
        icon: <HiRectangleGroup className="w-6 h-6" />,
    },
    {
        name: "Exams",
        path: "/exams",
        icon: <FaClipboardList className="w-6 h-6" />,
    },
    {
        name: "Questions",
        path: "/questions",
        icon: <FaFileCircleQuestion className="w-6 h-6" />,
    },
    {
        name: "Results",
        path: "/results",
        icon: <GrScorecard className="w-6 h-6" />,
    },
  ],
  bottomList: [
    {
      name: "Logout",
      path: "/",
      icon: <IoLogOut className="w-6 h-6" onClick={() => logout()} />,
    },
  ],
};

const Sidebar: FC<{state: boolean, sidebarRef:RefObject<HTMLElement>}> = ({state, sidebarRef}) => {

  return (
    <aside 
    className={`fixed top-0 left-0 w-full h-screen transition-transform z-40 md:w-auto md:translate-x-0 ${state ? 'translate-x-0' : '-translate-x-100'}`}
    ref={sidebarRef}
    >
        <div className="w-64 h-full overflow-y-auto p-5 bg-base-200">
            <div className="text-left mb-6">
                <p className="text-2xl font-bold mb-px">Tech Surface</p>
                <p className="text-2xl font-black">Education</p>
            </div>

            <ul className="menu space-y-5 p-0">
                {navItems.topList.map((menu, index)=> 
                    <li key={"menu-"+index}>
                        <NavLink to={menu.path} className={({isActive}) => `inline-flex gap-3 text-lg "+ ${isActive ? "active" : ""}`}>
                          {menu.icon} {menu.name}
                        </NavLink>
                    </li>
                )}

                <li key="logout" className="absolute bottom-5 w-full">
                  <p className="inline-flex gap-3 text-lg max-w-52" onClick={() => logout()}><IoLogOut className="w-6 h-6" /> Logout </p>
                </li>
            </ul>
        </div>

    </aside>
  );
};

export default Sidebar;
