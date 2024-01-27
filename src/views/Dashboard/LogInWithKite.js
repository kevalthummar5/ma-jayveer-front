import { useState } from "react"
import { useLocation } from "react-router"
import { postRequestToken, postSendRequestToken } from "../../myApiCenter"
import toast from "react-hot-toast"
import { useContext } from "react"
import { AuthContext } from "../../context/Can"
import { Input } from "reactstrap"

const LogInWithKite = () => {
   const [userData, userDataSetter] = useContext(AuthContext)
   // console.log(userData)
   const location = useLocation()
   const query = new URLSearchParams(location.search)
   const token = query.get("auth_token")
   // console.log(token)
   const [apiKey, setapiKey] = useState(userData?.brokerDetail?.apiKey)
   const submitHandler = async () => {
      // console.log("sfs")
      try {
         const j = await postSendRequestToken({ authToken: token })
         // toast.dismiss()
         // console.log(j)
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <div className="login-with-kite-wrap">
         {/* <h1>LogInWithKite</h1> */}
         <h1>Jay Mat Bhavani</h1>
         <div className="redirect-home w-50">
            <Input value={apiKey} onChange={(e) => setapiKey(e.target.value)} />
            <button
               onClick={() => {
                  if (apiKey) {
                     window.location.replace(`https://smartapi.angelbroking.com/publisher-login?api_key=${apiKey}`)
                  } else {
                     toast.error("api key field should not be empty")
                  }
               }}
               className="my-kite-btn"
            >
               Redirect To Angel
            </button>
         </div>
         {/* {token && (
            <button
               onClick={() => {
                  postRequestToken({ token: token })
               }}
            >
               Start my Server
            </button>
         )} */}
         {token && (
            <button type="button" onClick={submitHandler} className="my-kite-btn">
               Save Token
            </button>
         )}
      </div>
   )
}

export default LogInWithKite
