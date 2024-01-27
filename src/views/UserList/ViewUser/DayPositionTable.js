import { useEffect, useState } from "react"
import { getPositionOfUsers } from "../../../myApiCenter"
import { useParams } from "react-router"
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import { customStyles } from "../../../utils"
import { viewUserPositionColumnList } from "../../tableColumn"
import { ChevronDown } from "react-feather"
import { Input } from "reactstrap"

const DayPositionTable = (props) => {
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [currentPage, setCurrentPage] = useState(0)

   // console.log(data?.kycDocumentsAsLevel.length > 0 ? data?.kycDocumentsAsLevel.find((e) => e.level === 2).data.length : "zero")
   //    console.log(props.data.length)
   // ** Function to handle Pagination
   const handlePagination = (page) => {
      setCurrentPage(page.selected)
   }
   const handlePerPage = (e) => {
      setCurrentPage(0)
      setRowsPerPage(parseInt(e.target.value))
   }
   const CustomPagination = () => {
      return (
         <div className=" d-flex flex-row">
            <div>
               {currentPage * rowsPerPage + 1} TO
               {(currentPage + 1) * rowsPerPage < props.data?.length ? (currentPage + 1) * rowsPerPage : props?.data?.length} of {props.data?.length}{" "}
               items
            </div>
            <div className="d-flex ms-auto ">
               <ReactPaginate
                  previousLabel=""
                  nextLabel=""
                  forcePage={props?.data?.length > rowsPerPage ? currentPage : 0}
                  onPageChange={(page) => handlePagination(page)}
                  pageCount={Math.ceil(props?.data?.length / rowsPerPage) || 1}
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

   return (
      <>
         {props?.data?.length > 0 && (
            <DataTable
               customStyles={customStyles}
               pagination
               columns={viewUserPositionColumnList}
               paginationPerPage={rowsPerPage}
               className="react-dataTable"
               sortIcon={<ChevronDown size={10} />}
               paginationComponent={CustomPagination}
               paginationDefaultPage={currentPage + 1}
               data={props.data}
            />
         )}
      </>
   )
}

export default DayPositionTable
