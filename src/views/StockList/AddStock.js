import { Card, Col, Input, Label, ListGroup, Button, Row, ListGroupItem, Form, Spinner } from "reactstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { toast } from "react-hot-toast"
import Select from "react-select"
import { InputOption, dummyItemOptions } from "../../utils"
import { ArrowLeft } from "react-feather"
import Flatpickr from "react-flatpickr"
import { expiryOption, statusOption } from "../../stockOptions"
import { getStockOption, getStocktById, postAddStock, putStock } from "../../myApiCenter"
import MainNav from "../MainNav/MainNav"
// import { getAccountAsOption, getAllOrder, getDesignAsOption, getOrderById, postOrder, putOrderById } from "../../myApiCenter"

const AddStock = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const [loading, setloading] = useState(false)
   const [data, setdata] = useState({
      brokerDetail: {
         symboltoken: "",
         tradingsymbol: "",
         instrumenttype: "",
         exchange: "",
         lotSize: 0,
         expiry: ""
      },
      isActiveFromAdmin: true,
      isBothSideAllowed: false,
      isAutoTargetHit: true,
      marginPoint: 0,
      targetPoint: 0,
      lastTradedValue: 0,
      name: "",
      status: "BUY",
      isSquerOffPending: true
   })
   const [expiryOptions, setexpiryOptions] = useState([])
   const getData = async () => {
      try {
         const j = await getStocktById(id)
         // console.log(j.data.stock)
         setdata(j.data.stock)
      } catch (error) {}
   }
   const getOptionData = async () => {
      // console.log("called")
      try {
         toast.loading("fetching options")
         const j = await getStockOption()
         setexpiryOptions(j)
      } catch (error) {
         console.log(error)
      } finally {
         toast.dismiss()
      }
   }

   // console.log(files)
   const submitHandler = async (e) => {
      e.preventDefault()
      // console.log(data)
      if (data) {
         try {
            setloading(true)
            let j
            if (id) {
               j = await putStock(id, data)
            } else {
               j = await postAddStock(data)
            }
            j && navigate("/stocks")
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
      getOptionData()

      return () => {}
   }, [])
   // console.log(data)
   return (
      <>
         <MainNav />
         <Card style={{ height: "fit-content", width: "70vw", margin: "auto", padding: "30px" }}>
            <div className="d-flex align-items-center p-1 ">
               <button style={{ border: "transparent" }} onClick={() => navigate(-1)}>
                  {/* < style={{ color: "gray" }} /> */}
                  <ArrowLeft />
               </button>
               <h1 className="ms-2 datatable-title-head">{id ? "Edit Stock" : "Add Stock"}</h1>
            </div>
            <div className="w-100">
               <Col>
                  <Form className="d-flex justify-content-center gap-2 flex-column w-100" onSubmit={submitHandler}>
                     <Row>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <p className="h4">
                              Stock Name <span style={{ color: "red" }}>*</span>
                           </p>
                           <Input
                              value={data.name}
                              required
                              onChange={(e) => setdata({ ...data, name: e.target.value })}
                              type="text"
                              className="w-50"
                              placeholder="Enter stock name"
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <p className="h4">Select Expiry :</p>
                           <Select
                              // isMulti
                              // value={}
                              // options={dummyItemOptions}
                              value={
                                 data.brokerDetail.instrumentName &&
                                 expiryOptions.filter((option) => option.value === data?.brokerDetail?.instrumentName)[0]
                              }
                              options={expiryOptions}
                              onChange={(e) => setdata({ ...data, brokerDetail: e })}
                              components={{ Option: InputOption }}
                              className="react-select my-filter-select w-50"
                              placeholder="Select from list"
                           />
                        </Col>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <span className="h4 me-2 ">Expiry Date : </span>
                           <span className="h4 me-2 ">{data.brokerDetail?.expiry}</span>
                        </Col>
                     </Row>
                     <Row>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <span className="h4 me-2 ">Trading Symbol :</span>
                           <span className="h4 me-2 ">{data.brokerDetail?.tradingsymbol}</span>
                        </Col>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <span className="h4 me-2 ">Lot Size : </span>
                           <span className="h4 me-2 ">{data.brokerDetail?.lotsize}</span>
                        </Col>
                     </Row>
                     <Row></Row>

                     <Row>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <span className="h4 me-2 ">Status : </span>
                           <Select
                              // isMulti
                              // value={}
                              // options={dummyItemOptions}
                              value={data.status && statusOption.filter((option) => option.value === data.status)[0]}
                              options={statusOption}
                              onChange={(e) => setdata({ ...data, status: e.value })}
                              components={{ Option: InputOption }}
                              className="react-select my-filter-select w-50"
                              placeholder="Select from list"
                           />{" "}
                        </Col>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-3 align-items-center">
                           <p className="h4 me-2 ">Last Traded Value:</p>

                           <Input
                              // disabled
                              className="w-50"
                              value={data.lastTradedValue}
                              required
                              onChange={(e) => setdata({ ...data, lastTradedValue: +e.target.value })}
                              type="number"
                              placeholder="Enter buy and sell margin"
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <p className="h4 me-2 ">Auto Target Hitter</p>
                           <div className=" form-switch form-check-success">
                              <Input
                                 type="switch"
                                 id=""
                                 onChange={(e) => setdata({ ...data, isAutoTargetHit: e.target.checked })}
                                 name="success"
                                 checked={data.isAutoTargetHit}
                              />
                           </div>
                        </Col>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <p className="h4 me-2 ">Pending SqureOff</p>
                           <div className=" form-switch form-check-success">
                              <Input
                                 type="switch"
                                 id=""
                                 onChange={(e) => setdata({ ...data, isSquerOffPending: e.target.checked })}
                                 name="success"
                                 checked={data.isSquerOffPending}
                              />
                           </div>
                        </Col>
                     </Row>

                     <Row>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <p className="h4 me-2 ">Target point :</p>

                           <Input
                              // disabled
                              className="w-50"
                              value={data.targetPoint}
                              required
                              onChange={(e) => setdata({ ...data, targetPoint: +e.target.value })}
                              type="number"
                              placeholder="Enter buy and sell margin"
                           />
                        </Col>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <p className="h4 me-2 ">Margin point :</p>

                           <Input
                              // disabled
                              className="w-50"
                              value={data.marginPoint}
                              required
                              onChange={(e) => setdata({ ...data, marginPoint: +e.target.value })}
                              type="number"
                              placeholder="Enter buy and sell margin"
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <p className="h4 me-2 ">Both Side Allowed (BUY/SELL)</p>
                           <div className=" form-switch form-check-success">
                              <Input
                                 type="switch"
                                 id=""
                                 onChange={(e) => setdata({ ...data, isBothSideAllowed: e.target.checked })}
                                 name="success"
                                 checked={data.isBothSideAllowed}
                              />
                           </div>
                        </Col>
                        <Col className="ms-3 mt-4 mb-2 d-flex gap-5 align-items-center">
                           <p className="h4 me-2 ">Active</p>
                           <div className=" form-switch form-check-success">
                              <Input
                                 type="switch"
                                 id=""
                                 onChange={(e) => setdata({ ...data, isActiveFromAdmin: e.target.checked })}
                                 name="success"
                                 checked={data.isActiveFromAdmin}
                              />
                           </div>
                        </Col>
                     </Row>

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
export default AddStock
