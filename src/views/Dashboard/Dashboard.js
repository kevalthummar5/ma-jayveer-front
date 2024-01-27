import { useContext } from "react"
import MainNav from "../MainNav/MainNav"
import LogInWithKite from "./LogInWithKite"
import { AuthContext } from "../../context/Can"
import { Link } from "react-router-dom"

const Dashboard = () => {
   const [userData, userDataSetter] = useContext(AuthContext)
   // console.log(userData)
   return (
      <>
         <MainNav />
         <div className="">
            <h1>Dashboard</h1>
            <div className="d-flex gap-4 justify-content-center ">
               <Link to={`/users/edit/${userData?._id}`}>Edit My Details</Link>
               <Link to={`/users/View/${userData?._id}`}>View Profile</Link>
            </div>

            <LogInWithKite />
         </div>
      </>
   )
}

export default Dashboard
