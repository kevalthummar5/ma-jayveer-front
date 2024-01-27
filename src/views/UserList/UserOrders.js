import { Card, Col, Input, Label, ListGroup, Button, Row, ListGroupItem, Form, Spinner, ModalFooter, ModalBody } from "reactstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useContext, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import Select from "react-select"
import { InputOption, dummyItemOptions, exchangeOption, subjectOptions, tradeStatusOption } from "../../utils"
import { ArrowLeft } from "react-feather"
import Flatpickr from "react-flatpickr"
import { getOrdersOfUsers, postOrderForUser } from "../../myApiCenter"
import StockWiseQuantity from "./StockWiseQuantity"
import MainNav from "../MainNav/MainNav"
import { AuthContext } from "../../context/Can"
import UpdateOrder from "./UpdateOrder"

const UserOrders = (props) => {
   const [data, setdata] = useState(null)
   const [loading, setloading] = useState(false)
   const getOrderData = async () => {
      // console.log(password)
      try {
         // setloading(true)
         const j = await getOrdersOfUsers(props.userId)
         // console.log(j)
         const openOrders = j?.filter((e) => e.status === "open")
         if (openOrders?.length > 0) {
            setdata(openOrders)
         } else {
            toast.error("there is no open order found")
            props.setisModelOpen(false)
         }
      } catch (err) {
         console.log(err)
      } finally {
         // setloading(false)
         // toast.dismiss()
      }
   }

   useEffect(() => {
      getOrderData()
   }, [])
   // console.log(data)
   // console.log(stockOption)
   return (
      <>
         <div className="w-100">
            <Col>
               <ModalBody>
                  {data?.length > 0 &&
                     data?.map((e, index) => {
                        return <UpdateOrder key={index} data={e} userId={props.userId} getOrderData={getOrderData} />
                     })}
               </ModalBody>
               <ModalFooter>
                  <div className="me-auto">
                     <Button
                        className="me-auto ms-2 rounded-pill"
                        outline
                        color="secondary"
                        onClick={() => {
                           setisModelOpen(false)
                        }}
                     >
                        Cancel
                     </Button>
                  </div>
               </ModalFooter>
            </Col>
         </div>
      </>
   )
}
export default UserOrders
