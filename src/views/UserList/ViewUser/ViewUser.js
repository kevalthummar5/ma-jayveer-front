import { useContext } from "react"
import { AuthContext, MobileUsersContext } from "../../../context/Can"
import UserIdChanger from "../../Componant/UserIdChanger"
import { useParams } from "react-router"
import MainNav from "../../MainNav/MainNav"
import { Link } from "react-router-dom"
import { ArrowLeft } from "react-feather"
import { Card, Col, Row } from "reactstrap"
import ViewUserTabs from "./ViewUserTabs"
import UserInfoCard from "./UserInfoCard"

const ViewUser = () => {
   const [userData, userDataSetter] = useContext(AuthContext)

   const [idList] = useContext(MobileUsersContext)
   const { id } = useParams()

   return (
      <>
         <MainNav />
         <Card className="m-3 h-100 view-user-card">
            <div className="d-flex justify-content-between m-2">
               <div className="d-flex align-items-center gap-1">
                  <Link to="/users">
                     <ArrowLeft />
                  </Link>
                  <h3>ViewUser</h3>
               </div>
               {userData?.userRole === "admin" && <UserIdChanger url="/users/view/" idList={idList} />}
            </div>
            <Row className="h-100">
               <Col xl="3" lg="5" className="h-100" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
                  <UserInfoCard />
               </Col>
               <Col xl="9" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
                  <Card title="Tabs with icons" className="view-user-tab-area">
                     <ViewUserTabs />
                  </Card>
               </Col>
            </Row>
         </Card>
      </>
   )
}

export default ViewUser
