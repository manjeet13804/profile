import { useEffect, useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom"
import Logout from "./logout"
import "./dashboard.css"
import Update from "./update";
import Password from "./password";
const Dashboard=()=>{
const userId = localStorage.getItem("userId")
const [userName, setUserName] = useState("")
const [update,setUpdate]=useState(false)
const [password,setPassword]=useState(false)
  useEffect(() => {
    if (userId) setUserName(userId.split("@")[0]);
    else setUserName("")
  }, [userId])
const [open,setOpen]=useState(false)
    return <>
    <div className="">
    <nav className="headercontainer">
      {userId && <div className="userid">USER ID:{userId} </div>}
      <div className="header-menu">
        <Link to="/">
          {!userId && <span className="menu">Login</span>}
        </Link>
      </div>
      {userId && <div className="update" onClick={()=>setUpdate(true)}>Update</div>}
      {userId && <div className="passward" onClick={()=>setPassword(true)}>change password</div>}
      {userId && <div className="dropdown" onClick={() => setOpen(!open)}>
        <BiUser />
        {userName}
        <CgChevronDown />
        {open && <div className="dropdown-content">
          <span >
            <Logout ></Logout>
          </span>
        </div>}
      </div>}
    </nav>
    {update && <>
        <Update setUpdate={setUpdate}/>
    </>}
    {password && <>
  <Password  setPassword={setPassword}/>
    </>}
  </div>
  </>
}
export default Dashboard;