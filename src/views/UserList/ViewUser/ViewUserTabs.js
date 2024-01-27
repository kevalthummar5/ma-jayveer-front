// ** React Imports
import { Fragment, useState } from "react"

// ** Icons Imports
import { Home, Settings, EyeOff, User, Grid } from "react-feather"

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap"
import UserPositions from "./UserPositions"
import UserLogs from "./UserLogs"
import UserStockList from "./UserStockList"

const ViewUserTabs = () => {
   // ** State
   const [active, setActive] = useState("1")
   // console.log("dc")
   const toggle = (tab) => {
      if (active !== tab) {
         setActive(tab)
      }
   }
   return (
      <Fragment>
         <Nav tabs>
            <NavItem>
               <NavLink
                  active={active === "1"}
                  onClick={() => {
                     toggle("1")
                  }}
                  style={{ cursor: "pointer" }}
               >
                  {/* <Grid size={14} /> */}
                  <span className="align-middle">Position</span>
               </NavLink>
            </NavItem>
            <NavItem>
               <NavLink
                  active={active === "2"}
                  onClick={() => {
                     toggle("2")
                  }}
                  style={{ cursor: "pointer" }}
               >
                  {/* <WalletIcon /> */}
                  <span className="align-middle">Logs</span>
               </NavLink>
            </NavItem>
            <NavItem>
               <NavLink
                  active={active === "3"}
                  onClick={() => {
                     toggle("3")
                  }}
                  style={{ cursor: "pointer" }}
               >
                  {/* <StarIcon size={14} /> */}
                  <span className="align-middle">Stock Detail</span>
               </NavLink>
            </NavItem>
         </Nav>
         <TabContent className="py-50" activeTab={active}>
            <TabPane tabId="1" className="my-tab-plane p-1">
               <UserPositions />
            </TabPane>
            <TabPane tabId="2" className="my-tab-plane p-1">
               <UserLogs />
            </TabPane>

            <TabPane tabId="3" className="my-tab-plane p-1">
               <UserStockList />
            </TabPane>
         </TabContent>
      </Fragment>
   )
}
export default ViewUserTabs
