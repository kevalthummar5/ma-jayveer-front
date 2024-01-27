import { useEffect, useState } from "react"
import { getLogsByUserId } from "../../../myApiCenter"
import { useParams } from "react-router"
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import { viewUserLogsColumnList } from "../../tableColumn"
import { customStyles } from "../../../utils"
import { ChevronsDown } from "react-feather"
import { Input } from "reactstrap"

const UserLogs = () => {
   const { id } = useParams()

   const [data, setdata] = useState(null)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [currentPage, setCurrentPage] = useState(0)

   // console.log(data?.kycDocumentsAsLevel.length > 0 ? data?.kycDocumentsAsLevel.find((e) => e.level === 2).data.length : "zero")

   const getData = async () => {
      try {
         const j = await getLogsByUserId(id)
         setdata(j.data?.reverse())
         // console.log(j)
      } catch (error) {
         console.log(error)
      }
   }
   useEffect(() => {
      getData()

      return () => {}
   }, [id])
   // console.log(data)
   // ** Function to handle Pagination
   const handlePagination = (page) => {
      setCurrentPage(page.selected)
   }
   const handlePerPage = (e) => {
      setCurrentPage(0)
      setRowsPerPage(parseInt(e.target.value))
   }
   const CustomPagination = (props) => {
      return (
         <div className=" d-flex flex-row">
            <div>
               {currentPage * rowsPerPage + 1} TO {(currentPage + 1) * rowsPerPage < data?.length ? (currentPage + 1) * rowsPerPage : data?.length} of{" "}
               {data?.length} items
            </div>
            <div className="d-flex ms-auto ">
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
      <>
         {data?.length > 0 && (
            <DataTable
               customStyles={customStyles}
               pagination
               columns={viewUserLogsColumnList}
               paginationPerPage={rowsPerPage}
               className="react-dataTable"
               sortIcon={<ChevronsDown size={10} />}
               paginationComponent={CustomPagination}
               paginationDefaultPage={currentPage + 1}
               data={data}
            />
         )}
      </>
   )
}

export default UserLogs
