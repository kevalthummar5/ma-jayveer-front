import { Link, NavLink, useNavigate } from "react-router-dom"
// import logo from "../assets/logo.PNG"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { useContext, useState } from "react"
import { Spinner } from "reactstrap"
import { deleteCookie, postLogin } from "../../myApiCenter"
import { AuthContext } from "../../context/Can"
import { useEffect } from "react"
import MainNav from "../MainNav/MainNav"

const Login = (props) => {
   const [, userDataSetter] = useContext(AuthContext)
   const navigate = useNavigate()
   const [data, setdata] = useState({
      email: "",
      password: ""
   })

   const inputHandler = (e) => {
      setdata({ ...data, [e.target.name]: e.target.value })
   }

   const [loading, setloading] = useState(false)

   const submitHandler = async (e) => {
      e.preventDefault()
      setloading(true)
      // console.log(data)
      try {
         //  if (props.title === "students") {
         const j = await postLogin(data)
         // console.log(j)
         if (j) {
            document.cookie = `token1=${j.token}`
            userDataSetter({ ...j.user, login: true })
            // console.log(j)

            localStorage.setItem("user", JSON.stringify({ ...j.user, login: true }))
            navigate("/dashboard")
         }
      } catch (error) {
         console.log(error)
      } finally {
         setloading(false)
         setdata({
            email: "",
            password: ""
         })
      }
   }

   useEffect(() => {
      localStorage.clear()
      deleteCookie("token1")
      userDataSetter({})
      // console.log("effect run")
      return () => {}
   }, [data])

   return (
      <>
         <MainNav />
         <div className="w-100 h-100 login-box">
            <div className="w-100 me-auto d-flex text-primary" style={{ padding: "10px 23px" }}>
               <NavLink className="" to={"/"}>
                  {/* <img className="m-2" src={logo} alt="logo" /> */}
               </NavLink>
            </div>

            <div className="text-primary d-flex flex-column align-items-center  h-50">
               <h1>Welcome to DHAN HIKE </h1>
               <form onSubmit={submitHandler} className="d-flex  flex-column ">
                  <div className="mb-4  login-input">
                     <i>
                        <FaEnvelope />
                     </i>
                     <input required value={data.email} onChange={inputHandler} name="email" type="email" placeholder="Enter your Email" />
                  </div>
                  <div className="mb-4 login-input">
                     <i>
                        <FaLock />
                     </i>
                     <input
                        required
                        minLength="6"
                        value={data.password}
                        name="password"
                        onChange={inputHandler}
                        type="password"
                        placeholder="Enter your Password"
                     />
                  </div>
                  <div className="login-btn-grp">
                     {" "}
                     <button type="submit" disabled={loading} className="mt-3">
                        Log In {loading && <Spinner size="sm" color="light" />}
                     </button>
                     <button className="mt-3" onClick={() => navigate("/home")}>
                        Back
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}
export default Login
