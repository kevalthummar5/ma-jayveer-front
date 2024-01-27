import { Card, Col, Input, Label, ListGroup, Button, Row, ListGroupItem, Form, Spinner, ModalFooter, ModalBody } from "reactstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useContext, useEffect, useRef } from "react"
import { getErrorUser } from "../../myApiCenter"
import toast from "react-hot-toast"

const ErrorUserModal = (props) => {
   const [data, setdata] = useState(null)
   const [loading, setloading] = useState(false)
   const getData = async () => {
      // console.log(password)
      try {
         // setloading(true)
         toast.loading("fetching")
         const j = await getErrorUser({ stockId: props.stockDetail?._id })
         // console.log(j)
         setdata(j.data?.responses.filter((e) => e.error || e.actualQuantity !== e.desiredQuantity))
         //  const openOrders = j?.filter((e) => e.status === "OPEN")
         //  if (openOrders?.length > 0) {
         //     setdata(openOrders)
         //  } else {
         //     props.setisModelOpen(false)
         //  }
      } catch (err) {
         console.log(err)
      } finally {
         toast.dismiss()
         // setloading(false)
         // toast.dismiss()
      }
   }

   useEffect(() => {
      getData()
   }, [])
   // console.log(data)
   // console.log(stockOption)
   return (
      <>
         <div className="w-100">
            <Col>
               <ModalBody>
                  {data?.length > 0 ? (
                     <div className="p-3">
                        <div>
                           <table>
                              <thead>
                                 <th>USER ID</th>
                                 <th>USER NAME</th>
                                 <th>APPLIED QUANTITY</th>
                                 <th>QUANTITY IN POSITION</th>
                                 <th>ERROR</th>
                              </thead>

                              <tbody>
                                 {data.map((e, index) => {
                                    return (
                                       <tr key={index} className="border-bottom">
                                          {" "}
                                          <td style={{ maxWidth: "50px", overflow: "hidden" }}>{e.userId}</td>
                                          <td>{e.name}</td>
                                          <td>{e.desiredQuantity}</td>
                                          <td>{e.actualQuantity}</td>
                                          <td>{e?.error}</td>
                                       </tr>
                                    )
                                 })}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  ) : (
                     <p>All User Quantity Okay</p>
                  )}
               </ModalBody>
               <ModalFooter>
                  <div className="me-auto">
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
            </Col>
         </div>
      </>
   )
}
export default ErrorUserModal
