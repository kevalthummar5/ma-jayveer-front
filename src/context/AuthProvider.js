// ** React Imports

import { useState } from "react"

// import { dataGet } from "../Utils"

// ** auth context
import { AuthContext } from "./Can"

/**
 * This component is contextprovider consist of
 * user data(first name and last name ).
 *  this is responsible for main output data among
 * (userdropdown and profile)
 * @param   {props} param1 children (all components).
 * @return  {Component}  providercomponent to all
 * components of apps.
s */
const AuthProvider = (props) => {
   /**
    * This get userdata (by updating state and
    * from LogIn and Profile component) and
    * used at  UserDropdown and profile .
    */
   const [userData, setuserData] = useState(JSON.parse(localStorage.getItem("user")))

   const userDataSetter = (data) => {
      setuserData(data)
   }

   // const token = getCookieByName('token')

   return <AuthContext.Provider value={[userData, userDataSetter]}>{props.children}</AuthContext.Provider>
}
export default AuthProvider
