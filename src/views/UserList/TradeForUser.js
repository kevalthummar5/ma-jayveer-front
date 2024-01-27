import { Card, Col, Input, Label, ListGroup, Button, Row, ListGroupItem, Form, Spinner, ModalFooter, ModalBody } from "reactstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useContext, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import Select from "react-select"
import { InputOption, dummyItemOptions, exchangeOption, subjectOptions, tradeStatusOption } from "../../utils"
import { ArrowLeft } from "react-feather"
import Flatpickr from "react-flatpickr"
import {
   getAccountAsOption,
   getAllOrder,
   getDesignAsOption,
   getOrderById,
   getStockAsOption,
   getStockOption,
   getUserById,
   postOrder,
   postOrderForUser,
   putOrderById,
   putUser
} from "../../myApiCenter"
import StockWiseQuantity from "./StockWiseQuantity"
import MainNav from "../MainNav/MainNav"
import { AuthContext } from "../../context/Can"

const TradeForUser = (props) => {
   const toastContainerRef = useRef()
   const [expiryOptions, setexpiryOptions] = useState([])

   const { id } = useParams()
   const [data, setdata] = useState({
      tradingsymbol: "",
      transactiontype: "",
      exchange: "",
      quantity: 0,
      price: 0,
      userId: props.userId,
      autoUpdate: true
   })

   const [loading, setloading] = useState(false)
   const getOptionData = async () => {
      try {
         // console.log("called")

         toast.loading("fetching options")
         const j = await getStockOption()
         // const k = await getStockAsOption()
         // console.log(k)
         setexpiryOptions(j)
      } catch (error) {
         console.log(error)
      } finally {
         toast.dismiss()
      }
   }
   // console.log(expiryOptions)
   const submitHandler = async (e) => {
      e.preventDefault()
      delete data.value
      delete data.label
      let updatedQuantity = data.quantity * +data.lotsize
      // console.log(data)
      if (!(data.price > 0) || !(data.quantity > 0)) {
         toast.error("please provide appropiate quantity(should not zero or nagative) or price")
      } else if (!data.exchange) {
         toast.error("please select exchange")
      } else if (!data.transactiontype) {
         toast.error("please select trade status")
      } else {
         try {
            setloading(true)
            // console.log("ordered")

            const j = await postOrderForUser({ ...data, quantity: updatedQuantity })
            // console.log(j)
            if (j?.data?.newLog?.orderStatus === "complete") {
               toast.success("order placed and excuted successfully", {
                  duration: 100000,
                  container: toastContainerRef.current,
                  onClick: () => {
                     toast.dismiss()
                  } // Specify the click handler
               })
            } else if (j?.data?.newLog?.orderStatus === "rejected" || j?.data?.newLog?.orderStatus === "cancelled") {
               toast.error("order not excuted", {
                  duration: 100000,
                  container: toastContainerRef.current,
                  onClick: () => {
                     toast.dismiss()
                  } // Specify the click handler
               })
            } else if (j?.data?.newLog?.orderStatus === "open") {
               toast.error("order is open please update order to be excuted", {
                  duration: 100000,
                  container: toastContainerRef.current,
                  onClick: () => {
                     toast.dismiss()
                  } // Specify the click handler
               })
            }
         } finally {
            setloading(false)
         }
      }
   }
   useEffect(() => {
      const handleContainerClick = (event) => {
         // Dismiss the toast if the click occurs outside the toast container
         if (!toastContainerRef.current.contains(event.target)) {
            // toast.dismiss() // Dismiss all toasts
         }
      }
      getOptionData()

      // Add click event listener to the document
      document.addEventListener("click", handleContainerClick)

      // Cleanup the event listener on component unmount
      return () => {
         document.removeEventListener("click", handleContainerClick)
      }
   }, [])
   console.log(data)
   // console.log(stockOption)
   return (
      <>
         <div className="w-100">
            <Col>
               <div ref={toastContainerRef} style={{ position: "relative", zIndex: 1 }}>
                  {/* The toast container */}
               </div>
               <Form className="d-flex justify-content-center gap-2 flex-column w-100" onSubmit={submitHandler}>
                  <ModalBody>
                     <Row>
                        <Col className="ms-3 mt-2 me-auto">
                           <p className="h4">
                              Select Instrument <span style={{ color: "red" }}>*</span>
                           </p>

                           <Select
                              //   isMulti
                              options={expiryOptions}
                              //   value={exchangeOption?.filter((option) => data.stockDetail?.map((e) => e.value).includes(option.value))}
                              onChange={(e) => setdata({ ...data, ...e })}
                              components={{ Option: InputOption }}
                              className="react-select my-filter-select"
                              placeholder="Select from list"
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col className="ms-3 mt-2">
                           <p className="h4">
                              Price <span style={{ color: "red" }}>*</span>
                           </p>
                           <Input
                              value={data.price}
                              required
                              onChange={(e) => setdata({ ...data, price: +e.target.value })}
                              type="number"
                              placeholder="Price"
                           />
                        </Col>
                        <Col className="ms-3 mt-2">
                           <p className="h4">
                              Quantity (In Lots)<span style={{ color: "red" }}>*</span>
                           </p>
                           <Input
                              value={data.quantity}
                              required
                              onChange={(e) => setdata({ ...data, quantity: +e.target.value })}
                              type="number"
                              placeholder="Enter Share Lot Quantity IF Fut"
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-2 align-items-center">
                           <p className="h4 me-2 ">Auto Update:</p>
                           <div className=" form-switch form-check-success">
                              <Input
                                 type="switch"
                                 id=""
                                 onChange={(e) => setdata({ ...data, autoUpdate: e.target.checked })}
                                 name="success"
                                 checked={data.autoUpdate}
                              />
                           </div>
                        </Col>
                        {/* <Col className="ms-3 mt-2">
                           <p className="h4">
                              select exchange <span style={{ color: "red" }}>*</span>
                           </p>

                           <Select
                              //   isMulti
                              options={exchangeOption}
                              //   value={exchangeOption?.filter((option) => data.stockDetail?.map((e) => e.value).includes(option.value))}
                              onChange={(e) => setdata({ ...data, exchange: e.value })}
                              components={{ Option: InputOption }}
                              className="react-select my-filter-select"
                              placeholder="Select from list"
                           />
                        </Col> */}
                        <Col className="ms-3 mt-2">
                           <p className="h4">
                              Trade Status <span style={{ color: "red" }}>*</span>
                           </p>

                           <Select
                              //   isMulti
                              options={tradeStatusOption}
                              //   value={tradeStatusOption?.filter((option) => data.stockDetail?.map((e) => e.value).includes(option.value))}
                              onChange={(e) => setdata({ ...data, transactiontype: e.value })}
                              components={{ Option: InputOption }}
                              className="react-select my-filter-select"
                              placeholder="Select from list"
                           />
                        </Col>
                     </Row>
                  </ModalBody>
                  <ModalFooter>
                     <div className="me-auto">
                        <Button type="submit" className="me-auto rounded-pill " disabled={loading} color="success">
                           Place Order {loading && <Spinner size="sm" />}
                        </Button>
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
               </Form>
            </Col>
         </div>
      </>
   )
}
export default TradeForUser
