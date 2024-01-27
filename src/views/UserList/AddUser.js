import { Card, Col, Input, Label, ListGroup, Button, Row, ListGroupItem, Form, Spinner, Popover, PopoverHeader, PopoverBody } from "reactstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { toast } from "react-hot-toast"
import Select from "react-select"
import { InputOption, dummyItemOptions, subjectOptions } from "../../utils"
import { ArrowLeft } from "react-feather"
import Flatpickr from "react-flatpickr"
import {
   getAccountAsOption,
   getAllOrder,
   getDesignAsOption,
   getOrderById,
   getStockAsOption,
   getUserById,
   postAddUser,
   postOrder,
   putOrderById,
   putUser
} from "../../myApiCenter"
import StockWiseQuantity from "./StockWiseQuantity"
import MainNav from "../MainNav/MainNav"
import { AuthContext } from "../../context/Can"

const AddUser = () => {
   const { id } = useParams()
   const [userData, userDataSetter] = useContext(AuthContext)

   const [stockOption, setstockOption] = useState([])
   const [stocks, setstocks] = useState([])
   const [quantityAry, setquantityAry] = useState([])
   const [activeAry, setactiveAry] = useState([])

   const navigate = useNavigate()
   const [loading, setloading] = useState(false)
   const [data, setdata] = useState({
      name: "",
      password: "",
      email: "",
      mobileNo: "",
      isSigned: false,
      isApprovedFromAdmin: false,
      brokerDetail: {
         clientId: "",
         personalsecret: "",
         apiKey: "",
         dailyAccessToken: ""
      },
      stockDetail: []
   })
   const [popoverOpen, setPopoverOpen] = useState(false)

   const toggle = () => setPopoverOpen(!popoverOpen)

   const getData = async () => {
      try {
         const stockOption1 = await getStockAsOption()
         // console.log(stockOption1)
         const j = await getUserById(id)
         // console.log(j)
         const updatedStockDetail = j.data?.user?.stockDetail?.map((i) => {
            const label = stockOption1?.filter((k) => k.value === i.stockId)[0]?.label
            const value = stockOption1?.filter((k) => k.value === i.stockId)[0]?.value
            // console.log(stockName)
            return { ...i, label, value }
         })

         setdata({ ...j.data?.user, stockDetail: updatedStockDetail })
         setquantityAry(j.data.user?.stockDetail.map((m) => m.quantity))
         setactiveAry(j.data.user?.stockDetail.map((m) => m.isActive))
      } catch (error) {
         console.log(error)
      }
   }
   // console.log(quantityAry)
   const getStockOption = async () => {
      const j = await getStockAsOption()
      // console.log(j)
      setstockOption(j)
      // setitemOption(j)
      // setitems(j)
   }
   const stockChangeHandler = (arry) => {
      // console.log(arry)
      const oldStockDetailId = [...data.stockDetail.map((k) => k.stockId)]
      const oldStockDetail = [...data.stockDetail]
      // console.log(arry)
      const newStock = arry.find((e) => {
         // console.log(oldStockDetailId)
         return !oldStockDetailId.includes(e.value)
      })
      // console.log(newStock)
      // console.log(data.stockDetail)

      if (arry.length > data.stockDetail.length) {
         setdata({
            ...data,
            stockDetail: [...data.stockDetail, { ...newStock, stockId: newStock.value, isActive: false, quantity: 0 }]
         })
      } else {
         const aryId = arry.map((e) => e.value)
         // console.log(aryId)
         // console.log(oldStockDetail)
         const updateStockDetail = oldStockDetail.filter((m) => aryId.includes(m.stockId))
         setdata({
            ...data,
            stockDetail: [...updateStockDetail]
         })
      }
   }
   // console.log(data)
   const submitHandler = async (e) => {
      e.preventDefault()
      // console.log(data)
      const updatedData = { ...data }
      const updatedStockDetails = data?.stockDetail
         .map((e) => {
            return { stockId: e?.value, quantity: e?.quantity, isActive: e?.isActive }
         })
         .filter((k) => k.quantity >= 0)

      updatedData.stockDetail = updatedStockDetails
      // console.log(data)
      delete data.password
      if (data) {
         try {
            setloading(true)
            let j
            if (id) {
               j = await putUser(id, updatedData)
            } else {
               j = await postAddUser(updatedData)
            }
            j && navigate("/users")
         } finally {
            setloading(false)
         }
      } else {
         toast.error("please select generic service")
      }
   }
   useEffect(() => {
      {
         id && getData()
      }
      getStockOption()
      return () => {}
   }, [])
   // console.log(data)
   // console.log(stockOption)
   return (
      <>
         <MainNav />

         <Card className="my-form-wrap">
            <div className="d-flex align-items-center p-1 ">
               <button style={{ border: "transparent" }} onClick={() => navigate(-1)}>
                  {/* < style={{ color: "gray" }} /> */}
                  <ArrowLeft />
               </button>
               <h1 className="ms-2 datatable-title-head">{id ? "Edit User" : "Add User"}</h1>
            </div>
            <div className="w-100">
               <Col>
                  <Form className="d-flex justify-content-center gap-2 flex-column w-100" onSubmit={submitHandler}>
                     <Row>
                        <Col className="ms-3 mt-2 me-auto xs">
                           <p className="h4 me-auto " style={{ textAlign: "start" }}>
                              Name <span style={{ color: "red" }}>*</span>
                           </p>
                           <Input
                              value={data?.name}
                              required
                              onChange={(e) => setdata({ ...data, name: e.target.value })}
                              type="text"
                              placeholder="Enter contact person name"
                              className="w-100"
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col className="ms-3 mt-2">
                           <p className="h4" style={{ textAlign: "start" }}>
                              EMAIL <span style={{ color: "red" }}>*</span>
                           </p>
                           <Input
                              value={data.email}
                              required
                              onChange={(e) => setdata({ ...data, email: e.target.value })}
                              type="email"
                              placeholder="Enter email"
                           />
                        </Col>
                     </Row>
                     <Row>
                        {!id && (
                           <Col className="ms-3 mt-2">
                              <p className="h4" style={{ textAlign: "start" }}>
                                 Password <span style={{ color: "red" }}>*</span>
                              </p>
                              <Input
                                 value={data.password}
                                 required
                                 onChange={(e) => setdata({ ...data, password: e.target.value })}
                                 type="password"
                                 placeholder="Enter password"
                              />
                           </Col>
                        )}

                        <Col className="ms-3 mt-2">
                           <p className="h4" style={{ textAlign: "start" }}>
                              Mobile No <span style={{ color: "red" }}>*</span>
                           </p>
                           <Input
                              value={data.mobileNo}
                              required
                              onChange={(e) => setdata({ ...data, mobileNo: e.target.value })}
                              type="number"
                              placeholder="ex. Your contact no"
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col className="ms-3 mt-2">
                           <p className="h4" style={{ textAlign: "start" }}>
                              Angel client Id <span style={{ color: "red" }}>*</span>
                           </p>
                           <Input
                              value={data.brokerDetail.clientId}
                              required
                              onChange={(e) => setdata({ ...data, brokerDetail: { ...data.brokerDetail, clientId: e.target.value } })}
                              type="text"
                              placeholder="Enter client ID"
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col className="ms-3 mt-2">
                           <p className="h4" style={{ textAlign: "start" }}>
                              select Stock <span style={{ color: "red" }}>*</span>
                           </p>

                           <Select
                              isMulti
                              options={stockOption}
                              value={stockOption?.filter((option) => data.stockDetail?.map((e) => e.value).includes(option.value))}
                              onChange={stockChangeHandler}
                              components={{ Option: InputOption }}
                              className="react-select my-filter-select"
                              placeholder="Select from list"
                           />
                        </Col>
                     </Row>
                     <div className="my-user-form-stockarea">
                        {data.stockDetail?.map((e, index) => {
                           return (
                              <StockWiseQuantity
                                 activeAry={activeAry}
                                 quantityAry={quantityAry}
                                 key={index}
                                 data={e}
                                 parentData={data}
                                 setdata={setdata}
                                 index={index}
                              />
                           )
                        })}
                     </div>
                     {userData?.userRole === "admin" && (
                        <Row>
                           <Col className="ms-3 mt-2 mb-2 d-flex gap-5 align-items-center">
                              <p className="h4 me-2 " style={{ textAlign: "start" }}>
                                 Active
                              </p>
                              <div className=" form-switch form-check-success">
                                 <Input
                                    type="switch"
                                    id=""
                                    onChange={(e) => setdata({ ...data, isApprovedFromAdmin: e.target.checked })}
                                    name="success"
                                    checked={data.isApprovedFromAdmin}
                                 />
                              </div>
                           </Col>
                        </Row>
                     )}
                     {!id && (
                        <div className="mb-4  me-auto ms-3">
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
                              Confirm that user accept{" "}
                              <span id="Popover1" type="button" style={{ textDecoration: "underline" }} onClick={toggle}>
                                 terms and condition
                              </span>
                              <Popover placement="top" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                                 <PopoverHeader>terms and condition</PopoverHeader>
                                 <PopoverBody>
                                    <p>I will daily login to site and save my token before 9 am on every trading day</p>

                                    <p>
                                       Algorithmic trading carries a high level of risk and may not be suitable for all investors. The strategies used
                                       by our Algorithmic trading bots are based on historical data and do not guarantee future results. Our trading
                                       bots may not perform as expected due to unforeseen market conditions, technical issues, or other factors.
                                       Dhanhike does not guarantee any specific returns or outcomes, and user should be prepared to potentially lose a
                                       portion of his/her investment. Before investing, please consult with a financial advisor to determine if
                                       Algorithmic trading is appropriate for your financial situation and goals. Dhanhike cannot be held responsible
                                       for any losses incurred by using Dhanhike and users assume full responsibility for their investment decisions
                                    </p>
                                 </PopoverBody>
                              </Popover>
                           </span>
                        </div>
                     )}

                     <Button className="w-25 mt-2 ms-3 my-btn" disabled={loading}>
                        Save {loading && <Spinner size="sm" />}
                     </Button>
                  </Form>
               </Col>
            </div>
         </Card>
      </>
   )
}
export default AddUser
