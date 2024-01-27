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
import { unloggedUserColumnList, userColumnList } from "../tableColumn"
import { AuthContext, MobileUsersContext } from "../../context/Can"
import { dummyDataForTable } from "../../dummyData"
import MainNav from "../MainNav/MainNav"
import { getAllUser, getOrdersOfUsers, getPositionOfUsers, getStockAsOption, getUnloggedUser, resetPasswordForUser } from "../../myApiCenter"
import toast from "react-hot-toast"
import TradeForUser from "./TradeForUser"
import UserOrders from "./UserOrders"

const UnloggedUserList = () => {
   const navigate = useNavigate()
   const [currentPage, setCurrentPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [data, setdata] = useState([])
   const [userData, userDataSetter] = useContext(AuthContext)
   const [loading, setloading] = useState(false)
   const getData = async () => {
      // console.log(stockoption)
      const j = await getUnloggedUser()
      // console.log(j)
      // setdata(updatedUsers)
      setdata(j.data?.responses.filter((e) => e.error))
   }

   // console.log(positions)
   const columns = [...unloggedUserColumnList]

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
               {currentPage * rowsPerPage + 1} TO {(currentPage + 1) * rowsPerPage < data?.length ? (currentPage + 1) * rowsPerPage : data?.length} of{" "}
               {data?.length} items
            </div>

            <div className="d-flex gap-3">
               <ReactPaginate
                  previousLabel=""
                  nextLabel=""
                  forcePage={data?.length > rowsPerPage ? currentPage : 0}
                  onPageChange={(page) => handlePagination(page)}
                  pageCount={Math.ceil(data?.length / rowsPerPage) || 1}
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
export default UnloggedUserList
