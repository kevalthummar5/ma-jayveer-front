// ** React Imports

import { useEffect, useState } from "react"

// import { dataGet } from "../Utils"

// ** auth context
import { MobileUsersContext } from "./Can"

/**
 * This component is contextprovider consist of
 * user data(first name and last name ).
 *  this is responsible for main output data among
 * (userdropdown and profile)
 * @param   {props} param1 children (all components).
 * @return  {Component}  providercomponent to all
 * components of apps.
s */
const MobileUsersProvider = (props) => {
   /**
    * This get userdata (by updating state and
    * from LogIn and Profile component) and
    * used at  UserDropdown and profile .
    */
   const [idList, setidList] = useState({
      serial: "",
      id: ""
   })

   const idListSetter = (data) => {
      setidList(data)
   }
   // console.log(idList)
   // const token = getCookieByName('token')
   useEffect(() => {
      const mobileUser = localStorage.getItem("mobileUserIdList")
      // console.log(typeof mobileUser)
      if (mobileUser !== "undefined") {
         // console.log("true")
         setidList(JSON.parse(mobileUser))
      }

      return () => {}
   }, [])

   return <MobileUsersContext.Provider value={[idList, idListSetter]}>{props.children}</MobileUsersContext.Provider>
}
export default MobileUsersProvider
