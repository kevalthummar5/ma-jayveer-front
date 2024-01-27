import { Link, NavLink, useNavigate } from "react-router-dom"
// import logo from "../assets/logo.PNG"
import { FaEnvelope, FaLock, FaModx, FaPhone, FaUser } from "react-icons/fa"
import { useState } from "react"
import { Button, FormGroup, Input, Label, Popover, PopoverBody, PopoverHeader, Spinner } from "reactstrap"
import { postSignUp } from "../../myApiCenter"
import MainNav from "../MainNav/MainNav"
// import { facultyLogin, studentLogin } from "../myApiCenter"
// import { AuthContext } from "../context/Can"

const SignUp = () => {
   const navigate = useNavigate()
   const [data, setdata] = useState({
      name: "",
      password: "",
      email: "",
      mobileNo: "",
      clientId: "",
      isSigned: false,
      userRole: "user"
   })
   const [popoverOpen, setPopoverOpen] = useState(false)

   const toggle = () => setPopoverOpen(!popoverOpen)

   const [loading, setloading] = useState(false)

   const inputHandler = (e) => {
      setdata({ ...data, [e.target.name]: e.target.value })
   }
   const submitHandler = async (e) => {
      e.preventDefault()
      setloading(true)
      // console.log(data)
      try {
         //  if (props.title === "students") {
         const j = await postSignUp(data)
         //    console.log(j)
         if (j) {
            navigate("/login")
         }
      } catch (error) {
         console.log(error)
      } finally {
         setloading(false)
         setdata({
            name: "",
            password: "",
            email: "",
            mobileNo: "",
            clientId: "",
            isSigned: false
         })
      }
   }

   return (
      <>
         <MainNav />
         <div className="w-75   login-box">
            <div className="w-75 me-auto d-flex text-primary" style={{ padding: "10px 23px" }}>
               <NavLink className="" to={"/"}>
                  {/* <img className="m-2" src={logo} alt="logo" /> */}
               </NavLink>
            </div>
            <div className="text-primary d-flex flex-column align-items-center ">
               <h1>Sign Up to DHAN HIKE </h1>
               <form onSubmit={submitHandler} className="d-flex w-75 flex-column ">
                  <div className="mb-4 w-100 login-input">
                     <i>
                        <FaUser />
                     </i>
                     <input
                        required
                        //  value={data.email}
                        onChange={inputHandler}
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                     />
                  </div>
                  <div className="mb-4  login-input">
                     <i>
                        <FaEnvelope />
                     </i>
                     <input required value={data.email} onChange={inputHandler} name="email" type="email" placeholder="Enter your Email" />
                  </div>
                  <div className="mb-4  login-input">
                     <i style={{ rotate: "90deg" }}>
                        <FaPhone />
                     </i>
                     <input
                        required
                        value={data.mobileNo}
                        onChange={inputHandler}
                        name="mobileNo"
                        type="number"
                        placeholder="Enter your Mobile Number"
                     />
                  </div>
                  <div className="mb-4  login-input">
                     <i>
                        <FaModx />
                     </i>
                     <input
                        required
                        value={data.clientId}
                        onChange={(e) => setdata({ ...data, clientId: e.target.value })}
                        name="client"
                        type="text"
                        placeholder="Angel Client Id  ex.XY7854 "
                     />
                  </div>
                  <div className="mb-4 login-input">
                     <i>
                        <FaLock />
                     </i>
                     <input
                        required
                        minLength="6"
                        //  value={data.password}
                        name="password"
                        onChange={inputHandler}
                        type="password"
                        placeholder="Enter your Password"
                     />
                  </div>
                  <div className="mb-4 ">
                     <input
                        required
                        // minLength="6"
                        value={data.isSigned}
                        // name="password"
                        style={{ scale: "1.2" }}
                        onChange={(e) => {
                           // console.log(e.target.checked)
                           setdata({ ...data, isSigned: e.target.checked })
                        }}
                        type="checkbox"
                        // placeholder="Enter your Password"
                     />
                     <span className="ms-3">
                        I accept{" "}
                        <span id="Popover1" type="button" style={{ textDecoration: "underline" }} onClick={toggle}>
                           terms and condition
                        </span>
                        <Popover placement="top" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                           <PopoverHeader>terms and condition</PopoverHeader>
                           <PopoverBody>
                              <p>I will daily login to site and save my token before 9 am on every trading day</p>

                              <p>
                                 Algorithmic trading carries a high level of risk and may not be suitable for all investors. The strategies used by
                                 our Algorithmic trading bots are based on historical data and do not guarantee future results. Our trading bots may
                                 not perform as expected due to unforeseen market conditions, technical issues, or other factors. Dhanhike does not
                                 guarantee any specific returns or outcomes, and user should be prepared to potentially lose a portion of his/her
                                 investment. Before investing, please consult with a financial advisor to determine if Algorithmic trading is
                                 appropriate for your financial situation and goals. Dhanhike cannot be held responsible for any losses incurred by
                                 using Dhanhike and users assume full responsibility for their investment decisions
                              </p>
                           </PopoverBody>
                        </Popover>
                     </span>
                  </div>
                  <div className="login-btn-grp">
                     {" "}
                     <button type="submit" disabled={loading} className="mt-3">
                        Sign Up {loading && <Spinner size="sm" color="light" />}
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
export default SignUp
