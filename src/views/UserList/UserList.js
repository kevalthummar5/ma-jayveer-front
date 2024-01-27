// ** React Imports
import { Fragment, useState, forwardRef } from "react"
import Flatpickr from "react-flatpickr"
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import { ChevronDown, MoreVertical, Edit3, Edit2, PlusCircle, XCircle, Activity, Briefcase } from "react-feather"
import Select from "react-select"

// ** Reactstrap Imports
import {
   Card,
   Input,
   Button,
   UncontrolledDropdown,
   DropdownMenu,
   DropdownItem,
   Modal,
   DropdownToggle,
   ModalFooter,
   ModalBody,
   Spinner
} from "reactstrap"
import { useNavigate } from "react-router-dom"
import { customStyles } from "../../utils"
import { useEffect } from "react"
// import { data } from "../../../../utility/genericServicesData"
// import { genericServicesColumnList } from "../genericServicesOptions"
// import { getGenericServiceAll } from "../../../../utility/myGenericServiceApiCenter"
import { useContext } from "react"
import { userColumnList } from "../tableColumn"
import { AuthContext, MobileUsersContext } from "../../context/Can"
import { dummyDataForTable } from "../../dummyData"
import MainNav from "../MainNav/MainNav"
import { getAllUser, getOrdersOfUsers, getPositionOfUsers, getStockAsOption, resetPasswordForUser } from "../../myApiCenter"
import toast from "react-hot-toast"
import TradeForUser from "./TradeForUser"
import UserOrders from "./UserOrders"

const UserList = () => {
   const navigate = useNavigate()
   const [, idListSetter] = useContext(MobileUsersContext)
   const [currentPage, setCurrentPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [data, setdata] = useState([])
   const [userData, userDataSetter] = useContext(AuthContext)
   const [isModelOpen, setisModelOpen] = useState(false)
   const [userId, setuserId] = useState(null)
   const [isTradeModelOpen, setisTradeModelOpen] = useState(false)
   const [isOrderModal, setisOrderModal] = useState(false)
   const [isPositionModel, setisPositionModel] = useState(false)
   const [positionLoading, setpositionLoading] = useState(false)
   const [loading, setloading] = useState(false)
   const [password, setpassword] = useState("")
   const [positions, setpositions] = useState([])
   const getData = async () => {
      const stockoption = await getStockAsOption()

      // console.log(stockoption)
      const j = await getAllUser()
      const updatedUsers = [...j?.data?.users].map((e) => {
         // console.log(e)
         const updatedStockDetail = e.stockDetail?.map((i) => {
            const stockName = stockoption.filter((k) => k.value === i.stockId)[0]?.label
            // console.log(stockName)
            return { ...i, stockName }
         })
         return { ...e, stockDetail: updatedStockDetail }
      })
      const idList = j?.data?.users.map((e, index) => {
         return { serial: index + 1, id: e._id }
      })
      localStorage.setItem("mobileUserIdList", JSON.stringify(idList))
      idListSetter(idList)
      setdata(updatedUsers)
      // setdata(j.data.data)
   }
   const resetPasswordHandler = async () => {
      // console.log(password)
      if (password) {
         try {
            setloading(true)
            const j = await resetPasswordForUser(userId, { password: password })
            // console.log(j)
         } finally {
            setisModelOpen(false)
            setloading(false)
            setuserId(null)
            setpassword("")
         }
      } else {
         toast.error("please enter password")
      }
   }

   const getPositionHandler = async (id) => {
      // console.log(password)

      try {
         // toast.loading("fetching")
         const j = await getPositionOfUsers(id)
         // console.log(j)
         if (j) {
            setisPositionModel(true)

            // console.log(JSON.parse(j.data.response))
            setpositions(j.data.response.data)
         }
      } catch (err) {
         console.log(err)
      } finally {
         // setisPositionModel(false)
         // setpositionLoading(false)
         // toast.dismiss()
         // setuserId(null)
         // setpassword("")
      }
   }

   // console.log(positions)
   const columns = [
      ...userColumnList,
      {
         name: "Action",
         allowOverflow: true,
         cell: (row) => {
            return (
               <div className="d-flex">
                  <UncontrolledDropdown>
                     <DropdownToggle style={{ cursor: "pointer" }} className="pe-1" tag="span">
                        <MoreVertical size={15} />
                     </DropdownToggle>
                     <DropdownMenu end>
                        <DropdownItem
                           tag="div"
                           className="w-100 d-flex gap-3 align-items-center"
                           onClick={() => {
                              navigate(`/users/edit/${row._id}`)
                           }}
                        >
                           <Edit3 size={24} />
                           <span className="align-middle ms-50">Edit Info</span>
                        </DropdownItem>
                        <DropdownItem
                           tag="div"
                           className="w-100 d-flex gap-3 align-items-center"
                           onClick={() => {
                              setisModelOpen(true)
                              setuserId(row._id)
                           }}
                        >
                           <Edit2 size={24} />
                           <span className="align-middle ms-50">Reset Password</span>
                        </DropdownItem>
                        <DropdownItem
                           tag="div"
                           className="w-100 d-flex gap-3 align-items-center"
                           onClick={() => {
                              if (row.isApprovedFromAdmin) {
                                 // console.log(row.isApprovedFromAdmin)
                                 setisTradeModelOpen(true)
                                 setuserId(row._id)
                              } else {
                                 toast.error(row.name + " Is not Active")
                              }
                           }}
                        >
                           <Activity size={24} />
                           <span className="align-middle ms-50">Trade For User</span>
                        </DropdownItem>
                        <DropdownItem
                           tag="div"
                           className="w-100 d-flex gap-3 align-items-center"
                           onClick={() => {
                              // setisPositionModel(true)
                              getPositionHandler(row._id)
                           }}
                        >
                           <Briefcase size={24} />
                           <span className="align-middle ms-50">Get Positions</span>
                        </DropdownItem>
                        <DropdownItem
                           tag="div"
                           className="w-100 d-flex gap-3 align-items-center"
                           onClick={() => {
                              setisOrderModal(true)
                              setuserId(row._id)
                           }}
                        >
                           <Briefcase size={24} />
                           <span className="align-middle ms-50">Get Orders</span>
                        </DropdownItem>
                        <DropdownItem
                           tag="div"
                           className="w-100 d-flex gap-3 align-items-center"
                           onClick={() => {
                              navigate(`/users/view/${row._id}`)
                           }}
                        >
                           <Briefcase size={24} />
                           <span className="align-middle ms-50">View User</span>
                        </DropdownItem>
                     </DropdownMenu>
                  </UncontrolledDropdown>
               </div>
            )
         }
      }
   ]

   // ** Function to handle Pagination
   const handlePagination = (page) => {
      setCurrentPage(page.selected)
   }
   const handlePerPage = (e) => {
      setCurrentPage(0)
      setRowsPerPage(parseInt(e.target.value))
   }
   useEffect(() => {
      getData()

      return () => {}
   }, [])
   // console.log(data)
   // ** Custom Pagination
   const CustomPagination = (props) => {
      return (
         <div className="d-flex mt-3 justify-content-between">
            <div>
               {currentPage * rowsPerPage + 1} TO {(currentPage + 1) * rowsPerPage < data.length ? (currentPage + 1) * rowsPerPage : data.length} of{" "}
               {data.length} items
            </div>

            <div className="d-flex gap-3">
               <ReactPaginate
                  previousLabel=""
                  nextLabel=""
                  forcePage={data.length > rowsPerPage ? currentPage : 0}
                  onPageChange={(page) => handlePagination(page)}
                  pageCount={Math.ceil(data.length / rowsPerPage) || 1}
                  breakLabel="..."
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={2}
                  activeClassName="active"
                  pageClassName="page-item"
                  breakClassName="page-item"
                  nextLinkClassName="page-link"
                  pageLinkClassName="page-link"
                  breakLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  nextClassName="page-item next-item"
                  previousClassName="page-item prev-item"
                  containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
               />

               <div>
                  <Input
                     type="select"
                     id="rows-per-page"
                     value={rowsPerPage}
                     onChange={(e) => {
                        props.onChangeRowsPerPage(e.target.value)
                        handlePerPage(e)
                     }}
                     className="page-selector"
                  >
                     <option value="5">5</option>
                     <option value="7">7</option>
                     <option value="10">10</option>
                     <option value="15">15</option>
                     <option value="25">25</option>
                     <option value="50">50</option>
                  </Input>
               </div>
            </div>
         </div>
      )
   }

   // console.log(data)

   return (
      <Fragment>
         <MainNav />
         <Modal isOpen={isModelOpen} toggle={() => setisModelOpen(!isModelOpen)} className="modal-dialog-centered">
            <div className="d-flex justify-content-between w-100 p-2">
               <h4> Reset Password</h4>
               <XCircle
                  style={{ cursor: "pointer" }}
                  className="cursor-pointer"
                  onClick={() => {
                     setisModelOpen(false)
                     setpassword("")
                     setuserId(null)
                  }}
               />
            </div>
            <ModalBody>
               <Input value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Enter password" />
            </ModalBody>
            <ModalFooter>
               <div className="me-auto">
                  <Button type="button" className="me-auto rounded-pill " onClick={() => resetPasswordHandler()} disabled={loading} color="success">
                     Save Password {loading && <Spinner size="sm" />}
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
         </Modal>
         <Modal isOpen={isTradeModelOpen} toggle={() => setisTradeModelOpen(!isTradeModelOpen)} className="modal-dialog-centered">
            <div className="d-flex justify-content-between w-100 p-2">
               <h4> Place Order</h4>
               <XCircle
                  style={{ cursor: "pointer" }}
                  className="cursor-pointer"
                  onClick={() => {
                     setisTradeModelOpen(false)
                     setuserId(null)
                     toast.dismiss()
                  }}
               />
            </div>
            <TradeForUser setisModelOpen={setisTradeModelOpen} userId={userId} />
         </Modal>
         <Modal size="lg" isOpen={isPositionModel} toggle={() => setisPositionModel(!isPositionModel)} className="modal-dialog-centered">
            <div className="d-flex justify-content-between w-100 p-2">
               <h4> Positions</h4>
               <XCircle
                  style={{ cursor: "pointer" }}
                  className="cursor-pointer"
                  onClick={() => {
                     setisPositionModel(false)
                     setuserId(null)
                     setpositions([])
                  }}
               />
            </div>

            <div className="p-3">
               <div>
                  <h4>Today</h4>
                  <table>
                     <thead>
                        <th>Trading Symbol</th>
                        <th> buy price</th>
                        <th>sell price</th>
                        <th>buy quantity</th>
                        <th>sell Quantity</th>
                        <th>Total Net Quantity</th>
                     </thead>
                     <tbody>
                        {positions?.length > 0 &&
                           positions?.map((e, index) => {
                              return (
                                 <tr key={index}>
                                    {" "}
                                    <td>{e.symbolname}</td>
                                    <td>{e.buyavgprice}</td>
                                    <td>{e.sellavgprice}</td>
                                    <td>{e.buyqty}</td>
                                    <td>{e.sellqty}</td>
                                    <td>{e.netqty}</td>
                                 </tr>
                              )
                           })}
                     </tbody>
                  </table>
               </div>
               <div>
                  <h4>Carry Forward</h4>
                  <table>
                     <thead>
                        <th>Trading Symbol</th>
                        <th> buy price</th>
                        <th>sell price</th>
                        <th>buy quantity</th>
                        <th>sell Quantity</th>
                     </thead>
                     <tbody>
                        {positions?.length > 0 &&
                           positions?.map((e, index) => {
                              return (
                                 <tr key={index}>
                                    {" "}
                                    <td>{e.symbolname}</td>
                                    <td>{e.cfbuyavgprice}</td>
                                    <td>{e.cfsellavgprice}</td>
                                    <td>{e.cfbuyqty}</td>
                                    <td>{e.cfsellqty}</td>
                                 </tr>
                              )
                           })}
                     </tbody>
                  </table>
               </div>
            </div>
         </Modal>
         <Modal isOpen={isOrderModal} toggle={() => setisOrderModal(!isOrderModal)} className="modal-dialog-centered modal-lg">
            <div className="d-flex justify-content-between w-100 p-2">
               <h4> Orders</h4>
               <XCircle
                  style={{ cursor: "pointer" }}
                  className="cursor-pointer"
                  onClick={() => {
                     setisOrderModal(false)
                     setuserId(null)
                     toast.dismiss()
                  }}
               />
            </div>
            <UserOrders setisModelOpen={setisOrderModal} userId={userId} />
         </Modal>
         <Card className="m-5 p-3 main-table">
            <div className="react-dataTable react-dataTable-selectable-rows">
               <DataTable
                  customStyles={customStyles}
                  pagination
                  columns={columns}
                  paginationPerPage={rowsPerPage}
                  className="react-dataTable"
                  sortIcon={<ChevronDown size={10} />}
                  paginationComponent={CustomPagination}
                  paginationDefaultPage={currentPage + 1}
                  data={data}
                  subHeader={true}
                  subHeaderComponent={
                     <div className="d-flex p-1 w-100 justify-content-between align-items-center">
                        <h1 className="datatable-title-head">USERS</h1>
                        <div className="d-flex gap-1 align-items-center">
                           <Button className="my-btn" onClick={() => navigate("/users/add")}>
                              <PlusCircle />
                              &nbsp; Add New User
                           </Button>
                        </div>
                     </div>
                  }
               />
            </div>
         </Card>
      </Fragment>
   )
}
export default UserList
