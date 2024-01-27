import { useEffect, useState } from "react"
import { getPositionOfUsers } from "../../../myApiCenter"
import { useParams } from "react-router"
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import { customStyles } from "../../../utils"
import { viewUserPositionColumnList } from "../../tableColumn"
import { ChevronDown } from "react-feather"
import DayPositionTable from "./DayPositionTable"
import NetPositionTable from "./NetPositionTable"

const UserPositions = () => {
   const { id } = useParams()
   const [positions, setpositions] = useState({ net: [], day: [] })

   const getData = async () => {
      try {
         const j = await getPositionOfUsers(id)
         setpositions(j?.data?.response?.data)
      } catch (error) {
         console.log(error)
      }
   }
   useEffect(() => {
      getData()

      return () => {}
   }, [id])

   // console.log(positions)
   return (
      <div className="">
         <div className="p-3">
            <div>
               <h4>TODAY</h4>

               <DayPositionTable data={positions} />
            </div>
            <div>
               <h4>Carry Forward</h4>

               <NetPositionTable data={positions} />
            </div>
         </div>
      </div>
   )
}

export default UserPositions
