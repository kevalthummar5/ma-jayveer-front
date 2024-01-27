// ** React Imports
import { useState, Fragment, useEffect } from "react"

// ** Reactstrap Imports
import {
   Row,
   Col,
   Card,
   Form,
   CardBody,
   Button,
   Badge,
   Modal,
   Input,
   Label,
   ModalBody,
   ModalHeader,
   Progress,
   ModalFooter,
   Spinner
} from "reactstrap"
// import avatar3 from "@src/assets/images/portrait/small/avatar-s-8.jpg"
import { Link, useParams } from "react-router-dom"
// ** Third Party Components
import { AlertCircle, CheckCircle, XCircle } from "react-feather"
// ** Custom Components
import { toast } from "react-hot-toast"
import { getUserById } from "../../../myApiCenter"

const UserInfoCard = (props) => {
   // ** State
   const { id } = useParams()
   const [isModelOpen, setisModelOpen] = useState(false)
   const [data, setdata] = useState(null)

   // console.log(data?.kycDocumentsAsLevel.length > 0 ? data?.kycDocumentsAsLevel.find((e) => e.level === 2).data.length : "zero")

   const getData = async () => {
      try {
         const j = await getUserById(id)
         setdata(j?.data?.user)
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
   // console.log(kycData)
   return (
      <Card className="user-info pb-2 w-100 h-100">
         <Modal
            isOpen={isModelOpen}
            toggle={
               () => setisModelOpen(!isModelOpen)
               // setkycData({
               //    reason: "",
               //    reasonDesc: ""
               // })
            }
            className="modal-dialog-centered"
         ></Modal>
         <div className="user-info-img">
            {/* {renderUserImg()} */}
            {/* <img src={data && data.profilePicUrl} /> */}
            <div>
               <h4>{data && `${data.name}`}</h4>
               <span>{data && `${data.email}`}</span>
            </div>
         </div>

         {/* <h4 className="fw-bolder border-bottom ms-1 pb-50 mb-1">User Info</h4> */}
         <div className="user-info-container">
            <ul className="list-unstyled">
               <li>
                  <span>CONTACT No.</span>
                  <span className="fw-bolder me-25">{data && data.mobileNo}</span>
               </li>
               <li>
                  <span>USER ID.</span>
                  <span className="fw-bolder me-25">{data && `${data._id}`}</span>
               </li>

               <li>
                  <span>JOINED ON.</span>
                  <span className="fw-bolder me-25">{data && `${data?.createdAt.split("T")[0].split("-").reverse().join("/")}`}</span>
               </li>

               <li className="d-flex align-items-center">
                  <span>USER STATUS</span>
                  <span className="fw-bolder me-25"></span>
               </li>
               <li>
                  <span>STATUS</span>
                  <span className="fw-bolder me-25">
                     <div className="form-switch form-check-success">
                        <Input
                           type="switch"
                           id=""
                           // onChange={(e) => console.log(e.target.checked)}
                           name="success"
                           disabled
                           defaultChecked={data?.isApprovedFromAdmin}
                           // checked=
                        />
                     </div>
                  </span>
               </li>
            </ul>
         </div>
      </Card>
   )
}

export default UserInfoCard
