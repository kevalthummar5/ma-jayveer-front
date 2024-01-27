// ** React Imports
import { Fragment, useState, forwardRef } from "react"
import Flatpickr from "react-flatpickr"
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import { ChevronDown, MoreVertical, Edit3, PlusCircle, XCircle, Activity, User } from "react-feather"
import Select from "react-select"

// ** Reactstrap Imports
import { Card, Input, Button, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Modal } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { customStyles } from "../../utils"
import { useEffect } from "react"
// import { data } from "../../../../utility/genericServicesData"
// import { genericServicesColumnList } from "../genericServicesOptions"
// import { getGenericServiceAll } from "../../../../utility/myGenericServiceApiCenter"
import { useContext } from "react"
import { stockColumnList } from "../tableColumn"
import { AuthContext } from "../../context/Can"
import { dummyDataForTable } from "../../dummyData"
import { getAllStock, getClose } from "../../myApiCenter"
import MainNav from "../MainNav/MainNav"
import StockTradeModal from "./StockTradeModal"
import toast from "react-hot-toast"
import ErrorUserModal from "./ErrorUserModal"

const StockList = () => {
   const navigate = useNavigate()

   const [currentPage, setCurrentPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [data, setdata] = useState([])
   const [userData, userDataSetter] = useContext(AuthContext)
   const [errorUser, seterrorUser] = useState([])
   const [isErrorUserModal, setisErrorUserModal] = useState(false)
   const [isTradeModal, setisTradeModal] = useState(false)
   const [stockDetail, setstockDetail] = useState(null)
   const getData = async () => {
      const j = await getAllStock()
      // console.log(j)
      setdata(j?.data?.stock)
   }

   // console.log(data)
   const columns = [
      ...stockColumnList,
      {
         name: "Action",
         allowoverflow: true,
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
                           className="w-100"
                           onClick={() => {
                              navigate(`/stocks/edit/${row._id}`)
                           }}
                        >
                           <Edit3 size={24} />
                           <span className="align-middle ms-50">Edit Info</span>
                        </DropdownItem>
                        <DropdownItem
                           tag="div"
                           className="w-100"
                           onClick={() => {
                              // console.log(row)
                              getClose(row?.brokerDetail?.exchange, row?.brokerDetail?.symboltoken)
                           }}
                        >
                           <Edit3 size={24} />
                           <span className="align-middle ms-50">Get Latest Close</span>
                        </DropdownItem>
                        <DropdownItem
                           tag="div"
                           className="w-100"
                           onClick={() => {
                              setstockDetail(() => {
                                 return { ...row, path: "place-order-for-all" }
                              })
                              setisTradeModal(true)
                              // navigate(`/stocks/edit/${row._id}`)
                           }}
                        >
                           <Activity size={24} />
                           <span className="align-middle ms-50">Trade For All</span>
                        </DropdownItem>
                        <DropdownItem
                           tag="div"
                           className="w-100"
                           onClick={() => {
                              setstockDetail(() => {
                                 return { ...row, path: "neutralise-positions" }
                              })
                              setisTradeModal(true)
                           }}
                        >
                           <Activity size={24} />
                           <span className="align-middle ms-50">Square Off Trade</span>
                        </DropdownItem>
                        <DropdownItem
                           tag="div"
                           className="w-100"
                           onClick={() => {
                              setstockDetail(() => {
                                 return { ...row, path: "neutralise-positions" }
                              })
                              // setisTradeModal(true)
                              setisErrorUserModal(true)
                           }}
                        >
                           <User size={24} />
                           <span className="align-middle ms-50">Get Error User</span>
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
         <Modal isOpen={isTradeModal} toggle={() => setisTradeModal(!isTradeModal)} className="modal-dialog-centered modal-lg">
            <div className="d-flex justify-content-between w-100 p-2">
               <h4> {stockDetail?.path === "place-order-for-all" ? "Place Order For All" : "Square Off Trade"} </h4>
               <XCircle
                  style={{ cursor: "pointer" }}
                  className="cursor-pointer"
                  onClick={() => {
                     setisTradeModal(false)
                     setstockDetail(null)
                     toast.dismiss()
                  }}
               />
            </div>

            <StockTradeModal setisModelOpen={setisTradeModal} stockDetail={stockDetail} />
         </Modal>
         <Modal isOpen={isErrorUserModal} toggle={() => setisErrorUserModal(!isErrorUserModal)} className="modal-dialog-centered modal-lg">
            <div className="d-flex justify-content-between w-100 p-2">
               <h4> Error User List </h4>
               <XCircle
                  style={{ cursor: "pointer" }}
                  className="cursor-pointer"
                  onClick={() => {
                     setisErrorUserModal(false)
                     setstockDetail(null)
                     toast.dismiss()
                  }}
               />
            </div>
            <ErrorUserModal setisModelOpen={setisErrorUserModal} stockDetail={stockDetail} />
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
                        <h1 className="datatable-title-head">STOCKS</h1>
                        <div className="d-flex gap-1 align-items-center">
                           <Button className="my-btn" onClick={() => navigate("/stocks/add")}>
                              <PlusCircle />
                              &nbsp; Add New Stock
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
export default StockList
