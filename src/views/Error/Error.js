import { useContext } from "react"
import { AuthContext } from "../../context/Can"
import { Link } from "react-router-dom"

const Error = () => {
   const [userData, userDataSetter] = useContext(AuthContext)
   // console.log(userData)
   return (
      <>
         <div className="RootLayout">
            <h1>Error</h1>
            {userData?.login ? <Link to={`/dashboard`}>DASH BOARD</Link> : <Link to={`/home`}>HOME</Link>}
         </div>
      </>
   )
}

export default Error
