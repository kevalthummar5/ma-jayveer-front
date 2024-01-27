import { Badge } from "reactstrap"
import { redirect } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import Select, { components } from "react-select"
import { FileText } from "react-feather"
import { getCookieByName } from "./myApiCenter"

export const InputOption = ({ getStyles, Icon, isDisabled, isFocused, isSelected, children, innerProps, ...rest }) => {
   const [isActive, setIsActive] = useState(false)
   const onMouseDown = () => setIsActive(true)
   const onMouseUp = () => setIsActive(false)
   const onMouseLeave = () => setIsActive(false)

   // styles
   let bg = "transparent"
   if (isFocused) bg = "#eee"
   if (isActive) bg = "#B2D4FF"

   const style = {
      alignItems: "center",
      backgroundColor: bg,
      color: "inherit",
      display: "flex "
   }

   // prop assignment
   const props = {
      ...innerProps,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      style
   }

   return (
      <components.Option {...rest} isDisabled={isDisabled} isFocused={isFocused} isSelected={isSelected} getStyles={getStyles} innerProps={props}>
         <input type="checkbox" readOnly checked={isSelected} />
         &nbsp; &nbsp; {children}
      </components.Option>
   )
}
export const customStyles = {
   rows: {
      style: {
         whiteSpace: "pre-line"
      },
      striped: {
         backgroundColor: "lightgray" // Set the background color for striped rows
      }
   },
   headcells: {
      style: {
         // justifyContent: "center",
         fontSize: "24px",
         lineHeight: "15px",
         letterSpacing: "1px",
         color: "#515C68",
         fontFamily: "Space Grotesk",
         fontStyle: "normal",
         fontWeight: "500",
         whiteSpace: "pre-line",
         backgroundColor: "#f9fafb",
         textTransform: "uppercase"
      }
   },
   cells: {
      style: {
         // justifyContent: "center",
         fontSize: "15px",
         lineHeight: "18px",
         letterSpacing: "1px",
         fontFamily: "Space Grotesk",
         fontStyle: "normal",
         fontWeight: "400",
         paddingLeft: "10px",
         // lineHeight: '21px',
         color: "#1B222B"
      }
   },
   table: {
      style: {
         minHeight: "50vh"
      }
   }
}
export const dummyItemOptions = [
   {
      value: 1,
      label: "BANKNIFTY",
      color: [
         { color: "green", quantity: 0 },
         { color: "kesari", quantity: 0 }
      ],
      price: 25,
      totalPrice: 0,
      totalQuantity: 0
   },
   {
      value: 2,
      label: "CRUDE",
      color: [
         { color: "blue", quantity: 0 },
         { color: "red", quantity: 0 },
         { color: "yellow", quantity: 0 }
      ],
      price: 26,
      totalPrice: 0,
      totalQuantity: 0
   },
   {
      value: 3,
      label: "shal",
      color: [
         { color: "gray", quantity: 0 },
         { color: "neon", quantity: 0 }
      ],
      price: 27,
      totalPrice: 0,
      totalQuantity: 0
   },
   {
      value: 4,
      label: "short",
      color: [
         { color: "light gray", quantity: 0 },
         { color: "bilu", quantity: 0 }
      ],
      price: 27,
      totalPrice: 0,
      totalQuantity: 0
   }
]

export const exchangeOption = [
   {
      value: "MCX",
      label: "MCX"
   },
   {
      value: "NFO",
      label: "NFO"
   },
   {
      value: "NSE",
      label: "NSE"
   }
]
export const tradeStatusOption = [
   {
      value: "BUY",
      label: "BUY",
      customStyle: { color: "white", backgroundColor: "green", fontWeight: "bold" }
   },
   {
      value: "SELL",
      label: "SELL",
      customStyle: { color: "white", backgroundColor: "red", fontWeight: "bold" }
   }
]
export const userStatus = {
   true: (
      <Badge pill color="light-success">
         <span className="align-middle ms-25">Active</span>
      </Badge>
   ),
   false: (
      <Badge pill color="light-danger">
         <span className="align-middle ms-25">Inactive</span>
      </Badge>
   )
}
export const userloader = () => {
   const user = JSON.parse(localStorage.getItem("user"))
   const token = getCookieByName("token1")
   // console.log(user.userRole)
   // console.log(token)
   if (user.userRole === "admin" && token) {
      return null
   } else if (user.userRole === "user" && token) {
      return redirect("/dashboard")
   } else {
      return redirect("/login")
   }
}
export const isoToLocale = (isoString) => {
   const date1 = new Date(isoString)

   // Use options to customize the date and time format
   const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
   }

   // Convert to locale string
   const localeString = date1.toLocaleString(undefined, options)
   // console.log(localeString.split("at")[1].split("GMT")[0])
   // Format the date string
   const formattedDateString = `${isoString.split("T")[0].split("-").reverse().join("/")} ,${localeString.split("at")[1].split("GMT")[0]}`

   return formattedDateString
   // console.log(localeString)
}
export const userAccessloader = () => {
   const user = JSON.parse(localStorage.getItem("user"))
   const token = getCookieByName("token1")
   // console.log(user?.userRole)
   // console.log(token)
   if (user?.userRole === "admin" && token) {
      return null
   } else if (user?.userRole === "user" && token) {
      return null
   } else {
      return redirect("/login")
   }
}
export const managerAccessloader = () => {
   const user = JSON.parse(localStorage.getItem("user"))
   const token = getCookieByName("token1")
   // console.log(user?.userRole)
   // console.log(token)
   if (user?.userRole === "admin" && token) {
      return null
   } else if (user?.userRole === "manager" && token) {
      return null
   } else {
      return redirect("/login")
   }
}
