import { useState } from "react"
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather"
import "./UserIdChanger.css"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const UserIdChanger = (props) => {
   const { id } = useParams()
   const currentIdObj = props?.idList?.find((e) => e.id === id)
   const navigate = useNavigate()
   const plusHandler = () => {
      if (currentIdObj?.serial < props.idList?.length) {
         //  console.log(props.idList.find((e) => e.serial === currentIdObj.serial + 1).id)
         navigate(`${props?.url}${props.idList?.find((e) => e.serial === currentIdObj.serial + 1).id}`)
      }
   }

   // console.log(props)
   const minusHandler = () => {
      if (+currentIdObj?.serial > 1) {
         navigate(`${props?.url}${props?.idList.find((e) => e.serial === currentIdObj.serial - 1).id}`)
      }
   }

   return (
      <div className="changer-box">
         <i className="changer-box-icon1">
            <ArrowLeftCircle size={20} onClick={minusHandler} />
         </i>
         <div className="current-box">
            <strong>{currentIdObj?.serial}</strong>
            <span>/{props?.idList?.length}</span>
         </div>
         <i className="changer-box-icon2">
            <ArrowRightCircle size={20} onClick={plusHandler} />
         </i>
      </div>
   )
}

export default UserIdChanger
