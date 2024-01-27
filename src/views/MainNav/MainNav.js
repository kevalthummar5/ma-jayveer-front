import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/Can"
import { useContext } from "react"
const MainNav = () => {
   // const token = gettoken()
   const [userData, userDataSetter] = useContext(AuthContext)

   // console.log(userData)
   return (
      <div className="my-main-nav d-flex  justify-content-between align-items-center">
         <NavLink to={"/"}>
            <span style={{ scale: "1", listStyle: "none", marginTop: "50px" }}>{/* <img src={logo} alt="logo" /> */}</span>
         </NavLink>

         <div className="list-unstyled ms-auto d-flex align-items-center ">
            {userData?.login && (
               <div className="d-block ">
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/dashboard"}>
                     DASH BOARD
                  </NavLink>
               </div>
            )}
            <div className="d-block ">
               <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/about"}>
                  ABOUT US
               </NavLink>
            </div>
            <div className="d-block ">
               <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/contact"}>
                  CONTACT US
               </NavLink>
            </div>
            {(userData?.userRole === "admin" || userData?.userRole === "manager") && (
               <div className="d-block ">
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/unlogged-user"}>
                     UNLOGGED USER
                  </NavLink>
               </div>
            )}
            {userData?.userRole === "admin" && (
               <div className="d-block ">
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/stocks"}>
                     STOCKS
                  </NavLink>
               </div>
            )}
            {userData?.userRole === "admin" && (
               <div className="d-block ">
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/users"}>
                     USERS
                  </NavLink>
               </div>
            )}
            {!userData?.login && (
               <div className="d-block ">
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/signup"}>
                     SIGN UP
                  </NavLink>
               </div>
            )}
            {userData?.login ? (
               <div className="d-block ">
                  <NavLink onClick={() => userDataSetter({})} className={({ isActive }) => (isActive ? "active" : "")} to={"/login"}>
                     LOG OUT
                  </NavLink>
               </div>
            ) : (
               <div className="d-block ">
                  <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/login"}>
                     LOG IN
                  </NavLink>
               </div>
            )}
         </div>
      </div>
   )
}

export default MainNav
