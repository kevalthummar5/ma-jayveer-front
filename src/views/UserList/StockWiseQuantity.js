import { useContext, useEffect } from "react"
import { useState } from "react"
import { Input, Row } from "reactstrap"
import { AuthContext } from "../../context/Can"
import toast from "react-hot-toast"

const StockWiseQuantity = (props) => {
   const [userData, userDataSetter] = useContext(AuthContext)
   const oldQuantity = props.quantityAry[props.index]
   const oldActive = props.activeAry[props.index]

   // console.log(props.data)
   const quantityChangeHandler = (value) => {
      if (userData.userRole === "admin") {
         props.setdata((prev) => {
            const oldStockDetails = [...prev.stockDetail]
            oldStockDetails[props.index].quantity = +value
            // console.log(stockDetails)
            return { ...prev, stockDetail: oldStockDetails }
         })
      } else if (userData.userRole === "user") {
         props.setdata((prev) => {
            const oldStockDetails = [...prev.stockDetail]
            if (oldQuantity >= +value) {
               oldStockDetails[props.index].quantity = +value
               // console.log(stockDetails)
               return { ...prev, stockDetail: oldStockDetails }
            } else {
               toast.error("you can not increse quantity please contact admin")
               return { ...prev }
            }
         })
      }
   }

   const activeHandler = (e) => {
      // console.log(e.target.checked)
      if (userData.userRole === "admin") {
         props.setdata((prev) => {
            const oldStockDetails = [...prev.stockDetail]
            oldStockDetails[props.index].isActive = e.target.checked
            // console.log(stockDetails)
            return { ...prev, stockDetail: oldStockDetails }
         })
      } else if (userData.userRole === "user") {
         if (!e.target.checked || oldActive) {
            props.setdata((prev) => {
               const oldStockDetails = [...prev.stockDetail]
               oldStockDetails[props.index].isActive = e.target.checked
               // console.log(stockDetails)
               return { ...prev, stockDetail: oldStockDetails }
            })
         } else {
            toast.error("please contact admin for active")
         }
      }
   }
   useEffect(() => {
      return () => {
         // setitem(oldItem)
      }
   }, [props.data])

   // console.log(item)
   return (
      <div className=" p-3  mt-2 rounded my-stockwise-quantity">
         <h5>{props.data.label}</h5>
         <div className="d-flex gap-2 flex-row me-auto m-1 p-1 w-50 flex-wrap">
            <div className="d-flex gap-2 flex-row">
               <span>Quantity</span>
               <input
                  autoFocus
                  value={props.data.quantity}
                  style={{ width: "80px", height: "30px" }}
                  onChange={(e) => quantityChangeHandler(e.target.value)}
                  min={0}
                  type="number"
               />
            </div>
         </div>

         <div className="me-auto d-flex align-items-center" style={{ width: "350px" }}>
            <p className="h4 me-2 ">Active</p>
            <div className=" form-switch form-check-success">
               <Input
                  type="switch"
                  id=""
                  onChange={activeHandler}
                  name="success"
                  // disabled={userData.userRole === "user"}
                  checked={props.data.isActive}
               />
            </div>
         </div>
      </div>
   )
}
export default StockWiseQuantity
