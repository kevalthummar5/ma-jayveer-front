import { Card, Col, Input, Label, ListGroup, Button, Row, ListGroupItem, Form, Spinner, ModalFooter, ModalBody } from "reactstrap"
import { useParams } from "react-router-dom"
import { useState, useContext, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import Select from "react-select"
import { InputOption, dummyItemOptions, exchangeOption, subjectOptions, tradeStatusOption } from "../../utils"
import { postOrderForAll } from "../../myApiCenter"

const StockTradeModal = (props) => {
   const toastContainerRef = useRef()

   const { id } = useParams()
   const [data, setdata] = useState({
      transaction_type: "",
      price: 0
   })
   const [tradeData, settradeData] = useState([])
   const [loading, setloading] = useState(false)
   // console.log(props)
   const submitHandler = async (e) => {
      e.preventDefault()
      // console.log(data)
      let updatedData
      if (props.stockDetail?.path === "place-order-for-all") {
         updatedData = { ...data }
      } else {
         updatedData = { price: data.price }
      }
      if (!(data.price > 0)) {
         toast.error("please provide appropiate price(should not zero or nagative)  ")
      } else if (!data.transaction_type && props.stockDetail?.path === "place-order-for-all") {
         toast.error("please select trade status")
      } else {
         try {
            setloading(true)
            const j = await postOrderForAll(props.stockDetail?.path, { ...updatedData, stockId: props.stockDetail?._id })
            settradeData(j.data.responses)
            // console.log(j)
         } finally {
            setloading(false)
         }
      }
   }
   useEffect(() => {
      const handleContainerClick = (event) => {
         // Dismiss the toast if the click occurs outside the toast container
         if (!toastContainerRef.current.contains(event.target)) {
            toast.dismiss() // Dismiss all toasts
         }
      }

      // Add click event listener to the document
      document.addEventListener("click", handleContainerClick)

      // Cleanup the event listener on component unmount
      return () => {
         document.removeEventListener("click", handleContainerClick)
      }
   }, [])
   // console.log(data)
   //    console.log(props.stockDetail)
   // console.log(stockOption)
   // console.log(tradeData)
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
                        <Col className="ms-3 mt-2 me-auto d-flex">
                           <p className="h4 me-auto ">{props?.stockDetail?.name}</p>
                           <p className="h4 me-auto ">STATUS : {props?.stockDetail?.status}</p>
                        </Col>
                     </Row>
                     {tradeData?.length > 0 ? (
                        <div className="p-3">
                           <div>
                              <table>
                                 <thead>
                                    <th>USER ID</th>
                                    <th>USER NAME</th>
                                    <th>Order Id</th>
                                    <th>Quantity</th>
                                    <th>Order Status</th>
                                    <th>ERROR</th>
                                 </thead>

                                 <tbody>
                                    {tradeData.map((e, index) => {
                                       return (
                                          <tr key={index} className="border-bottom">
                                             {" "}
                                             <td style={{ maxWidth: "50px", overflow: "hidden" }}>{e.userId}</td>
                                             <td>{e.name}</td>
                                             <td>{e.orderId}</td>
                                             <td>{e.quantity}</td>
                                             <td>{e.orderStatus}</td>
                                             <td>{e?.error}</td>
                                          </tr>
                                       )
                                    })}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     ) : (
                        <>
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
                           </Row>
                           {props.stockDetail?.path === "place-order-for-all" && (
                              <Row>
                                 <Col className="ms-3 mt-2">
                                    <p className="h4">
                                       Trade Status <span style={{ color: "red" }}>*</span>
                                    </p>

                                    <Select
                                       //   isMulti
                                       options={tradeStatusOption}
                                       //   value={tradeStatusOption?.filter((option) => data.stockDetail?.map((e) => e.value).includes(option.value))}
                                       onChange={(e) => setdata({ ...data, transaction_type: e.value })}
                                       components={{ Option: InputOption }}
                                       className="react-select my-filter-select"
                                       placeholder="Select from list"
                                    />
                                 </Col>
                              </Row>
                           )}
                        </>
                     )}
                  </ModalBody>
                  <ModalFooter>
                     <div className="me-auto">
                        {tradeData.length === 0 && (
                           <Button type="submit" className="me-auto rounded-pill " disabled={loading} color="success">
                              Place Order {loading && <Spinner size="sm" />}
                           </Button>
                        )}
                        <Button
                           className="me-auto ms-2 rounded-pill"
                           outline
                           color="secondary"
                           onClick={() => {
                              props.setisModelOpen(false)
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
export default StockTradeModal
